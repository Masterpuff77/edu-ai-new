import React, { useState, useEffect, useRef } from 'react';
import { Video, Play, Pause, Volume2, VolumeX, Loader2, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import tavusService from '../../services/tavusService';

interface VirtualTeacherLessonProps {
  lessonTitle: string;
  subject: string;
}

const VirtualTeacherLesson: React.FC<VirtualTeacherLessonProps> = ({ 
  lessonTitle, 
  subject 
}) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if we have a cached video URL for this lesson
    const cacheKey = `${subject}_${lessonTitle.replace(/\s+/g, '_')}`;
    const cachedVideo = tavusService.getStoredVideoUrl(cacheKey);
    
    if (cachedVideo) {
      setVideoUrl(cachedVideo);
    }
  }, [subject, lessonTitle]);

  const generateLessonVideo = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Prepare the lesson introduction message
      const userName = user.name || 'elev';
      const lessonMessage = `Salut ${userName}! Sunt profesorul tău virtual pentru ${subject}. Astăzi vom studia "${lessonTitle}". Această lecție este importantă pentru înțelegerea conceptelor fundamentale. Sunt aici să te ajut să înțelegi mai bine materialul. Hai să începem!`;
      
      // Generate video
      const cacheKey = `${subject}_${lessonTitle.replace(/\s+/g, '_')}`;
      const response = await tavusService.generateVideo(lessonMessage);
      
      // Poll for video status
      await tavusService.pollVideoStatus(
        response.id,
        (url) => {
          setVideoUrl(url);
          tavusService.storeVideoUrl(cacheKey, url);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error('Error generating lesson video:', err);
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Video className="h-5 w-5 text-indigo-600 mr-2" />
            Profesorul virtual
          </h3>
          
          {!videoUrl && !loading && (
            <button
              onClick={generateLessonVideo}
              className="px-3 py-1.5 text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Generează introducere video
            </button>
          )}
        </div>

        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-3">
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePlayPause}
                    className="p-1.5 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={handleMuteToggle}
                    className="p-1.5 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
              <Loader2 className="h-10 w-10 text-white animate-spin mb-3" />
              <p className="text-white text-sm">Se generează videoclipul...</p>
              <p className="text-white/70 text-xs mt-2">Acest proces poate dura până la un minut</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-white/80" />
                </div>
                <h4 className="text-white text-base font-medium">Profesor Virtual</h4>
                <p className="text-white/70 text-xs mt-1">Apasă butonul pentru a genera un videoclip introductiv</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm mb-3">
            {error}
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>Profesorul virtual îți explică conceptele cheie din această lecție.</p>
          <p className="mt-1 text-xs text-gray-500">Powered by Tavus AI</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTeacherLesson;