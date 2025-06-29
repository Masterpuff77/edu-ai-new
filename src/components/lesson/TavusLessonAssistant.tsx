import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, AlertCircle, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import TavusService from '../tavus/TavusService';
import TavusAnalytics from '../tavus/TavusAnalytics';

interface TavusLessonAssistantProps {
  lessonTitle: string;
  subject: string;
}

const TavusLessonAssistant: React.FC<TavusLessonAssistantProps> = ({ lessonTitle, subject }) => {
  const { user } = useAuthStore();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isApiHealthy, setIsApiHealthy] = useState(false);
  const [isMockMode, setIsMockMode] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);

  // Fallback video URL for when API is unavailable
  const fallbackVideoUrl = 'https://storage.googleapis.com/tavus-public-demo-videos/professor_demo.mp4';

  useEffect(() => {
    if (user) {
      // Check API health first
      const checkApiHealth = async () => {
        try {
          const isHealthy = await TavusService.checkApiHealth();
          setIsApiHealthy(isHealthy);
          setIsMockMode(TavusService.isMockMode());
          
          if (!isHealthy) {
            console.warn('Tavus API is not healthy. Using fallback mode.');
            setVideoUrl(fallbackVideoUrl);
            setConversationHistory([
              { 
                role: 'assistant', 
                content: `Bună ziua! Sunt aici pentru a te ajuta cu lecția "${lessonTitle}" la materia ${subject}. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.` 
              }
            ]);
          } else {
            // Initialize conversation when API is healthy
            initializeConversation();
          }
        } catch (error) {
          console.error('Error checking API health:', error);
          setIsApiHealthy(false);
          setIsMockMode(true);
          setVideoUrl(fallbackVideoUrl);
          setConversationHistory([
            { 
              role: 'assistant', 
              content: `Bună ziua! Sunt aici pentru a te ajuta cu lecția "${lessonTitle}" la materia ${subject}. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.` 
            }
          ]);
        }
      };
      
      checkApiHealth();
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [user, lessonTitle, subject]);

  const initializeConversation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a new conversation
      const conversation = await TavusService.createConversation({
        user_id: user?.id || 'anonymous',
        user_name: user?.name || 'Student',
        subject: subject,
        lesson_title: lessonTitle
      });

      setConversationId(conversation.id);
      console.log("Conversation initialized with ID:", conversation.id);
      
      // Track conversation started
      if (user) {
        try {
          await TavusAnalytics.trackConversationStarted(
            user.id,
            conversation.id,
            {
              subject,
              lesson_title: lessonTitle
            }
          );
        } catch (analyticsError) {
          console.warn('Failed to track conversation start:', analyticsError);
        }
      }

      // Send initial greeting
      const initialMessage = `Salut! Sunt aici pentru a te ajuta cu lecția "${lessonTitle}" la materia ${subject}. Cu ce te pot ajuta?`;
      const message = await TavusService.sendMessage(
        conversation.id,
        initialMessage,
        { is_initial: true }
      );

      // Track message sent
      if (user) {
        try {
          await TavusAnalytics.trackMessageSent(
            user.id,
            conversation.id,
            message.id,
            initialMessage
          );
        } catch (analyticsError) {
          console.warn('Failed to track message sent:', analyticsError);
        }
      }

      if (message.video_url) {
        setVideoUrl(message.video_url);
        console.log("Initial video URL received:", message.video_url);
        
        // Add assistant response to history
        setConversationHistory([
          { 
            role: 'assistant', 
            content: message.transcript || `Bună ziua! Sunt aici pentru a te ajuta cu lecția "${lessonTitle}" la materia ${subject}. Cu ce te pot ajuta?` 
          }
        ]);
        
        // Track video viewed
        if (user) {
          try {
            await TavusAnalytics.trackVideoViewed(
              user.id,
              conversation.id,
              message.id,
              0 // Initial view
            );
          } catch (analyticsError) {
            console.warn('Failed to track video viewed:', analyticsError);
          }
        }
      } else if (message.status === 'processing') {
        await pollForVideoStatus(conversation.id, message.id);
      }
    } catch (error) {
      console.error('Failed to initialize Tavus conversation:', error);
      setError('Nu s-a putut inițializa asistentul pentru această lecție. Folosim modul offline.');
      setVideoUrl(fallbackVideoUrl);
      setRetryCount(prev => prev + 1);
      setIsApiHealthy(false);
      setIsMockMode(true);
      
      // Add default message to conversation history
      setConversationHistory([
        { 
          role: 'assistant', 
          content: `Bună ziua! Sunt aici pentru a te ajuta cu lecția "${lessonTitle}" la materia ${subject}. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.` 
        }
      ]);
      
      // Track error
      if (user) {
        try {
          TavusAnalytics.trackError(
            user.id || 'anonymous',
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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    
    // Add user message to history
    setConversationHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // If API is not healthy or in mock mode, use fallback mode
    if (!isApiHealthy || isMockMode || !conversationId) {
      setLoading(true);
      
      // Simulate processing time
      setTimeout(() => {
        setVideoUrl(fallbackVideoUrl);
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: `Îmi pare rău, momentan funcționez în modul offline și nu pot procesa această cerere în mod personalizat. Totuși, pot să-ți ofer informații generale despre lecția "${lessonTitle}" sau despre materia ${subject}.` 
          }
        ]);
        setLoading(false);
      }, 1500);
      
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      const response = await TavusService.sendMessage(
        conversationId,
        userMessage,
        {
          lesson_title: lessonTitle,
          subject: subject,
          timestamp: new Date().toISOString()
        }
      );

      // Track message sent
      if (user) {
        try {
          await TavusAnalytics.trackMessageSent(
            user.id,
            conversationId,
            response.id,
            userMessage
          );
        } catch (analyticsError) {
          console.warn('Failed to track message sent:', analyticsError);
        }
      }

      if (response.video_url) {
        setVideoUrl(response.video_url);
        console.log("Video URL received:", response.video_url);
        
        // Add assistant response to history
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: response.transcript || 'Răspunsul profesorului virtual' 
          }
        ]);
        
        // Track video viewed
        if (user) {
          try {
            await TavusAnalytics.trackVideoViewed(
              user.id,
              conversationId,
              response.id,
              0 // Initial view
            );
          } catch (analyticsError) {
            console.warn('Failed to track video viewed:', analyticsError);
          }
        }
      } else if (response.status === 'processing') {
        await pollForVideoStatus(conversationId, response.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Nu s-a putut trimite mesajul. Folosim modul offline.');
      setVideoUrl(fallbackVideoUrl);
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
        if (user) {
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
      }
    } catch (error) {
      console.error('Error polling for video status:', error);
      setError('Nu s-a putut obține răspunsul video. Folosim modul offline.');
      setVideoUrl(fallbackVideoUrl);
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleRetry = () => {
    if (isApiHealthy && !isMockMode) {
      initializeConversation();
    } else {
      // If API is not healthy, just refresh the fallback video
      setVideoUrl(null);
      setTimeout(() => setVideoUrl(fallbackVideoUrl), 100);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <img 
              src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150" 
              alt="Professor Avatar" 
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Profesor Virtual</h3>
            <p className="text-white/80 text-xs">
              {isApiHealthy && !isMockMode ? `Asistent pentru ${subject}` : 'Mod offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMute} 
            className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title={isMuted ? "Activează sunetul" : "Dezactivează sunetul"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button 
            onClick={toggleMinimize} 
            className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title={isMinimized ? "Maximizează" : "Minimizează"}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="relative bg-gray-900 aspect-video">
            {loading && !videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mx-auto mb-2" />
                  <p className="text-white text-sm">Se încarcă profesorul virtual...</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
                <div className="text-center p-4">
                  <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                  <p className="text-white text-sm">{error}</p>
                  <button 
                    onClick={handleRetry}
                    className="mt-3 px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Reîncearcă
                  </button>
                </div>
              </div>
            )}
            
            {videoUrl && (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted={isMuted}
                controls={false}
                loop={retryCount > 0 || isMockMode} // Loop video if we've had to retry or in offline mode
                onError={(e) => {
                  console.error('Video error:', e);
                  setError('Eroare la încărcarea video. Folosim modul offline.');
                  setVideoUrl(fallbackVideoUrl);
                  setIsMockMode(true);
                  setIsApiHealthy(false);
                }}
              ></video>
            )}
            
            {!videoUrl && !loading && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-2">
                    <img 
                      src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150" 
                      alt="Professor Avatar" 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-white text-sm font-medium">Profesor Virtual</h4>
                  <p className="text-white/70 text-xs mt-1">Asistent pentru {subject}</p>
                </div>
              </div>
            )}
            
            {(!isApiHealthy || isMockMode) && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full">
                Mod offline
              </div>
            )}
          </div>
          
          {/* Chat history */}
          <div className="max-h-40 overflow-y-auto bg-gray-50 p-2">
            {conversationHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-indigo-100 ml-8' 
                    : 'bg-gray-100 mr-8'
                }`}
              >
                <p className="text-xs text-gray-700">{msg.content}</p>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <form onSubmit={sendMessage} className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Întreabă despre "${lessonTitle}"...`}
                className="w-full pr-10 pl-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TavusLessonAssistant;