import axios from 'axios';

// Tavus API configuration
const TAVUS_API_KEY = '7c3787ab7bf24c2d8247ad651412987f';
const PERSONA_ID = 'p7636ec0d04c';
const REPLICA_ID = 'r95fd27b5a37';
const BASE_URL = 'https://api.tavus.io/v2';

// Types
export interface TavusVideoResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  url?: string;
  created_at: string;
}

export interface TavusReplicaResponse {
  id: string;
  status: string;
}

// Service functions
export const generateVideo = async (script: string): Promise<TavusReplicaResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/videos/replicas`,
      {
        replica_id: REPLICA_ID,
        script
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TAVUS_API_KEY}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error generating Tavus video:', error);
    throw new Error('Failed to generate video');
  }
};

export const getVideoStatus = async (videoId: string): Promise<TavusVideoResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/videos/${videoId}`,
      {
        headers: {
          'Authorization': `Bearer ${TAVUS_API_KEY}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error checking Tavus video status:', error);
    throw new Error('Failed to check video status');
  }
};

export const pollVideoStatus = async (
  videoId: string, 
  onSuccess: (url: string) => void,
  onError: (error: string) => void,
  maxAttempts = 20
): Promise<void> => {
  let attempts = 0;
  
  const checkStatus = async () => {
    try {
      attempts++;
      const videoData = await getVideoStatus(videoId);
      
      if (videoData.status === 'completed' && videoData.url) {
        onSuccess(videoData.url);
        return;
      } else if (videoData.status === 'failed') {
        onError('Video generation failed');
        return;
      } else if (attempts >= maxAttempts) {
        onError('Timeout: Video generation is taking too long');
        return;
      }
      
      // Still processing, check again after delay
      setTimeout(checkStatus, 3000);
    } catch (error) {
      onError('Error checking video status');
    }
  };
  
  await checkStatus();
};

// Store video in local storage
export const storeVideoUrl = (key: string, url: string): void => {
  localStorage.setItem(`tavus_video_${key}`, url);
};

// Get video from local storage
export const getStoredVideoUrl = (key: string): string | null => {
  return localStorage.getItem(`tavus_video_${key}`);
};

export default {
  generateVideo,
  getVideoStatus,
  pollVideoStatus,
  storeVideoUrl,
  getStoredVideoUrl
};