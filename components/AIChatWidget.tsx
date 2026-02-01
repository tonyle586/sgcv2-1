import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';

interface AIChatWidgetProps {
  lang: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyAvailable, setApiKeyAvailable] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const content = CONTENT[lang].aiWidget;

  // Initialize generic welcome message
  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([{
        role: 'model',
        text: lang === 'vi' 
          ? "Xin chào! Tôi là trợ lý AI của SGC. Tôi có thể giúp gì cho bạn về các dịch vụ công nghệ?" 
          : "Hello! I am SGC's AI Assistant. How can I help you with our tech services?"
      }]);
    }
  }, [isOpen, lang, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setApiKeyAvailable(false);
        setMessages(prev => [...prev, { role: 'model', text: "API Key not configured in environment." }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Context for SGC
      const systemContext = `You are a helpful AI assistant for SGC, a technology company.
      SGC provides: WordPress Dev, AI Solutions, Hosting/Domain, QR Code services, and Creative Forms.
      Answer briefly and professionally. Current Language: ${lang}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            { role: 'user', parts: [{ text: systemContext + "\nUser question: " + userMessage }] }
        ],
      });

      const text = response.text || (lang === 'vi' ? "Xin lỗi, tôi không thể trả lời lúc này." : "Sorry, I cannot answer right now.");

      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: lang === 'vi' ? "Đã xảy ra lỗi kết nối." : "Connection error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-brand-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} />
              <h3 className="font-semibold text-sm">{content.title}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-brand-700 p-1 rounded">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-dark-bg">
            {!apiKeyAvailable && (
               <div className="text-xs text-red-500 text-center p-2 border border-red-200 bg-red-50 rounded">
                 Environment variable API_KEY missing.
               </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg rounded-tl-none shadow-sm flex items-center space-x-2">
                  <Loader2 className="animate-spin text-brand-500" size={16} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={content.placeholder}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-600 text-white p-2 rounded-full hover:bg-brand-700 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-[10px] text-gray-400 text-center mt-2">
              {content.disclaimer}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
        >
          <MessageSquare size={24} />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat AI Support
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;