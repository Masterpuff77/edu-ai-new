import { create } from 'zustand';
import axios from 'axios';

interface TavusState {
  conversationId: string | null;
  loading: boolean;
  error: string | null;
  videoUrl: string | null;
  conversationHistory: Array<{role: string, content: string}>;
  initializeConversation: (userId: string, userName: string, subject: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearConversation: () => void;
}

const API_KEY = '7c3787ab7bf24c2d8247ad651412987f';
const PERSONA_ID = 'p7636ec0d04c';
const REPLICA_ID = 'r95fd27b5a37';
const API_URL = 'https://api.tavus.io/v1';

const useTavusStore = create<TavusState>((set, get) => ({
  conversationId: null,
  loading: false,
  error: null,
  videoUrl: null,
  conversationHistory: [],

  initializeConversation: async (userId, userName, subject) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post(
        `${API_URL}/conversations`,
        {
          persona_id: PERSONA_ID,
          replica_id: REPLICA_ID,
          metadata: {
            user_id: userId,
            user_name: userName,
            subject: subject
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.id) {
        set({ 
          conversationId: response.data.id,
          conversationHistory: [
            { 
              role: 'system', 
              content: `You are a helpful AI professor assistant named Professor Virtual. 
              You're speaking to ${userName} who is studying ${subject}.
              Respond in Romanian language. Be helpful, encouraging, and educational.`
            }
          ]
        });

        // Request initial greeting
        await get().sendMessage('Salut, te rog să te prezinți și să-mi explici cum mă poți ajuta cu învățarea.');
      } else {
        throw new Error('Nu s-a putut inițializa conversația');
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
      set({ 
        error: 'Nu s-a putut inițializa conversația cu profesorul virtual. Te rugăm să încerci din nou.' 
      });
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (content) => {
    const { conversationId } = get();
    
    if (!conversationId) {
      set({ error: 'Conversația nu a fost inițializată. Te rugăm să reîmprospătezi pagina.' });
      return;
    }

    try {
      set({ loading: true, error: null });

      // Add user message to history
      set(state => ({
        conversationHistory: [...state.conversationHistory, { role: 'user', content }]
      }));

      const response = await axios.post(
        `${API_URL}/conversations/${conversationId}/messages`,
        {
          content,
          metadata: {
            timestamp: new Date().toISOString()
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.video_url) {
        set({ 
          videoUrl: response.data.video_url,
          conversationHistory: [
            ...get().conversationHistory,
            { 
              role: 'assistant', 
              content: response.data.transcript || 'Răspunsul profesorului virtual' 
            }
          ]
        });
      } else if (response.data && response.data.status === 'processing') {
        // If video is processing, poll for status
        await pollForVideoStatus(conversationId, response.data.id);
      } else {
        throw new Error('Nu s-a primit un răspuns valid');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      set({ error: 'Nu s-a putut trimite mesajul. Te rugăm să încerci din nou.' });
    } finally {
      set({ loading: false });
    }
  },

  clearConversation: () => {
    set({
      conversationId: null,
      videoUrl: null,
      conversationHistory: [],
      error: null
    });
  }
}));

// Helper function to poll for video status
const pollForVideoStatus = async (conversationId: string, messageId: string) => {
  const { set, get } = useTavusStore.getState() as any;
  
  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/conversations/${conversationId}/messages/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      );

      if (response.data && response.data.video_url) {
        set({ 
          videoUrl: response.data.video_url,
          conversationHistory: [
            ...get().conversationHistory,
            { 
              role: 'assistant', 
              content: response.data.transcript || 'Răspunsul profesorului virtual' 
            }
          ]
        });
        
        return true;
      } else if (response.data && response.data.status === 'failed') {
        throw new Error('Generarea videoclipului a eșuat');
      }
      
      return false;
    } catch (error) {
      console.error('Error checking message status:', error);
      throw error;
    }
  };

  // Poll every 2 seconds for up to 30 seconds
  let attempts = 0;
  const maxAttempts = 15;
  
  const poll = async () => {
    if (attempts >= maxAttempts) {
      set({ error: 'Generarea răspunsului video durează mai mult decât de obicei. Te rugăm să încerci din nou.' });
      return;
    }
    
    try {
      const isDone = await checkStatus();
      if (!isDone) {
        attempts++;
        setTimeout(poll, 2000);
      }
    } catch (error) {
      set({ error: 'A apărut o eroare în timpul generării răspunsului video.' });
    }
  };
  
  poll();
};

export default useTavusStore;