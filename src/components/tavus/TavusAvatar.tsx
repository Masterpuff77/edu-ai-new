import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, Volume2, VolumeX } from 'lucide-react';
import useAuthStore from '../../store/authStore';

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

  // Mock response for development
  const useMockResponse = true;
  const mockVideoUrl = 'https://storage.googleapis.com/tavus-public-demo-videos/professor_demo.mp4';

  useEffect(() => {
    // Initialize conversation when component mounts
    initializeConversation();

    // Cleanup function
    return () => {
      // If needed, perform cleanup when component unmounts
    };
  }, []);

  const initializeConversation = async () => {
    try {
      setLoading(true);
      setError(null);

      if (useMockResponse) {
        // Use mock data for development
        setTimeout(() => {
          setConversationId('mock-conversation-id');
          setVideoUrl(mockVideoUrl);
          setLoading(false);
        }, 1500);
        return;
      }

      // Real API implementation
      const response = await axios.post(
        'https://api.tavus.io/v1/conversations', 
        {
          persona_id: 'p7636ec0d04c',
          replica_id: 'r95fd27b5a37',
          metadata: {
            user_id: user?.id || 'anonymous',
            user_name: user?.name || 'Student',
            subject: user?.subjects?.[0] || 'general'
          }
        },
        {
          headers: {
            'Authorization': 'Bearer 7c3787ab7bf24c2d8247ad651412987f',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.id) {
        setConversationId(response.data.id);
        
        // Set initial welcome video if available
        if (response.data.video_url) {
          setVideoUrl(response.data.video_url);
        } else {
          // Request initial greeting
          await sendMessage('Salut, te rog să te prezinți și să-mi explici cum mă poți ajuta cu învățarea.', true);
        }
        
        // Initialize conversation history with system message
        setConversationHistory([
          { 
            role: 'system', 
            content: `You are a helpful AI professor assistant named Professor Virtual. 
            You're speaking to ${user?.name || 'a student'} who is studying for 
            ${user?.examType === 'evaluareNationala' ? 'Evaluarea Națională' : 'Bacalaureat'}.
            They are interested in ${user?.subjects?.join(', ') || 'various subjects'}.
            Respond in Romanian language. Be helpful, encouraging, and educational.`
          }
        ]);
      } else {
        throw new Error('Nu s-a putut inițializa conversația');
      }
    } catch (err) {
      console.error('Error initializing conversation:', err);
      setError('Nu s-a putut inițializa conversația cu profesorul virtual. Te rugăm să încerci din nou.');
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, isInitial = false) => {
    if (!conversationId && !isInitial && !useMockResponse) {
      setError('Conversația nu a fost inițializată. Te rugăm să reîmprospătezi pagina.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Add user message to history
      if (!isInitial) {
        setConversationHistory(prev => [...prev, { role: 'user', content }]);
      }

      if (useMockResponse) {
        // Use mock data for development
        setTimeout(() => {
          setVideoUrl(mockVideoUrl);
          setConversationHistory(prev => [
            ...prev, 
            { 
              role: 'assistant', 
              content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Pot să-ți explic concepte, să răspund la întrebări și să te ghidez prin materialele de studiu. Cu ce te pot ajuta astăzi?' 
            }
          ]);
          setLoading(false);
        }, 1500);
        return;
      }

      // Real API implementation
      const endpoint = isInitial 
        ? 'https://api.tavus.io/v1/conversations' 
        : `https://api.tavus.io/v1/conversations/${conversationId}/messages`;

      const payload = isInitial 
        ? {
            persona_id: 'p7636ec0d04c',
            replica_id: 'r95fd27b5a37',
            message: content,
            metadata: {
              user_id: user?.id || 'anonymous',
              user_name: user?.name || 'Student',
              subject: user?.subjects?.[0] || 'general'
            }
          }
        : {
            content,
            metadata: {
              timestamp: new Date().toISOString()
            }
          };

      const response = await axios.post(
        endpoint,
        payload,
        {
          headers: {
            'Authorization': 'Bearer 7c3787ab7bf24c2d8247ad651412987f',
            'Content-Type': 'application/json'
          }
        }
      );

      if (isInitial && response.data && response.data.id) {
        setConversationId(response.data.id);
      }

      if (response.data && response.data.video_url) {
        setVideoUrl(response.data.video_url);
        
        // Add assistant response to history
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: response.data.transcript || 'Răspunsul profesorului virtual' 
          }
        ]);
      } else if (response.data && response.data.status === 'processing') {
        // If video is processing, poll for status
        pollForVideoStatus(response.data.id);
      } else {
        throw new Error('Nu s-a primit un răspuns valid');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Nu s-a putut trimite mesajul. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  const pollForVideoStatus = async (messageId: string) => {
    if (!conversationId && !useMockResponse) return;

    if (useMockResponse) {
      // Use mock data for development
      setTimeout(() => {
        setVideoUrl(mockVideoUrl);
        setConversationHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: 'Bună ziua! Sunt Profesorul Virtual și sunt aici să te ajut cu învățarea. Pot să-ți explic concepte, să răspund la întrebări și să te ghidez prin materialele de studiu. Cu ce te pot ajuta astăzi?' 
          }
        ]);
      }, 1500);
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `https://api.tavus.io/v1/conversations/${conversationId}/messages/${messageId}`,
          {
            headers: {
              'Authorization': 'Bearer 7c3787ab7bf24c2d8247ad651412987f'
            }
          }
        );

        if (response.data && response.data.video_url) {
          setVideoUrl(response.data.video_url);
          
          // Add assistant response to history
          setConversationHistory(prev => [
            ...prev, 
            { 
              role: 'assistant', 
              content: response.data.transcript || 'Răspunsul profesorului virtual' 
            }
          ]);
          
          return true;
        } else if (response.data && response.data.status === 'failed') {
          throw new Error('Generarea videoclipului a eșuat');
        }
        
        return false;
      } catch (err) {
        console.error('Error checking message status:', err);
        throw err;
      }
    };

    // Poll every 2 seconds for up to 30 seconds
    let attempts = 0;
    const maxAttempts = 15;
    
    const poll = async () => {
      if (attempts >= maxAttempts) {
        setError('Generarea răspunsului video durează mai mult decât de obicei. Te rugăm să încerci din nou.');
        return;
      }
      
      try {
        const isDone = await checkStatus();
        if (!isDone) {
          attempts++;
          setTimeout(poll, 2000);
        }
      } catch (err) {
        setError('A apărut o eroare în timpul generării răspunsului video.');
      }
    };
    
    poll();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    
    const userMessage = message.trim();
    setMessage('');
    await sendMessage(userMessage);
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
    initializeConversation();
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
                <p className="text-white/80 text-xs">Asistent educațional AI</p>
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
                loop={retryCount > 0} // Loop video if we've had to retry
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
                  <p className="text-white/70 text-xs mt-1">Asistent educațional AI</p>
                </div>
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