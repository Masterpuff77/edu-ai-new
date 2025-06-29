import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TavusService from './TavusService';
import TavusAnalytics from './TavusAnalytics';
import useAuthStore from '../../store/authStore';

interface TavusContextType {
  conversationId: string | null;
  videoUrl: string | null;
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearConversation: () => void;
  isApiHealthy: boolean;
  isMockMode: boolean;
}

const TavusContext = createContext<TavusContextType | undefined>(undefined);

export const TavusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiHealthy, setIsApiHealthy] = useState(false);
  const [isMockMode, setIsMockMode] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);

  // Check API health on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const isHealthy = await TavusService.checkApiHealth();
        setIsApiHealthy(isHealthy);
        setIsMockMode(TavusService.isMockMode());
        
        if (!isHealthy) {
          console.warn('Tavus API is not healthy. Using fallback mode.');
          // If API is not healthy, set a mock video URL
          setVideoUrl(TavusService.getMockVideo());
          
          // Add a welcome message to conversation history
          setConversationHistory([
            { 
              role: 'assistant', 
              content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
            }
          ]);
        }
      } catch (error) {
        console.error('Error checking Tavus API health:', error);
        setIsApiHealthy(false);
        setIsMockMode(true);
        // Set mock video URL in case of error
        setVideoUrl(TavusService.getMockVideo());
        
        // Add a welcome message to conversation history
        setConversationHistory([
          { 
            role: 'assistant', 
            content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
          }
        ]);
      }
    };
    
    checkApiHealth();
  }, []);

  // Initialize conversation when user is available
  useEffect(() => {
    if (user && !conversationId && isApiHealthy && !isMockMode) {
      initializeConversation();
    } else if (user && !videoUrl) {
      // If we're in mock mode but don't have a video URL yet, set it
      setVideoUrl(TavusService.getMockVideo());
    }
  }, [user, isApiHealthy, isMockMode, conversationId, videoUrl]);

  const initializeConversation = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      const conversation = await TavusService.createConversation({
        user_id: user.id,
        user_name: user.name || 'Student',
        subject: user.subjects?.[0] || 'general',
        grade: user.grade,
        exam_type: user.examType
      });

      setConversationId(conversation.id);
      console.log("Conversation initialized with ID:", conversation.id);
      
      // Track conversation started
      try {
        await TavusAnalytics.trackConversationStarted(
          user.id,
          conversation.id,
          {
            subject: user.subjects?.[0] || 'general',
            grade: user.grade,
            exam_type: user.examType
          }
        );
      } catch (analyticsError) {
        console.warn('Failed to track conversation start:', analyticsError);
        // Continue anyway - analytics failure shouldn't stop the conversation
      }

      // Request initial greeting
      await sendInitialGreeting(conversation.id);
    } catch (error) {
      console.error('Failed to initialize Tavus conversation:', error);
      setError('Nu s-a putut inițializa conversația cu profesorul virtual. Folosim modul offline.');
      
      // Set mock video URL in case of error
      setVideoUrl(TavusService.getMockVideo());
      setIsMockMode(true);
      setIsApiHealthy(false);
      
      // Add a welcome message to conversation history
      setConversationHistory([
        { 
          role: 'assistant', 
          content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
        }
      ]);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
      
      if (user) {
        try {
          TavusAnalytics.trackError(
            user.id,
            'unknown',
            'initialization_failed',
            error instanceof Error ? error.message : String(error)
          );
        } catch (analyticsError) {
          console.warn('Failed to track error:', analyticsError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const sendInitialGreeting = async (convId: string) => {
    if (!user) return;
    
    try {
      const initialMessage = 'Salut, te rog să te prezinți și să-mi explici cum mă poți ajuta cu învățarea.';
      
      // Add user message to history
      setConversationHistory(prev => [...prev, { role: 'user', content: initialMessage }]);
      
      const message = await TavusService.sendMessage(
        convId,
        initialMessage,
        { is_initial: true }
      );

      // Track message sent
      try {
        await TavusAnalytics.trackMessageSent(
          user.id,
          convId,
          message.id,
          initialMessage
        );
      } catch (analyticsError) {
        console.warn('Failed to track message sent:', analyticsError);
      }

      if (message.video_url) {
        setVideoUrl(message.video_url);
        console.log("Initial video URL received:", message.video_url);
        
        // Add assistant response to history
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: message.transcript || 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea.' 
          }
        ]);
        
        // Track video viewed
        try {
          await TavusAnalytics.trackVideoViewed(
            user.id,
            convId,
            message.id,
            0 // Initial view
          );
        } catch (analyticsError) {
          console.warn('Failed to track video viewed:', analyticsError);
        }
      } else if (message.status === 'processing') {
        await pollForVideoStatus(convId, message.id);
      }
    } catch (error) {
      console.error('Error sending initial greeting:', error);
      setError('Nu s-a putut obține răspunsul inițial. Folosim modul offline.');
      
      // Fallback to offline mode
      setVideoUrl(TavusService.getMockVideo());
      setIsMockMode(true);
      setIsApiHealthy(false);
      
      setConversationHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
        }
      ]);
      
      // Track error
      if (user) {
        try {
          TavusAnalytics.trackError(
            user.id,
            convId,
            'initial_greeting_failed',
            error instanceof Error ? error.message : String(error)
          );
        } catch (analyticsError) {
          console.warn('Failed to track error:', analyticsError);
        }
      }
    }
  };

  const sendMessage = async (content: string) => {
    if (!user) {
      setError('Utilizatorul nu este autentificat.');
      return;
    }
    
    if (!conversationId && !isMockMode) {
      setError('Conversația nu a fost inițializată corect. Folosim modul offline.');
      setIsMockMode(true);
      setVideoUrl(TavusService.getMockVideo());
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Add user message to history
      setConversationHistory(prev => [...prev, { role: 'user', content }]);

      // If we're in mock mode or API is unhealthy, use mock response
      if (isMockMode || !isApiHealthy) {
        console.log('[Tavus] Using mock mode for message:', content);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setVideoUrl(TavusService.getMockVideo());
        
        // Add mock response to history
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: 'Îmi pare rău, momentan funcționez în modul offline și nu pot procesa această cerere în mod personalizat. Te rog să încerci din nou mai târziu când conexiunea cu serverul va fi restabilită.' 
          }
        ]);
        
        setLoading(false);
        return;
      }

      const message = await TavusService.sendMessage(
        conversationId,
        content,
        { timestamp: new Date().toISOString() }
      );

      // Track message sent
      try {
        await TavusAnalytics.trackMessageSent(
          user.id,
          conversationId,
          message.id,
          content
        );
      } catch (analyticsError) {
        console.warn('Failed to track message sent:', analyticsError);
      }

      if (message.video_url) {
        setVideoUrl(message.video_url);
        console.log("Video URL received:", message.video_url);
        
        // Add assistant response to history
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: message.transcript || 'Răspunsul profesorului virtual' 
          }
        ]);
        
        // Track video viewed
        try {
          await TavusAnalytics.trackVideoViewed(
            user.id,
            conversationId,
            message.id,
            0 // Initial view
          );
        } catch (analyticsError) {
          console.warn('Failed to track video viewed:', analyticsError);
        }
      } else if (message.status === 'processing') {
        await pollForVideoStatus(conversationId, message.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Nu s-a putut trimite mesajul. Folosim modul offline.');
      
      // Set mock video URL in case of error
      setVideoUrl(TavusService.getMockVideo());
      setIsMockMode(true);
      setIsApiHealthy(false);
      
      // Add error response to history
      setConversationHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou mai târziu.' 
        }
      ]);
      
      // Track error
      if (user && conversationId) {
        try {
          TavusAnalytics.trackError(
            user.id,
            conversationId,
            'message_send_failed',
            error instanceof Error ? error.message : String(error)
          );
        } catch (analyticsError) {
          console.warn('Failed to track error:', analyticsError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const pollForVideoStatus = async (convId: string, messageId: string) => {
    if (!user) return;
    
    try {
      const message = await TavusService.pollForVideoStatus(convId, messageId);
      
      if (message.video_url) {
        setVideoUrl(message.video_url);
        console.log("Video URL received from polling:", message.video_url);
        
        // Add assistant response to history
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: message.transcript || 'Răspunsul profesorului virtual' 
          }
        ]);
        
        // Track video viewed
        try {
          await TavusAnalytics.trackVideoViewed(
            user.id,
            convId,
            messageId,
            0 // Initial view
          );
        } catch (analyticsError) {
          console.warn('Failed to track video viewed:', analyticsError);
        }
      }
    } catch (error) {
      console.error('Failed to poll for video:', error);
      setError('Nu s-a putut obține răspunsul video. Folosim modul offline.');
      
      // Set mock video URL in case of error
      setVideoUrl(TavusService.getMockVideo());
      setIsMockMode(true);
      setIsApiHealthy(false);
      
      // Add error response to history
      setConversationHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou mai târziu.' 
        }
      ]);
      
      // Track error
      if (user) {
        try {
          TavusAnalytics.trackError(
            user.id,
            convId,
            'video_poll_failed',
            error instanceof Error ? error.message : String(error)
          );
        } catch (analyticsError) {
          console.warn('Failed to track error:', analyticsError);
        }
      }
    }
  };

  const clearConversation = () => {
    setConversationId(null);
    setVideoUrl(null);
    setError(null);
    setConversationHistory([]);
    
    // Reset mock mode if API is healthy
    if (isApiHealthy) {
      setIsMockMode(false);
      TavusService.resetMockMode();
    }
    
    // Re-initialize conversation
    if (user && isApiHealthy) {
      initializeConversation();
    } else {
      // Set mock video URL in offline mode
      setVideoUrl(TavusService.getMockVideo());
      
      // Add welcome message to conversation history
      setConversationHistory([
        { 
          role: 'assistant', 
          content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
        }
      ]);
    }
  };

  return (
    <TavusContext.Provider
      value={{
        conversationId,
        videoUrl,
        loading,
        error,
        sendMessage,
        clearConversation,
        isApiHealthy,
        isMockMode
      }}
    >
      {children}
    </TavusContext.Provider>
  );
};

export const useTavus = () => {
  const context = useContext(TavusContext);
  if (context === undefined) {
    throw new Error('useTavus must be used within a TavusProvider');
  }
  return context;
};