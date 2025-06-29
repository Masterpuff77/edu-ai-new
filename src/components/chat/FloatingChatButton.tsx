import React, { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const FloatingChatButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const openTavusChat = async () => {
    try {
      setLoading(true);
      
      // Tavus API configuration
      const apiKey = import.meta.env.VITE_TAVUS_API_KEY || '7c3787ab7bf24c2d8247ad651412987f';
      const personaId = import.meta.env.VITE_TAVUS_PERSONA_ID || 'p7636ec0d04c';
      const replicaId = import.meta.env.VITE_TAVUS_REPLICA_ID || 'r95fd27b5a37';

      // Define the payload for creating a conversation
      const payload = {
        persona_id: personaId,
        replica_id: replicaId,
        conversation_name: "EduAI CVI – Doamna Petrescu",
        conversational_context: "Office‑style CVI call. Avatar remains still during pauses and turn‑taking.",
        properties: {
          max_call_duration: 3600,
          participant_left_timeout: 60,
          enable_recording: false
        }
      };

      // Make the API request to Tavus
      const response = await axios.post(
        "https://tavusapi.com/v2/conversations",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );

      // Open the conversation URL in a new window
      if (response.data && response.data.conversation_url) {
        window.open(
          response.data.conversation_url,
          "_blank",
          "width=800,height=600"
        );
      } else {
        throw new Error('No conversation URL returned');
      }
    } catch (error) {
      console.error('Error opening chat:', error);
      alert('Nu s-a putut deschide conversația. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={openTavusChat}
        disabled={loading}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Open chat"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;