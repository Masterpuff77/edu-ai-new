import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Trash2, Bot, Zap } from 'lucide-react';
import supabase from '../../config/supabase';
import useAuthStore from '../../store/authStore';
import MathRenderer from '../common/MathRenderer';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  userId?: string;
}

const LearningAssistant: React.FC = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      try {
        setInitialLoading(true);
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('userId', user.id)
          .order('timestamp', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedMessages = data.map(msg => ({
            id: msg.id,
            content: msg.content,
            isUser: msg.isUser,
            timestamp: new Date(msg.timestamp),
            userId: msg.userId
          }));
          setMessages(formattedMessages);
        } else {
          // Add welcome message if no previous messages
          const welcomeMessage: Message = {
            id: '0',
            content: 'Salut! Sunt asistentul tău AI pentru învățare. Ce cunoștințe vrei să-ți îmbunătățești azi? Pot să te ajut cu orice întrebare legată de materiile tale.',
            isUser: false,
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        // Fallback to welcome message
        const welcomeMessage: Message = {
          id: '0',
          content: 'Salut! Sunt asistentul tău AI pentru învățare. Ce cunoștințe vrei să-ți îmbunătățești azi?',
          isUser: false,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  const saveMessage = async (message: Message) => {
    if (!user || message.id === '0') return; // Don't save welcome message

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          id: message.id,
          content: message.content,
          isUser: message.isUser,
          timestamp: message.timestamp.toISOString(),
          userId: user.id
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const clearChat = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Delete all messages from database
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('userId', user.id);

      if (error) throw error;

      // Reset to welcome message
      const welcomeMessage: Message = {
        id: '0',
        content: 'Salut! Sunt asistentul tău AI pentru învățare. Ce cunoștințe vrei să-ți îmbunătățești azi?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    } finally {
      setLoading(false);
    }
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
    if (!input.trim() || loading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
      userId: user.id
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    await saveMessage(userMessage);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      // Prepare conversation context (last 15 messages for context)
      const recentMessages = messages.slice(-15);
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
            subjects: user.subjects,
            level: user.level,
            examType: user.examType,
            grade: user.grade
          }
        })
      });

      let data;
      
      // Check if response is ok before attempting to parse JSON
      if (response.ok) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Error parsing successful response JSON:', jsonError);
          throw new Error('Răspunsul serverului nu este valid');
        }
      } else {
        // Handle error responses - attempt to parse error JSON safely
        let errorMessage = 'A apărut o eroare la server';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // If error response is not valid JSON, use status text or generic message
          console.error('Error parsing error response JSON:', jsonError);
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        userId: user.id
      };

      setMessages(prev => [...prev, aiMessage]);
      
      await saveMessage(aiMessage);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou.',
        isUser: false,
        timestamp: new Date(),
        userId: user.id
      };
      
      setMessages(prev => [...prev, errorMessage]);
      await saveMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Asistentul tău AI</h3>
              <p className="text-white/80 text-sm">Întotdeauna disponibil pentru tine</p>
            </div>
          </div>
          
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-2" />
              <p className="text-sm text-white/90">Se încarcă conversația...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Enhanced glowing border animation container with better visibility */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-500 rounded-xl opacity-90 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt animate-pulse-glow">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {/* Enhanced moving light trail with bright colors */}
          <div className="absolute inset-0 rounded-xl">
            <div className="absolute w-full h-full">
              {/* Top edge - Bright Yellow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0 animate-border-light-top"></div>
              {/* Right edge - Bright Cyan */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-0 animate-border-light-right"></div>
              {/* Bottom edge - Bright Magenta */}
              <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-fuchsia-300 to-transparent opacity-0 animate-border-light-bottom"></div>
              {/* Left edge - Bright Green */}
              <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-transparent via-green-300 to-transparent opacity-0 animate-border-light-left"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Asistentul tău AI
                  <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
                </h3>
                <p className="text-white/80 text-sm">Întotdeauna disponibil pentru tine</p>
              </div>
            </div>
            
            <button
              onClick={clearChat}
              disabled={loading || messages.length <= 1}
              className="p-2 text-white/70 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              title="Șterge conversația"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          {/* Enhanced chat container */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 mb-4 h-[400px] overflow-y-auto space-y-4 border border-white/20 shadow-inner">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 backdrop-blur-sm ${
                    message.isUser
                      ? 'bg-white text-gray-800 shadow-lg border border-white/30'
                      : 'bg-white/20 text-white shadow-lg border border-white/20'
                  }`}
                >
                  <div className="text-sm">
                    {renderTextWithMath(message.content)}
                  </div>
                  <span className={`text-xs ${message.isUser ? 'text-gray-500' : 'text-white/70'} mt-1 block`}>
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
                <div className="bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-xl p-3 max-w-[80%] shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span className="text-sm text-white">AI-ul scrie...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced input form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-white/15 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Întreabă-mă orice despre lecțiile tale..."
                className="w-full pr-14 pl-4 py-3 bg-transparent text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-105"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>

          {/* AI capabilities indicator */}
          <div className="mt-3 flex items-center justify-center gap-2 text-white/60 text-xs">
            <Sparkles className="h-3 w-3" />
            <span>Pot rezolva probleme de matematică, explica concepte și răspunde la întrebări</span>
            <Sparkles className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAssistant;