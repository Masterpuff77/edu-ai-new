import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, Loader2, Play, Pause, Volume2, VolumeX, User, MessageSquare, Send } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import useAuthStore from '../store/authStore';
import tavusService from '../services/tavusService';

const VirtualTeacherPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [question, setQuestion] = useState('');
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{question: string; videoUrl: string | null}[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if we have a cached welcome video
    const cachedVideo = tavusService.getStoredVideoUrl('welcome');
    if (cachedVideo) {
      setVideoUrl(cachedVideo);
    } else {
      generateWelcomeVideo();
    }
  }, []);

  const generateWelcomeVideo = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Prepare the welcome message
      const userName = user.name || 'elev';
      const welcomeMessage = `Salut ${userName}! Sunt profesorul tău virtual. Sunt aici să te ajut să înțelegi mai bine conceptele din lecțiile tale. Poți să-mi pui orice întrebare legată de materiile tale și voi face tot posibilul să te ajut. Ce vrei să înveți astăzi?`;
      
      // Generate video
      const response = await tavusService.generateVideo(welcomeMessage);
      
      // Poll for video status
      await tavusService.pollVideoStatus(
        response.id,
        (url) => {
          setVideoUrl(url);
          tavusService.storeVideoUrl('welcome', url);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error('Error generating welcome video:', err);
      setError('Nu am putut genera videoclipul. Te rugăm să încerci din nou mai târziu.');
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || generatingResponse) return;
    
    const userQuestion = question.trim();
    setQuestion('');
    setGeneratingResponse(true);
    
    try {
      // In a real implementation, we would send the question to an API
      // For now, we'll simulate a response
      const response = await tavusService.generateVideo(
        `Răspuns la întrebarea: "${userQuestion}". Aceasta este o demonstrație a profesorului virtual. Într-o implementare completă, aș răspunde cu informații relevante despre întrebarea ta.`
      );
      
      // Poll for video status
      await tavusService.pollVideoStatus(
        response.id,
        (url) => {
          setConversations([...conversations, { question: userQuestion, videoUrl: url }]);
          setGeneratingResponse(false);
        },
        (error) => {
          setError(error);
          setGeneratingResponse(false);
        }
      );
    } catch (err) {
      console.error('Error generating response video:', err);
      setError('Nu am putut genera răspunsul video. Te rugăm să încerci din nou mai târziu.');
      setGeneratingResponse(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pb-8 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Înapoi"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Profesorul Virtual
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                    <Video className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Asistentul tău video
                  </h2>
                </div>
              </div>

              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                {videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      onEnded={handleVideoEnded}
                      playsInline
                    />
                    
                    {/* Video controls overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={handlePlayPause}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        
                        <button
                          onClick={handleMuteToggle}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
                    <Loader2 className="h-10 w-10 text-white animate-spin mb-3" />
                    <p className="text-white text-sm">Se încarcă profesorul virtual...</p>
                    <p className="text-white/70 text-xs mt-2">Acest proces poate dura până la un minut</p>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-3">
                        <User className="h-10 w-10 text-white/80" />
                      </div>
                      <h4 className="text-white text-base font-medium">Profesor Virtual</h4>
                      <p className="text-white/70 text-xs mt-1">Se încarcă...</p>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitQuestion} className="mt-6">
                <div className="flex items-center">
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Pune o întrebare profesorului virtual..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={generatingResponse}
                    />
                    {generatingResponse && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!question.trim() || generatingResponse}
                    className="ml-3 p-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Previous conversations */}
          {conversations.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Conversații anterioare
                </h3>
                
                <div className="space-y-6">
                  {conversations.map((conv, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b border-gray-200">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-indigo-600 mr-2" />
                          <p className="text-sm font-medium text-gray-700">{conv.question}</p>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        {conv.videoUrl ? (
                          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                            <video
                              src={conv.videoUrl}
                              className="w-full h-full object-cover"
                              controls
                              playsInline
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
                            <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start">
              <Lightbulb className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-indigo-900">Sfat pentru utilizare</h4>
                <p className="text-xs text-indigo-700 mt-1">
                  Profesorul virtual poate răspunde la întrebări despre lecții, poate explica concepte și poate oferi exemple. 
                  Încearcă să pui întrebări clare și specifice pentru a primi cele mai bune răspunsuri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VirtualTeacherPage;