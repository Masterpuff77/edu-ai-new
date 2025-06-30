import React, { useState, useEffect, useRef } from 'react';
import { Video, Play, Pause, Volume2, VolumeX, Loader2, User } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

interface VirtualTeacherWidgetProps {
  subject?: string;
  lessonTitle?: string;
}

const VirtualTeacherWidget: React.FC<VirtualTeacherWidgetProps> = ({ 
  subject = 'general',
  lessonTitle = 'Bun venit la EduAI'
}) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tavus API configuration
  const TAVUS_API_KEY = '7c3787ab7bf24c2d8247ad651412987f';
  const PERSONA_ID = 'p7636ec0d04c';
  const REPLICA_ID = 'r95fd27b5a37';

  useEffect(() => {
    // Check if we have a cached video URL for this subject/lesson
    const cachedVideo = localStorage.getItem(`tavus_video_${subject}_${lessonTitle}`);
    if (cachedVideo) {
      setVideoUrl(cachedVideo);
    }
  }, [subject, lessonTitle]);

  const generateWelcomeVideo = async () => {
    if (!user) return;
    
    try {
      setGeneratingVideo(true);
      setError(null);
      
      // Prepare the welcome message based on subject and user name
      const userName = user.name || 'elev';
      const welcomeMessage = `Salut ${userName}! Sunt profesorul tău virtual pentru ${subject === 'general' ? 'toate materiile' : subject}. Sunt aici să te ajut cu lecția "${lessonTitle}". Poți să-mi pui orice întrebare și voi face tot posibilul să te ajut să înțelegi mai bine conceptele. Hai să începem!`;
      
      // Call Tavus API to generate video
      const response = await axios.post(
        'https://api.tavus.io/v2/videos/replicas',
        {
          replica_id: REPLICA_ID,
          script: welcomeMessage
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TAVUS_API_KEY}`
          }
        }
      );
      
      // Check if we got a valid response
      if (response.data && response.data.id) {
        // Poll for video status
        await checkVideoStatus(response.data.id);
      } else {
        throw new Error('Nu am primit un răspuns valid de la serviciul video');
      }
    } catch (err) {
      console.error('Error generating welcome video:', err);
      setError('Nu am putut genera videoclipul. Te rugăm să încerci din nou mai târziu.');
      setGeneratingVideo(false);
    }
  };

  const checkVideoStatus = async (videoId: string) => {
    try {
      // Poll every 3 seconds until video is ready
      const checkStatus = async () => {
        const statusResponse = await axios.get(
          `https://api.tavus.io/v2/videos/${videoId}`,
          {
            headers: {
              'Authorization': `Bearer ${TAVUS_API_KEY}`
            }
          }
        );
        
        if (statusResponse.data.status === 'completed') {
          // Video is ready
          setVideoUrl(statusResponse.data.url);
          localStorage.setItem(`tavus_video_${subject}_${lessonTitle}`, statusResponse.data.url);
          setGeneratingVideo(false);
        } else if (statusResponse.data.status === 'failed') {
          // Video generation failed
          throw new Error('Generarea videoclipului a eșuat');
        } else {
          // Still processing, check again after delay
          setTimeout(checkStatus, 3000);
        }
      };
      
      await checkStatus();
    } catch (err) {
      console.error('Error checking video status:', err);
      setError('A apărut o eroare la verificarea stării videoclipului.');
      setGeneratingVideo(false);
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
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Video className="h-5 w-5 text-indigo-600 mr-2" />
            Profesorul virtual
          </h3>
          
          {!videoUrl && !generatingVideo && (
            <button
              onClick={generateWelcomeVideo}
              className="px-3 py-1.5 text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Generează video
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
          ) : generatingVideo ? (
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
                <p className="text-white/70 text-xs mt-1">Apasă butonul pentru a genera un videoclip</p>
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
          <p>Profesorul virtual te poate ajuta să înțelegi mai bine conceptele din lecție.</p>
          <p className="mt-1 text-xs text-gray-500">Powered by Tavus AI</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTeacherWidget;