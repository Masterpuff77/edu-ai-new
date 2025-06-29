import axios from 'axios';

// API configuration
const API_KEY = '7c3787ab7bf24c2d8247ad651412987f';
const PERSONA_ID = 'p7636ec0d04c';
const REPLICA_ID = 'r95fd27b5a37';
const API_URL = 'https://api.tavus.io/v1';

// Types
export interface TavusConversation {
  id: string;
  persona_id: string;
  replica_id: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface TavusMessage {
  id: string;
  conversation_id: string;
  content: string;
  role: 'user' | 'assistant';
  status: 'created' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  transcript?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

// Error handling
class TavusError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'TavusError';
    this.status = status;
  }
}

// Service class
export class TavusService {
  private static instance: TavusService;
  private axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 second timeout
  });

  // Singleton pattern
  public static getInstance(): TavusService {
    if (!TavusService.instance) {
      TavusService.instance = new TavusService();
    }
    return TavusService.instance;
  }

  // Initialize logging interceptors
  constructor() {
    // Request logging
    this.axiosInstance.interceptors.request.use(
      config => {
        console.log(`[Tavus API] Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        console.error('[Tavus API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response logging
    this.axiosInstance.interceptors.response.use(
      response => {
        console.log(`[Tavus API] Response: ${response.status} ${response.statusText}`);
        return response;
      },
      error => {
        console.error('[Tavus API] Response error:', error.response?.status, error.response?.data || error.message);
        return Promise.reject(
          new TavusError(
            error.response?.data?.message || 'An unknown error occurred',
            error.response?.status || 500
          )
        );
      }
    );
  }

  // Create a new conversation
  async createConversation(metadata: Record<string, any> = {}): Promise<TavusConversation> {
    try {
      const response = await this.axiosInstance.post('/conversations', {
        persona_id: PERSONA_ID,
        replica_id: REPLICA_ID,
        metadata
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  }

  // Send a message in an existing conversation
  async sendMessage(conversationId: string, content: string, metadata: Record<string, any> = {}): Promise<TavusMessage> {
    try {
      const response = await this.axiosInstance.post(`/conversations/${conversationId}/messages`, {
        content,
        metadata
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  // Get a message by ID
  async getMessage(conversationId: string, messageId: string): Promise<TavusMessage> {
    try {
      const response = await this.axiosInstance.get(`/conversations/${conversationId}/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get message:', error);
      throw error;
    }
  }

  // Get conversation history
  async getConversationHistory(conversationId: string): Promise<TavusMessage[]> {
    try {
      const response = await this.axiosInstance.get(`/conversations/${conversationId}/messages`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get conversation history:', error);
      throw error;
    }
  }

  // Health check to verify API connectivity
  async checkApiHealth(): Promise<boolean> {
    try {
      // Use a simple GET request to check if the API is accessible
      await this.axiosInstance.get('/health');
      return true;
    } catch (error) {
      console.error('Tavus API health check failed:', error);
      return false;
    }
  }

  // Poll for message status until video is ready
  async pollForVideoStatus(conversationId: string, messageId: string, maxAttempts = 15): Promise<TavusMessage> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const checkStatus = async () => {
        try {
          const message = await this.getMessage(conversationId, messageId);
          
          if (message.video_url) {
            resolve(message);
            return;
          }
          
          if (message.status === 'failed') {
            reject(new TavusError('Video generation failed', 500));
            return;
          }
          
          if (attempts >= maxAttempts) {
            reject(new TavusError('Timeout waiting for video generation', 408));
            return;
          }
          
          attempts++;
          setTimeout(checkStatus, 2000);
        } catch (error) {
          reject(error);
        }
      };
      
      checkStatus();
    });
  }
}

// Export singleton instance
export default TavusService.getInstance();