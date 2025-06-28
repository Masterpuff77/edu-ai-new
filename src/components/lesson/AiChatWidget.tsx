import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Loader2, Trash2 } from 'lucide-react';
import supabase from '../../config/supabase';
import useAuthStore from '../../store/authStore';
import MathRenderer from '../common/MathRenderer';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AiChatWidgetProps {
  lessonTitle: string;
  subject: string;
}

const AiChatWidget: React.FC<AiChatWidgetProps> = ({ lessonTitle, subject }) => {
  const { user } = useAuthStore();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '0',
        content: `Salut! Sunt aici să te ajut cu lecția "${lessonTitle}". Poți să-mi pui orice întrebare legată de ${subject} sau despre această lecție specifică. Ce te interesează să știi?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [lessonTitle, subject]);

  const clearConversation = () => {
    const welcomeMessage: Message = {
      id: '0',
      content: `Salut! Sunt aici să te ajut cu lecția "${lessonTitle}". Poți să-mi pui orice întrebare legată de ${subject} sau despre această lecție specifică. Ce te interesează să știi?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setError(null);
  };

  // Function to render text with math expressions
  const renderTextWithMath = (text: string) => {
    // Split text by math expressions (both inline and display)
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\\[\[\(][\s\S]*?\\[\]\)])/);
    
    return parts.map((part, index) => {
      // Check if this part is a math expression
      if (part.match(/^\$\$[\s\S]*\$\$$/) || part.match(/^\\[\[\(][\s\S]*\\[\]\)]$/)) {
        // Display math
        return <MathRenderer key={index} inline={false}>{part}</MathRenderer>;
      } else if (part.match(/^\$[\s\S]*\$$/)) {
        // Inline math
        return <MathRenderer key={index} inline={true}>{part}</MathRenderer>;
      } else {
        // Regular text - preserve line breaks
        return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: question.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      // Prepare conversation context (last 10 messages for context)
      const recentMessages = messages.slice(-10);
      const conversationContext = recentMessages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));

      // Add current user message to context
      conversationContext.push({
        role: 'user',
        content: userMessage.content
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
          context: conversationContext,
          userProfile: {
            subjects: user?.subjects,
            level: user?.level,
            examType: user?.examType,
            grade: user?.grade
          },
          lessonContext: {
            title: lessonTitle,
            subject: subject
          }
        })
      });

      let data;
      
      if (response.ok) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Error parsing successful response JSON:', jsonError);
          throw new Error('Răspunsul serverului nu este valid');
        }
      } else {
        let errorMessage = 'A apărut o eroare la server';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          console.error('Error parsing error response JSON:', jsonError);
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setError(error instanceof Error ? error.message : 'A apărut o eroare neașteptată');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Întreabă AI-ul</h3>
          <button
            onClick={clearConversation}
            disabled={loading || messages.length <= 1}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Șterge conversația"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Messages Container */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto space-y-4 border-2 border-indigo-200">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white shadow-sm text-gray-800 border border-gray-200'
                }`}
              >
                <div className="text-sm">
                  {renderTextWithMath(message.content)}
                </div>
                <span className={`text-xs ${message.isUser ? 'text-indigo-200' : 'text-gray-400'} mt-1 block`}>
                  {message.timestamp.toLocaleTimeString('ro-RO', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm text-gray-800 border border-gray-200 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-gray-600">AI-ul scrie...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Scrie o întrebare..."
            className="w-full pr-20 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              className="p-1.5 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 mr-2"
              title="Întreabă vocal"
              disabled={loading}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={!question.trim() || loading}
              className="p-1.5 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiChatWidget;