import React, { useState } from 'react';
import { Video, Play, Loader2, User } from 'lucide-react';
import axios from 'axios';

interface TavusTeacherCardProps {
  title?: string;
  description?: string;
}

const TavusTeacherCard: React.FC<TavusTeacherCardProps> = ({ 
  title = "Doamna Petrescu", 
  description = "Profesoara ta virtuală interactivă" 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);

  const createConversation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Tavus API configuration
      const apiKey = '7c3787ab7bf24c2d8247ad651412987f';
      const personaId = 'p7636ec0d04c';
      const replicaId = 'r95fd27b5a37';

      // Define the payload for creating a conversation
      const payload = {
        persona_id: personaId,
        replica_id: replicaId,
        conversation_name: "BoltNew CVI – Doamna Petrescu",
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

      // Extract the conversation URL
      const conversationUrl = response.data.conversation_url;
      setConversationUrl(conversationUrl);
      
      // Open the conversation in a new window
      if (conversationUrl) {
        window.open(conversationUrl, "_blank", "width=800,height=600");
      }
    } catch (error) {
      console.error('Error creating Tavus conversation:', error);
      setError('Nu s-a putut crea conversația. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4 shadow-lg">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          
          <div className="flex-1">
            <p className="text-white/90 mb-4">
              Discută cu Doamna Petrescu, profesoara virtuală care te poate ajuta cu întrebări despre educație și procesul de învățare.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button
              onClick={createConversation}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se inițializează...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Începe conversația
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TavusTeacherCard;