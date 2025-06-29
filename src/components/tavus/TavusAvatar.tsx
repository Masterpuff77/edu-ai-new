import React, { useState, useEffect, useRef } from 'react';
import { Loader2, AlertCircle, Volume2, VolumeX } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import TavusService from './TavusService';
import TavusAnalytics from './TavusAnalytics';

interface TavusAvatarProps {
  onClose?: () => void;
}

const TavusAvatar: React.FC<TavusAvatarProps> = ({ onClose }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);
  const [retryCount, setRetryCount] = useState(0);
  const [isApiHealthy, setIsApiHealthy] = useState(true);

  // Fallback video URL for when API is unavailable
  const fallbackVideoUrl = 'https://storage.googleapis.com/tavus-public-demo-videos/professor_demo.mp4';

  useEffect(() => {
    // Check API health first
    const checkApiHealth = async () => {
      try {
        const isHealthy = await TavusService.checkApiHealth();
        setIsApiHealthy(isHealthy);
        
        if (!isHealthy) {
          console.warn('Tavus API is not healthy. Using fallback mode.');
          setVideoUrl(fallbackVideoUrl);
          setConversationHistory([
            { 
              role: 'assistant', 
              content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
            }
          ]);
        } else {
          // Initialize conversation when API is healthy
          initializeConversation();
        }
      } catch (error) {
        console.error('Error checking API health:', error);
        setIsApiHealthy(false);
        setVideoUrl(fallbackVideoUrl);
      }
    };
    
    checkApiHealth();

    // Cleanup function
    return () => {
      // If needed, perform cleanup when component unmounts
    };
  }, []);

  const initializeConversation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a new conversation
      const conversation = await TavusService.createConversation({
        user_id: user?.id || 'anonymous',
        user_name: user?.name || 'Student',
        subject: user?.subjects?.[0] || 'general'
      });

      setConversationId(conversation.id);
      console.log("Conversation initialized with ID:", conversation.id);
      
      // Track conversation started
      if (user) {
        await TavusAnalytics.trackConversationStarted(
          user.id,
          conversation.id,
          {
            subject: user.subjects?.[0] || 'general'
          }
        );
      }

      // Send initial greeting
      await sendInitialGreeting(conversation.id);
    } catch (error) {
      console.error('Error initializing conversation:', error);
      setError('Nu s-a putut inițializa conversația cu profesorul virtual. Folosim modul offline.');
      
      // Fallback to offline mode
      setVideoUrl(fallbackVideoUrl);
      setConversationHistory([
        { 
          role: 'assistant', 
          content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
        }
      ]);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const sendInitialGreeting = async (convId: string) => {
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
      if (user) {
        await TavusAnalytics.trackMessageSent(
          user.id,
          convId,
          message.id,
          initialMessage
        );
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
      } else if (message.status === 'processing') {
        await pollForVideoStatus(convId, message.id);
      }
    } catch (error) {
      console.error('Error sending initial greeting:', error);
      setError('Nu s-a putut obține răspunsul inițial. Folosim modul offline.');
      
      // Fallback to offline mode
      setVideoUrl(fallbackVideoUrl);
      setConversationHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Momentan funcționez în modul offline, dar pot să-ți răspund la întrebări de bază.' 
        }
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message to history
    setConversationHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // If API is not healthy, use fallback mode
    if (!isApiHealthy || !conversationId) {
      setLoading(true);
      
      // Simulate processing time
      setTimeout(() => {
        setVideoUrl(fallbackVideoUrl);
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: 'Îmi pare rău, momentan funcționez în modul offline și nu pot procesa această cerere. Te rog să încerci din nou mai târziu.' 
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
          timestamp: new Date().toISOString()
        }
      );

      // Track message sent
      if (user) {
        await TavusAnalytics.trackMessageSent(
          user.id,
          conversationId,
          response.id,
          userMessage
        );
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
          await TavusAnalytics.trackVideoViewed(
            user.id,
            conversationId,
            response.id,
            0 // Initial view
          );
        }
      } else if (response.status === 'processing') {
        await pollForVideoStatus(conversationId, response.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Nu s-a putut trimite mesajul. Folosim modul offline.');
      
      // Fallback to offline mode
      setVideoUrl(fallbackVideoUrl);
      setConversationHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou mai târziu.' 
        }
      ]);
      
      // Track error
      if (user && conversationId) {
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
          await TavusAnalytics.trackVideoViewed(
            user.id,
            convId,
            messageId,
            0 // Initial view
          );
        }
      }
    } catch (error) {
      console.error('Error polling for video status:', error);
      setError('Nu s-a putut obține răspunsul video. Folosim modul offline.');
      
      // Fallback to offline mode
      setVideoUrl(fallbackVideoUrl);
      setConversationHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou mai târziu.' 
        }
      ]);
      
      // Track error
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
    if (isApiHealthy) {
      initializeConversation();
    } else {
      // If API is not healthy, just refresh the fallback video
      setVideoUrl(null);
      setTimeout(() => setVideoUrl(fallbackVideoUrl), 100);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${isMinimized ? 'w-16 h-16' : 'w-80 sm:w-96'}`}>
      {isMinimized ? (
        <button 
          onClick={toggleMinimize}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
        >
          <img 
            src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150" 
            alt="Professor Avatar" 
            className="w-14 h-14 rounded-full object-cover"
          />
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
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
                  {isApiHealthy ? 'Asistent educațional AI' : 'Mod offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMute} 
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button 
                onClick={toggleMinimize} 
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20"></polyline>
                  <polyline points="20 10 14 10 14 4"></polyline>
                  <line x1="14" y1="10" x2="21" y2="3"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Video container */}
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
                loop={retryCount > 0 || !isApiHealthy} // Loop video if we've had to retry or in offline mode
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
                  <p className="text-white/70 text-xs mt-1">
                    {isApiHealthy ? 'Asistent educațional AI' : 'Mod offline'}
                  </p>
                </div>
              </div>
            )}
            
            {!isApiHealthy && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full">
                Mod offline
              </div>
            )}
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Întreabă profesorul virtual..."
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TavusAvatar;