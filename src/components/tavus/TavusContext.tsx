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
}

const TavusContext = createContext<TavusContextType | undefined>(undefined);

export const TavusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize conversation when user is available
  useEffect(() => {
    if (user && !conversationId) {
      initializeConversation();
    }
  }, [user]);

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
      
      // Track conversation started
      await TavusAnalytics.trackConversationStarted(
        user.id,
        conversation.id,
        {
          subject: user.subjects?.[0] || 'general',
          grade: user.grade,
          exam_type: user.examType
        }
      );

      // Request initial greeting
      await sendInitialGreeting(conversation.id);
    } catch (error) {
      console.error('Failed to initialize Tavus conversation:', error);
      setError('Nu s-a putut inițializa conversația cu profesorul virtual.');
      
      if (user) {
        TavusAnalytics.trackError(
          user.id,
          'unknown',
          'initialization_failed',
          error instanceof Error ? error.message : String(error)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const sendInitialGreeting = async (convId: string) => {
    if (!user) return;
    
    try {
      const message = await TavusService.sendMessage(
        convId,
        'Salut, te rog să te prezinți și să-mi explici cum mă poți ajuta cu învățarea.',
        { is_initial: true }
      );

      // Track message sent
      await TavusAnalytics.trackMessageSent(
        user.id,
        convId,
        message.id,
        'Salut, te rog să te prezinți și să-mi explici cum mă poți ajuta cu învățarea.'
      );

      if (message.video_url) {
        setVideoUrl(message.video_url);
      } else if (message.status === 'processing') {
        await pollForVideo(convId, message.id);
      }
    } catch (error) {
      console.error('Failed to send initial greeting:', error);
      setError('Nu s-a putut obține răspunsul inițial de la profesorul virtual.');
      
      if (user) {
        TavusAnalytics.trackError(
          user.id,
          convId,
          'initial_greeting_failed',
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  };

  const sendMessage = async (content: string) => {
    if (!user || !conversationId) {
      setError('Conversația nu a fost inițializată corect.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const message = await TavusService.sendMessage(
        conversationId,
        content,
        { timestamp: new Date().toISOString() }
      );

      // Track message sent
      await TavusAnalytics.trackMessageSent(
        user.id,
        conversationId,
        message.id,
        content
      );

      if (message.video_url) {
        setVideoUrl(message.video_url);
        
        // Track video viewed
        await TavusAnalytics.trackVideoViewed(
          user.id,
          conversationId,
          message.id,
          0 // Initial view
        );
      } else if (message.status === 'processing') {
        await pollForVideo(conversationId, message.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Nu s-a putut trimite mesajul. Te rugăm să încerci din nou.');
      
      if (user) {
        TavusAnalytics.trackError(
          user.id,
          conversationId,
          'message_send_failed',
          error instanceof Error ? error.message : String(error)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const pollForVideo = async (convId: string, messageId: string) => {
    if (!user) return;
    
    try {
      const message = await TavusService.pollForVideoStatus(convId, messageId);
      
      if (message.video_url) {
        setVideoUrl(message.video_url);
        
        // Track video viewed
        await TavusAnalytics.trackVideoViewed(
          user.id,
          convId,
          messageId,
          0 // Initial view
        );
      }
    } catch (error) {
      console.error('Failed to poll for video:', error);
      setError('Nu s-a putut obține răspunsul video. Te rugăm să încerci din nou.');
      
      if (user) {
        TavusAnalytics.trackError(
          user.id,
          convId,
          'video_poll_failed',
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  };

  const clearConversation = () => {
    setConversationId(null);
    setVideoUrl(null);
    setError(null);
    
    // Re-initialize conversation
    if (user) {
      initializeConversation();
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
        clearConversation
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