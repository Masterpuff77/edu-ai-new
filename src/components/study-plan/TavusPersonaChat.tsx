import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, User, Loader2, AlertCircle } from 'lucide-react';

interface TavusPersonaChatProps {
  activeSubject: string;
}

const TavusPersonaChat: React.FC<TavusPersonaChatProps> = ({ activeSubject }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isTavusSdkLoaded, setIsTavusSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sdkLoadAttempts, setSdkLoadAttempts] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const conversationRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const TAVUS_API_KEY = '7b9fff8fda7d400d96a9d3b769828de2';
  const PERSONA_ID = 'p7636ec0d04c';
  const REPLICA_ID = 'r95fd27b5a37';

  const loadTavusSDK = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if SDK is already loaded
      if (typeof (window as any).Tavus !== 'undefined') {
        setIsTavusSdkLoaded(true);
        resolve();
        return;
      }

      // Remove existing script if any
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.tavusapi.com/tavus-sdk.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('Tavus SDK loaded successfully');
        // Wait a bit for the SDK to initialize
        setTimeout(() => {
          if (typeof (window as any).Tavus !== 'undefined') {
            setIsTavusSdkLoaded(true);
            setError(null);
            resolve();
          } else {
            reject(new Error('Tavus SDK loaded but not available'));
          }
        }, 500);
      };
      
      script.onerror = (e) => {
        console.error('Failed to load Tavus SDK:', e);
        reject(new Error('Failed to load Tavus SDK'));
      };

      scriptRef.current = script;
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    const initSDK = async () => {
      try {
        await loadTavusSDK();
      } catch (error: any) {
        console.error('SDK loading error:', error);
        setError(error.message || 'Failed to load Tavus SDK');
        setSdkLoadAttempts(prev => prev + 1);
      }
    };

    initSDK();

    return () => {
      if (conversationRef.current) {
        try {
          conversationRef.current.endConversation();
        } catch (e) {
          console.warn('Error ending conversation:', e);
        }
      }
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  const retrySDKLoad = async () => {
    setError(null);
    setIsTavusSdkLoaded(false);
    try {
      await loadTavusSDK();
    } catch (error: any) {
      setError(error.message || 'Failed to load Tavus SDK');
      setSdkLoadAttempts(prev => prev + 1);
    }
  };

  const startConversation = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Double check if Tavus SDK is loaded
      if (typeof (window as any).Tavus === 'undefined') {
        throw new Error('Tavus SDK not loaded. Please try refreshing the page.');
      }

      // Create conversation with persona
      const TavusClass = (window as any).Tavus;
      const conversation = new TavusClass.Conversation({
        apiKey: TAVUS_API_KEY,
        personaId: PERSONA_ID,
        replicaId: REPLICA_ID,
        videoElement: videoRef.current,
        onConversationStarted: () => {
          setIsConnected(true);
          setIsConnecting(false);
          console.log('Conversation started');
        },
        onConversationEnded: () => {
          setIsConnected(false);
          setIsConnecting(false);
          console.log('Conversation ended');
        },
        onError: (error: any) => {
          console.error('Conversation error:', error);
          setError(error.message || 'An error occurred during conversation');
          setIsConnecting(false);
          setIsConnected(false);
        }
      });

      conversationRef.current = conversation;

      // Start the conversation
      await conversation.start();

    } catch (error: any) {
      console.error('Error starting conversation:', error);
      setError(error.message || 'Failed to start conversation');
      setIsConnecting(false);
    }
  };

  const endConversation = () => {
    if (conversationRef.current) {
      try {
        conversationRef.current.endConversation();
      } catch (e) {
        console.warn('Error ending conversation:', e);
      }
      conversationRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  const toggleMute = () => {
    if (conversationRef.current) {
      try {
        if (isMuted) {
          conversationRef.current.unmute();
        } else {
          conversationRef.current.mute();
        }
        setIsMuted(!isMuted);
      } catch (e) {
        console.warn('Error toggling mute:', e);
      }
    }
  };

  const toggleVideo = () => {
    if (conversationRef.current) {
      try {
        if (isVideoOn) {
          conversationRef.current.pauseVideo();
        } else {
          conversationRef.current.resumeVideo();
        }
        setIsVideoOn(!isVideoOn);
      } catch (e) {
        console.warn('Error toggling video:', e);
      }
    }
  };

  const getSubjectName = (subject: string) => {
    const names: { [key: string]: string } = {
      matematica: 'Matematică',
      romana: 'Limba Română',
      fizica: 'Fizică',
      chimie: 'Chimie',
      biologie: 'Biologie',
      informatica: 'Informatică',
      geografie: 'Geografie',
      istorie: 'Istorie'
    };
    return names[subject] || subject;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Profesor Virtual AI</h3>
              <p className="text-sm text-gray-600">
                Discută cu profesorul virtual despre {getSubjectName(activeSubject)}
              </p>
            </div>
          </div>
          
          {isConnected && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Conectat</span>
            </div>
          )}
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted={false}
          />
          
          {!isConnected && !isConnecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
              <div className="text-center">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-white text-lg font-medium mb-2">Profesor Virtual AI</h4>
                <p className="text-white text-opacity-80 text-sm mb-6">
                  Începe o conversație video cu profesorul virtual pentru {getSubjectName(activeSubject)}
                </p>
                <button
                  onClick={startConversation}
                  disabled={!isTavusSdkLoaded}
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isTavusSdkLoaded
                      ? 'bg-white text-purple-900 hover:bg-gray-100'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Video className="h-5 w-5 mr-2" />
                  {isTavusSdkLoaded ? 'Începe conversația' : 'Se încarcă...'}
                </button>
              </div>
            </div>
          )}

          {isConnecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
                <p className="text-white text-lg">Se conectează la profesorul virtual...</p>
              </div>
            </div>
          )}

          {/* Video Controls */}
          {isConnected && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-6 py-3">
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-full transition-colors ${
                    isMuted ? 'bg-red-600 text-white' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={toggleVideo}
                  className={`p-2 rounded-full transition-colors ${
                    !isVideoOn ? 'bg-red-600 text-white' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={endConversation}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <PhoneOff className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-700 text-sm font-medium">Eroare de conectare</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={retrySDKLoad}
                    className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                  >
                    Încearcă din nou
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                  >
                    Reîncarcă pagina
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Status */}
        {!isTavusSdkLoaded && !error && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-3" />
              <div>
                <p className="text-blue-700 text-sm font-medium">Se încarcă SDK-ul Tavus...</p>
                <p className="text-blue-600 text-sm">Vă rugăm să așteptați câteva secunde.</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-2 border-purple-200">
          <h4 className="font-medium text-purple-900 mb-2">Cum să folosești profesorul virtual:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Începe conversația apăsând butonul "Începe conversația"</li>
            <li>• Vorbește natural cu profesorul despre {getSubjectName(activeSubject)}</li>
            <li>• Poți pune întrebări, cere explicații sau discuta exerciții</li>
            <li>• Folosește controalele pentru a gestiona microfonul și camera</li>
            <li>• Profesorul se va adapta la nivelul tău de cunoștințe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TavusPersonaChat;