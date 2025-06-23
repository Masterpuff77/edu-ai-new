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
  const [error, setError] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const conversationRef = useRef<any>(null);
  const sdkRef = useRef<any>(null);

  // Tavus configuration
  const TAVUS_API_KEY = '7b9fff8fda7d400d96a9d3b769828de2';
  const PERSONA_ID = 'p7636ec0d04c';
  const REPLICA_ID = 'r95fd27b5a37';

  useEffect(() => {
    const initTavusSDK = async () => {
      try {
        setError(null);
        
        // Import Tavus SDK dynamically
        const TavusSDK = await import('@tavus/sdk');
        sdkRef.current = TavusSDK.default || TavusSDK;
        
        // Initialize SDK
        await sdkRef.current.init({
          apiKey: TAVUS_API_KEY
        });
        
        setSdkReady(true);
        console.log('Tavus SDK initialized successfully');
        
      } catch (error: any) {
        console.error('Failed to initialize Tavus SDK:', error);
        setError('Nu s-a putut inițializa SDK-ul Tavus. Serviciul poate fi temporar indisponibil.');
      }
    };

    initTavusSDK();

    return () => {
      if (conversationRef.current) {
        try {
          conversationRef.current.disconnect();
        } catch (e) {
          console.warn('Error disconnecting conversation:', e);
        }
      }
    };
  }, []);

  const startConversation = async () => {
    if (!sdkRef.current || !sdkReady) {
      setError('SDK-ul Tavus nu este încă gata. Vă rugăm să așteptați.');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      // Create conversation with persona
      const conversation = await sdkRef.current.createConversation({
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
          setError(error.message || 'A apărut o eroare în timpul conversației');
          setIsConnecting(false);
          setIsConnected(false);
        }
      });

      conversationRef.current = conversation;

      // Start the conversation
      await conversation.connect();

    } catch (error: any) {
      console.error('Error starting conversation:', error);
      setError(error.message || 'Nu s-a putut începe conversația');
      setIsConnecting(false);
    }
  };

  const endConversation = () => {
    if (conversationRef.current) {
      try {
        conversationRef.current.disconnect();
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

  const retryInitialization = async () => {
    setError(null);
    setSdkReady(false);
    
    try {
      // Re-import and initialize SDK
      const TavusSDK = await import('@tavus/sdk');
      sdkRef.current = TavusSDK.default || TavusSDK;
      
      await sdkRef.current.init({
        apiKey: TAVUS_API_KEY
      });
      
      setSdkReady(true);
    } catch (error: any) {
      setError('Nu s-a putut inițializa SDK-ul Tavus. Serviciul poate fi temporar indisponibil.');
    }
  };

  // Fallback UI when SDK fails to load
  const renderFallbackUI = () => (
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
                Serviciul temporar indisponibil
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-white text-lg font-medium mb-2">Serviciu temporar indisponibil</h4>
              <p className="text-white text-opacity-80 text-sm mb-6">
                Profesorul virtual nu poate fi accesat momentan. Vă rugăm să încercați mai târziu.
              </p>
              <div className="space-y-3">
                <button
                  onClick={retryInitialization}
                  className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-white text-purple-900 hover:bg-gray-100 transition-colors"
                >
                  <Loader2 className="h-5 w-5 mr-2" />
                  Încearcă din nou
                </button>
                <div>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-white text-opacity-80 hover:text-white text-sm underline"
                  >
                    Reîncarcă pagina
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-900 mb-2">Alternativă disponibilă</h4>
              <p className="text-amber-800 text-sm mb-3">
                În timp ce profesorul virtual nu este disponibil, poți folosi asistentul AI din secțiunea Dashboard pentru întrebări despre {getSubjectName(activeSubject)}.
              </p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium underline"
              >
                Mergi la Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show fallback UI if there's a persistent error
  if (error && !sdkReady) {
    return renderFallbackUI();
  }

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
                  disabled={!sdkReady}
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    sdkReady
                      ? 'bg-white text-purple-900 hover:bg-gray-100'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Video className="h-5 w-5 mr-2" />
                  {sdkReady ? 'Începe conversația' : 'Se încarcă...'}
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
                <div className="mt-3">
                  <button
                    onClick={retryInitialization}
                    className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                  >
                    Încearcă din nou
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Status */}
        {!sdkReady && !error && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-3" />
              <div>
                <p className="text-blue-700 text-sm font-medium">Se inițializează SDK-ul Tavus...</p>
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