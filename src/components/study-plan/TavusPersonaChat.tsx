import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, User, Loader2 } from 'lucide-react';

interface TavusPersonaChatProps {
  activeSubject: string;
}

const TavusPersonaChat: React.FC<TavusPersonaChatProps> = ({ activeSubject }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const conversationRef = useRef<any>(null);

  const TAVUS_API_KEY = '7b9fff8fda7d400d96a9d3b769828de2';
  const PERSONA_ID = 'p7636ec0d04c';
  const REPLICA_ID = 'r95fd27b5a37';

  useEffect(() => {
    // Load Tavus SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.tavusapi.com/tavus-sdk.js';
    script.async = true;
    script.onload = () => {
      console.log('Tavus SDK loaded successfully');
    };
    script.onerror = () => {
      setError('Failed to load Tavus SDK');
    };
    document.head.appendChild(script);

    return () => {
      if (conversationRef.current) {
        conversationRef.current.endConversation();
      }
      document.head.removeChild(script);
    };
  }, []);

  const startConversation = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Check if Tavus SDK is loaded
      if (typeof window.Tavus === 'undefined') {
        throw new Error('Tavus SDK not loaded');
      }

      // Create conversation with persona
      const conversation = new window.Tavus.Conversation({
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
          setError(error.message || 'An error occurred');
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
      conversationRef.current.endConversation();
      conversationRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  const toggleMute = () => {
    if (conversationRef.current) {
      if (isMuted) {
        conversationRef.current.unmute();
      } else {
        conversationRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (conversationRef.current) {
      if (isVideoOn) {
        conversationRef.current.pauseVideo();
      } else {
        conversationRef.current.resumeVideo();
      }
      setIsVideoOn(!isVideoOn);
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
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Începe conversația
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
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
            >
              Încearcă din nou
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
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