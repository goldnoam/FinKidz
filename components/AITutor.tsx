import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { askFinancialTutor } from '../services/geminiService';
import { ChatMessage } from '../types';

const SUGGESTED_QUESTIONS = [
  "למה צריך לחסוך כסף?",
  "איך בנק מרוויח כסף?",
  "מה זה ביטקוין?",
  "איך אני יכול להתחיל להשקיע בגיל 15?",
  "מה ההבדל בין כרטיס אשראי לדביט?"
];

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'היי! אני המורה הפיננסי החכם שלך. אפשר לשאול אותי כל שאלה על כסף, בנקים או השקעות. מה מעניין אותך לדעת?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askFinancialTutor(text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-4 text-white flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">המורה החכם</h2>
          <p className="text-xs text-violet-100">מופעל על ידי Gemini AI</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-violet-600'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
             <div className="flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">חושב על תשובה...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only show if few messages) */}
      {messages.length < 3 && !isLoading && (
        <div className="px-4 py-2 bg-gray-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full hover:bg-violet-50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="שאל כל דבר על כסף..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-gray-700"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-200 hover:shadow-violet-400"
          >
            <Send className={`w-5 h-5 ${document.dir === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;