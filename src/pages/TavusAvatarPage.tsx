import React, { useState, useEffect } from 'react';
import { ArrowLeft, Video, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TavusConversationResponse {
  id: string;
  persona_id: string;
  replica_id: string;
  conversation_name: string;
  conversation_url: string;
  created_at: string;
  updated_at: string;
}

const TavusAvatarPage: React.FC = () => {
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createConversation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call our serverless function to create a conversation
      const response = await axios.post<TavusConversationResponse>(
        '/.netlify/functions/createConversation'
      );

      // Extract the conversation URL from the response
      const { conversation_url } = response.data;
      setConversationUrl(conversation_url);
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Nu s-a putut crea conversația. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Înapoi"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Conversație cu Doamna Petrescu (CVI)
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {!conversationUrl ? (
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Video className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Conversație video interactivă
              </h2>
              <p className="text-gray-600 mb-8 text-center max-w-md">
                Începe o conversație video interactivă cu Doamna Petrescu, asistentul virtual care te poate ajuta cu întrebări despre educație.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={createConversation}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Se inițializează...
                  </>
                ) : (
                  <>
                    <Video className="h-5 w-5 mr-2" />
                    Începe conversația cu Doamna Petrescu
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="aspect-video w-full">
              <iframe
                src={conversationUrl}
                width="100%"
                height="100%"
                allow="camera; microphone; display-capture; autoplay"
                className="w-full h-full border-0"
                title="Tavus Avatar Conversation"
              />
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h3 className="text-lg font-medium text-indigo-800 mb-2">Despre Doamna Petrescu</h3>
          <p className="text-indigo-700">
            Doamna Petrescu este un avatar virtual creat cu tehnologia Tavus.io. Ea poate purta conversații naturale și poate răspunde la întrebări despre educație, oferind o experiență interactivă personalizată.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TavusAvatarPage;