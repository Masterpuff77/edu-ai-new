import supabase from '../../config/supabase';

// Types
export interface AnalyticsEvent {
  userId: string;
  conversationId: string;
  eventType: string;
  eventData?: Record<string, any>;
}

// Analytics service
export class TavusAnalytics {
  private static instance: TavusAnalytics;
  private isEnabled: boolean = true;
  private lastError: Error | null = null;

  // Singleton pattern
  public static getInstance(): TavusAnalytics {
    if (!TavusAnalytics.instance) {
      TavusAnalytics.instance = new TavusAnalytics();
    }
    return TavusAnalytics.instance;
  }

  // Track event
  async trackEvent(event: AnalyticsEvent): Promise<void> {
    if (!this.isEnabled) {
      console.log(`[Tavus Analytics] Analytics disabled, skipping event: ${event.eventType}`);
      return;
    }
    
    try {
      console.log(`[Tavus Analytics] Tracking event: ${event.eventType}`, event);
      
      // Check if Supabase is available
      if (!supabase) {
        console.warn('[Tavus Analytics] Supabase not available, skipping event tracking');
        this.isEnabled = false;
        return;
      }
      
      // First check if the table exists to avoid 404 errors
      const { error: tableCheckError } = await supabase
        .from('tavus_analytics')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      // If table doesn't exist, log warning and disable analytics
      if (tableCheckError && tableCheckError.code === 'PGRST116') {
        console.warn('[Tavus Analytics] tavus_analytics table does not exist, skipping event tracking');
        this.isEnabled = false;
        return;
      }
      
      // If we get a different error, it might be a connection issue
      if (tableCheckError && tableCheckError.code !== 'PGRST116') {
        console.warn('[Tavus Analytics] Error checking table existence:', tableCheckError);
        this.lastError = tableCheckError;
        // Don't disable analytics yet, try to insert anyway
      }
      
      // Try to insert the event
      const { error } = await supabase
        .from('tavus_analytics')
        .insert([{
          user_id: event.userId,
          conversation_id: event.conversationId,
          event_type: event.eventType,
          event_data: event.eventData || {}
        }]);
      
      if (error) {
        console.error('[Tavus Analytics] Error tracking event:', error);
        this.lastError = error;
        
        // If we get a 404 error, the table doesn't exist
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
          this.isEnabled = false;
        }
      }
    } catch (error) {
      console.error('[Tavus Analytics] Failed to track event:', error);
      this.lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't disable analytics on unexpected errors, might be temporary
    }
  }

  // Track conversation started
  async trackConversationStarted(userId: string, conversationId: string, metadata?: Record<string, any>): Promise<void> {
    await this.trackEvent({
      userId,
      conversationId,
      eventType: 'conversation_started',
      eventData: metadata
    });
  }

  // Track message sent
  async trackMessageSent(userId: string, conversationId: string, messageId: string, content: string): Promise<void> {
    await this.trackEvent({
      userId,
      conversationId,
      eventType: 'message_sent',
      eventData: {
        messageId,
        contentLength: content.length,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Track video viewed
  async trackVideoViewed(userId: string, conversationId: string, messageId: string, duration: number): Promise<void> {
    await this.trackEvent({
      userId,
      conversationId,
      eventType: 'video_viewed',
      eventData: {
        messageId,
        duration,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Track error
  async trackError(userId: string, conversationId: string, errorType: string, errorDetails: string): Promise<void> {
    await this.trackEvent({
      userId,
      conversationId,
      eventType: 'error',
      eventData: {
        errorType,
        errorDetails,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Get user engagement metrics
  async getUserEngagementMetrics(userId: string): Promise<any> {
    if (!this.isEnabled) {
      console.log('[Tavus Analytics] Analytics disabled, skipping metrics retrieval');
      return null;
    }
    
    try {
      // Check if Supabase is available
      if (!supabase) {
        console.warn('[Tavus Analytics] Supabase not available, cannot fetch metrics');
        return null;
      }
      
      // Check if table exists
      const { error: tableCheckError } = await supabase
        .from('tavus_analytics')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      if (tableCheckError && tableCheckError.code === 'PGRST116') {
        console.warn('[Tavus Analytics] tavus_analytics table does not exist, cannot fetch metrics');
        this.isEnabled = false;
        return null;
      }
      
      const { data, error } = await supabase
        .from('tavus_analytics')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('[Tavus Analytics] Error fetching metrics:', error);
        this.lastError = error;
        return null;
      }
      
      // Process and return metrics
      const metrics = {
        totalConversations: new Set(data.map(event => event.conversation_id)).size,
        totalMessages: data.filter(event => event.event_type === 'message_sent').length,
        totalVideosViewed: data.filter(event => event.event_type === 'video_viewed').length,
        averageResponseTime: this.calculateAverageResponseTime(data),
        lastActivity: data.length > 0 ? data[0].created_at : null
      };
      
      return metrics;
    } catch (error) {
      console.error('[Tavus Analytics] Failed to get user metrics:', error);
      this.lastError = error instanceof Error ? error : new Error(String(error));
      return null;
    }
  }

  // Calculate average response time
  private calculateAverageResponseTime(events: any[]): number | null {
    const messagePairs = [];
    let lastUserMessage: any = null;
    
    // Sort events by timestamp
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    
    for (const event of sortedEvents) {
      if (event.event_type === 'message_sent' && event.event_data?.role === 'user') {
        lastUserMessage = event;
      } else if (event.event_type === 'video_viewed' && lastUserMessage) {
        const userMessageTime = new Date(lastUserMessage.created_at).getTime();
        const responseTime = new Date(event.created_at).getTime() - userMessageTime;
        
        if (responseTime > 0 && responseTime < 60000) { // Ignore outliers (> 1 minute)
          messagePairs.push(responseTime);
        }
        
        lastUserMessage = null;
      }
    }
    
    if (messagePairs.length === 0) return null;
    
    const sum = messagePairs.reduce((acc, time) => acc + time, 0);
    return sum / messagePairs.length;
  }

  // Reset analytics
  resetAnalytics(): void {
    this.isEnabled = true;
    this.lastError = null;
  }

  // Get analytics status
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }

  // Get last error
  getLastError(): Error | null {
    return this.lastError;
  }
}

// Export singleton instance
export default TavusAnalytics.getInstance();