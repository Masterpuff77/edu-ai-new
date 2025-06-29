import axios from 'axios';

// API configuration
const API_KEY = '7c3787ab7bf24c2d8247ad651412987f';
const PERSONA_ID = 'p7636ec0d04c';
const REPLICA_ID = 'r95fd27b5a37';
const API_URL = 'https://api.tavus.io/v1';

// Types
export interface TavusConversation {
  id: string;
  persona_id: string;
  replica_id: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface TavusMessage {
  id: string;
  conversation_id: string;
  content: string;
  role: 'user' | 'assistant';
  status: 'created' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  transcript?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface TavusLiveInteraction {
  id: string;
  conversation_id: string;
  status: 'active' | 'completed' | 'failed';
  created_at: string;
  ended_at?: string;
  mode: 'interactive' | 'streaming';
}

export interface TavusLiveMessage {
  id: string;
  live_id: string;
  conversation_id: string;
  content: string;
  role: 'user' | 'assistant';
  status: 'created' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  transcript?: string;
  created_at: string;
}

// Error handling
class TavusError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'TavusError';
    this.status = status;
  }
}

// Service class
export class TavusService {
  private static instance: TavusService;
  private axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
  });
  
  private mockMode = true; // Start in mock mode by default for reliability
  private lastError: Error | null = null;
  private apiHealthStatus = false;
  private mockVideos = [
    'https://storage.googleapis.com/tavus-public-demo-videos/professor_demo.mp4',
    'https://storage.googleapis.com/tavus-public-demo-videos/professor_demo_2.mp4',
    'https://storage.googleapis.com/tavus-public-demo-videos/professor_demo_3.mp4'
  ];

  // Singleton pattern
  public static getInstance(): TavusService {
    if (!TavusService.instance) {
      TavusService.instance = new TavusService();
    }
    return TavusService.instance;
  }

  // Initialize logging interceptors
  constructor() {
    // Request logging
    this.axiosInstance.interceptors.request.use(
      config => {
        console.log(`[Tavus API] Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        console.error('[Tavus API] Request error:', error);
        this.mockMode = true;
        this.apiHealthStatus = false;
        this.lastError = error;
        return Promise.reject(error);
      }
    );

    // Response logging
    this.axiosInstance.interceptors.response.use(
      response => {
        console.log(`[Tavus API] Response: ${response.status} ${response.statusText}`);
        return response;
      },
      error => {
        // Check if it's a timeout error
        if (error.code === 'ECONNABORTED') {
          console.error('[Tavus API] Request timeout:', error.message);
          this.mockMode = true;
          this.apiHealthStatus = false;
          this.lastError = error;
          return Promise.reject(
            new TavusError('Request timed out. The server took too long to respond.', 408)
          );
        }
        
        // Check if it's a network error
        if (error.message === 'Network Error') {
          console.error('[Tavus API] Network error:', error.message);
          this.mockMode = true;
          this.apiHealthStatus = false;
          this.lastError = error;
          return Promise.reject(
            new TavusError('Network error. Please check your internet connection.', 0)
          );
        }
        
        console.error('[Tavus API] Response error:', error.response?.status, error.response?.data || error.message);
        this.lastError = error;
        
        // If we get a 401 or 403, it's likely an API key issue
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.mockMode = true;
          this.apiHealthStatus = false;
        }
        
        return Promise.reject(
          new TavusError(
            error.response?.data?.message || 'An unknown error occurred',
            error.response?.status || 500
          )
        );
      }
    );
  }

  // Health check to verify API connectivity
  async checkApiHealth(): Promise<boolean> {
    try {
      // Simple GET request to check if API is accessible
      const response = await this.axiosInstance.get('/personas', { 
        timeout: 3000 // Short timeout for health check
      });
      
      this.apiHealthStatus = response.status === 200;
      this.mockMode = !this.apiHealthStatus;
      
      return this.apiHealthStatus;
    } catch (error) {
      console.warn('Tavus API health check failed:', error);
      this.apiHealthStatus = false;
      this.mockMode = true;
      return false;
    }
  }

  // Create a new conversation
  async createConversation(metadata: Record<string, any> = {}): Promise<TavusConversation> {
    // If we're in mock mode, return a mock conversation
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for createConversation');
      return {
        id: `mock-conversation-${Date.now()}`,
        persona_id: PERSONA_ID,
        replica_id: REPLICA_ID,
        created_at: new Date().toISOString(),
        metadata
      };
    }
    
    try {
      console.log('[Tavus API] Creating conversation with metadata:', metadata);
      const response = await this.axiosInstance.post('/conversations', {
        persona_id: PERSONA_ID,
        replica_id: REPLICA_ID,
        metadata
      });
      
      console.log('[Tavus API] Conversation created:', response.data.id);
      return response.data;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock conversation instead of throwing
      return {
        id: `mock-conversation-${Date.now()}`,
        persona_id: PERSONA_ID,
        replica_id: REPLICA_ID,
        created_at: new Date().toISOString(),
        metadata
      };
    }
  }

  // Send a message in an existing conversation
  async sendMessage(conversationId: string, content: string, metadata: Record<string, any> = {}): Promise<TavusMessage> {
    // If we're in mock mode, return a mock message
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for sendMessage');
      return {
        id: `mock-message-${Date.now()}`,
        conversation_id: conversationId,
        content,
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString(),
        metadata
      };
    }
    
    try {
      console.log(`[Tavus API] Sending message to conversation ${conversationId}:`, content);
      const response = await this.axiosInstance.post(`/conversations/${conversationId}/messages`, {
        content,
        metadata
      });
      
      console.log(`[Tavus API] Message sent, ID: ${response.data.id}, Status: ${response.data.status}`);
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock message instead of throwing
      return {
        id: `mock-message-${Date.now()}`,
        conversation_id: conversationId,
        content,
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString(),
        metadata
      };
    }
  }

  // Get a message by ID
  async getMessage(conversationId: string, messageId: string): Promise<TavusMessage> {
    // If we're in mock mode, return a mock message
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for getMessage');
      return {
        id: messageId,
        conversation_id: conversationId,
        content: 'Aceasta este o simulare a răspunsului profesorului virtual.',
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString(),
        metadata: {}
      };
    }
    
    try {
      console.log(`[Tavus API] Getting message ${messageId} from conversation ${conversationId}`);
      const response = await this.axiosInstance.get(`/conversations/${conversationId}/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get message:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock message instead of throwing
      return {
        id: messageId,
        conversation_id: conversationId,
        content: 'Aceasta este o simulare a răspunsului profesorului virtual.',
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString(),
        metadata: {}
      };
    }
  }

  // Get conversation history
  async getConversationHistory(conversationId: string): Promise<TavusMessage[]> {
    // If we're in mock mode, return mock history
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for getConversationHistory');
      return [
        {
          id: `mock-message-1`,
          conversation_id: conversationId,
          content: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          role: 'assistant',
          status: 'completed',
          video_url: this.getMockVideo(),
          transcript: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          created_at: new Date(Date.now() - 60000).toISOString(),
          metadata: {}
        }
      ];
    }
    
    try {
      console.log(`[Tavus API] Getting conversation history for ${conversationId}`);
      const response = await this.axiosInstance.get(`/conversations/${conversationId}/messages`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get conversation history:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return mock history instead of throwing
      return [
        {
          id: `mock-message-1`,
          conversation_id: conversationId,
          content: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          role: 'assistant',
          status: 'completed',
          video_url: this.getMockVideo(),
          transcript: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          created_at: new Date(Date.now() - 60000).toISOString(),
          metadata: {}
        }
      ];
    }
  }

  // Poll for message status until video is ready
  async pollForVideoStatus(conversationId: string, messageId: string, maxAttempts = 10): Promise<TavusMessage> {
    // If we're in mock mode, return a mock message
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for pollForVideoStatus');
      return {
        id: messageId,
        conversation_id: conversationId,
        content: 'Aceasta este o simulare a răspunsului profesorului virtual.',
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString(),
        metadata: {}
      };
    }
    
    console.log(`[Tavus API] Starting to poll for video status: message ${messageId}, conversation ${conversationId}`);
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const checkStatus = async () => {
        try {
          console.log(`[Tavus API] Polling attempt ${attempts + 1}/${maxAttempts}`);
          const message = await this.getMessage(conversationId, messageId);
          
          if (message.video_url) {
            console.log(`[Tavus API] Video ready: ${message.video_url}`);
            resolve(message);
            return;
          }
          
          if (message.status === 'failed') {
            console.error(`[Tavus API] Video generation failed for message ${messageId}`);
            
            // Switch to mock mode on error
            this.mockMode = true;
            
            // Return mock message instead of rejecting
            resolve({
              id: messageId,
              conversation_id: conversationId,
              content: 'Aceasta este o simulare a răspunsului profesorului virtual.',
              role: 'assistant',
              status: 'completed',
              video_url: this.getMockVideo(),
              transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
              created_at: new Date().toISOString(),
              metadata: {}
            });
            return;
          }
          
          if (attempts >= maxAttempts) {
            console.error(`[Tavus API] Timeout waiting for video generation after ${maxAttempts} attempts`);
            
            // Switch to mock mode on timeout
            this.mockMode = true;
            
            // Return mock message instead of rejecting
            resolve({
              id: messageId,
              conversation_id: conversationId,
              content: 'Aceasta este o simulare a răspunsului profesorului virtual.',
              role: 'assistant',
              status: 'completed',
              video_url: this.getMockVideo(),
              transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
              created_at: new Date().toISOString(),
              metadata: {}
            });
            return;
          }
          
          attempts++;
          setTimeout(checkStatus, 2000);
        } catch (error) {
          console.error(`[Tavus API] Error during polling:`, error);
          
          // Switch to mock mode on error
          this.mockMode = true;
          
          // Return mock message instead of rejecting
          resolve({
            id: messageId,
            conversation_id: conversationId,
            content: 'Aceasta este o simulare a răspunsului profesorului virtual.',
            role: 'assistant',
            status: 'completed',
            video_url: this.getMockVideo(),
            transcript: 'Aceasta este o simulare a răspunsului profesorului virtual. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
            created_at: new Date().toISOString(),
            metadata: {}
          });
        }
      };
      
      checkStatus();
    });
  }

  // Reset mock mode
  resetMockMode(): void {
    this.mockMode = false;
    this.apiHealthStatus = true;
    this.lastError = null;
  }

  // Get mock mode status
  isMockMode(): boolean {
    return this.mockMode;
  }

  // Get API health status
  isApiHealthy(): boolean {
    return this.apiHealthStatus;
  }

  // Get last error
  getLastError(): Error | null {
    return this.lastError;
  }

  // Fallback method to get a mock video when API is unavailable
  getMockVideo(): string {
    // Return a random mock video from the array
    return this.mockVideos[Math.floor(Math.random() * this.mockVideos.length)];
  }

  // Live interaction methods based on Tavus documentation
  async startLiveInteraction(conversationId: string): Promise<TavusLiveInteraction> {
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for startLiveInteraction');
      return {
        id: `mock-live-${Date.now()}`,
        conversation_id: conversationId,
        status: 'active',
        created_at: new Date().toISOString(),
        mode: 'interactive'
      };
    }
    
    try {
      console.log(`[Tavus API] Starting live interaction for conversation ${conversationId}`);
      const response = await this.axiosInstance.post(`/conversations/${conversationId}/live`, {
        mode: 'interactive' // Can be 'interactive' or 'streaming'
      });
      
      console.log(`[Tavus API] Live interaction started, ID: ${response.data.id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to start live interaction:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock live interaction instead of throwing
      return {
        id: `mock-live-${Date.now()}`,
        conversation_id: conversationId,
        status: 'active',
        created_at: new Date().toISOString(),
        mode: 'interactive'
      };
    }
  }

  async endLiveInteraction(conversationId: string, liveId: string): Promise<TavusLiveInteraction> {
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for endLiveInteraction');
      return {
        id: liveId,
        conversation_id: conversationId,
        status: 'completed',
        created_at: new Date(Date.now() - 60000).toISOString(),
        ended_at: new Date().toISOString(),
        mode: 'interactive'
      };
    }
    
    try {
      console.log(`[Tavus API] Ending live interaction ${liveId} for conversation ${conversationId}`);
      const response = await this.axiosInstance.post(`/conversations/${conversationId}/live/${liveId}/end`);
      
      console.log(`[Tavus API] Live interaction ended`);
      return response.data;
    } catch (error) {
      console.error('Failed to end live interaction:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock result instead of throwing
      return {
        id: liveId,
        conversation_id: conversationId,
        status: 'completed',
        created_at: new Date(Date.now() - 60000).toISOString(),
        ended_at: new Date().toISOString(),
        mode: 'interactive'
      };
    }
  }

  async sendLiveMessage(conversationId: string, liveId: string, content: string): Promise<TavusLiveMessage> {
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for sendLiveMessage');
      return {
        id: `mock-live-msg-${Date.now()}`,
        live_id: liveId,
        conversation_id: conversationId,
        content,
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual în modul live. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString()
      };
    }
    
    try {
      console.log(`[Tavus API] Sending live message to interaction ${liveId} for conversation ${conversationId}`);
      const response = await this.axiosInstance.post(`/conversations/${conversationId}/live/${liveId}/messages`, {
        content
      });
      
      console.log(`[Tavus API] Live message sent, ID: ${response.data.id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to send live message:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock message instead of throwing
      return {
        id: `mock-live-msg-${Date.now()}`,
        live_id: liveId,
        conversation_id: conversationId,
        content,
        role: 'assistant',
        status: 'completed',
        video_url: this.getMockVideo(),
        transcript: 'Aceasta este o simulare a răspunsului profesorului virtual în modul live. Sistemul funcționează în modul offline din cauza problemelor de conectivitate cu API-ul Tavus.',
        created_at: new Date().toISOString()
      };
    }
  }

  async getLiveStatus(conversationId: string, liveId: string): Promise<TavusLiveInteraction> {
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for getLiveStatus');
      return {
        id: liveId,
        conversation_id: conversationId,
        status: 'active',
        created_at: new Date(Date.now() - 60000).toISOString(),
        mode: 'interactive'
      };
    }
    
    try {
      console.log(`[Tavus API] Getting status for live interaction ${liveId} in conversation ${conversationId}`);
      const response = await this.axiosInstance.get(`/conversations/${conversationId}/live/${liveId}`);
      
      console.log(`[Tavus API] Live interaction status: ${response.data.status}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get live interaction status:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return a mock status instead of throwing
      return {
        id: liveId,
        conversation_id: conversationId,
        status: 'active',
        created_at: new Date(Date.now() - 60000).toISOString(),
        mode: 'interactive'
      };
    }
  }

  async getLiveMessages(conversationId: string, liveId: string): Promise<TavusLiveMessage[]> {
    if (this.mockMode) {
      console.log('[Tavus API] Using mock mode for getLiveMessages');
      return [
        {
          id: `mock-live-msg-1`,
          live_id: liveId,
          conversation_id: conversationId,
          content: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          role: 'assistant',
          status: 'completed',
          video_url: this.getMockVideo(),
          transcript: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          created_at: new Date(Date.now() - 60000).toISOString()
        }
      ];
    }
    
    try {
      console.log(`[Tavus API] Getting messages for live interaction ${liveId} in conversation ${conversationId}`);
      const response = await this.axiosInstance.get(`/conversations/${conversationId}/live/${liveId}/messages`);
      
      console.log(`[Tavus API] Got ${response.data.data.length} live messages`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get live messages:', error);
      
      // Switch to mock mode on error
      this.mockMode = true;
      this.apiHealthStatus = false;
      
      // Return mock messages instead of throwing
      return [
        {
          id: `mock-live-msg-1`,
          live_id: liveId,
          conversation_id: conversationId,
          content: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          role: 'assistant',
          status: 'completed',
          video_url: this.getMockVideo(),
          transcript: 'Bună ziua! Sunt profesorul virtual. Cu ce te pot ajuta astăzi?',
          created_at: new Date(Date.now() - 60000).toISOString()
        }
      ];
    }
  }
}

// Export singleton instance
export default TavusService.getInstance();