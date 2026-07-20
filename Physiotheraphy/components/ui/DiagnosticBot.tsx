'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Bot } from 'lucide-react';
import { Button } from './Button';

type Message = {
  id: string;
  role: 'bot' | 'user';
  content: string | React.ReactNode;
};

const QUESTIONS = [
  {
    text: "Hi there! 👋 I can help you understand your pain and point you in the right direction. Where are you experiencing pain?",
    options: ["Neck", "Back", "Shoulders", "Knees", "Other"]
  },
  {
    text: "Got it. How long have you been experiencing this pain?",
    options: ["Less than a week", "1 to 4 weeks", "Over a month"]
  },
  {
    text: "And how would you rate the pain on a scale of 1-10?",
    options: ["Mild (1-3)", "Moderate (4-7)", "Severe (8-10)"]
  }
];

export function DiagnosticBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: QUESTIONS[0].text }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: option }]);
    
    // Simulate typing delay
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const nextStep = step + 1;
      setStep(nextStep);
      
      if (nextStep < QUESTIONS.length) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: QUESTIONS[nextStep].text }]);
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'bot', 
          content: (
            <div className="flex flex-col gap-3">
              <p>Thank you for sharing. Based on your symptoms, we highly recommend scheduling an initial assessment with one of our specialists to get a personalized treatment plan.</p>
              <Button size="sm" className="w-full mt-2 bg-[#1E6FFF] text-white" onClick={() => window.location.href = '#'}>
                Book Consultation
              </Button>
              <button onClick={resetChat} className="text-xs text-center text-[#8896A8] hover:text-[#4A5568] underline mt-1">
                Restart Chat
              </button>
            </div>
          )
        }]);
      }
    }, 800);
  };

  const resetChat = () => {
    setStep(0);
    setMessages([{ id: Date.now().toString(), role: 'bot', content: QUESTIONS[0].text }]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1E6FFF] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1558D6] transition-colors focus:outline-none focus:ring-4 focus:ring-[#1E6FFF]/30"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#E8ECF4] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#1E6FFF] p-4 flex items-center justify-between text-white shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Diagnostic Bot</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#FAFBFF] flex flex-col gap-4">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#1E6FFF] text-white rounded-br-sm' 
                      : 'bg-white border border-[#E8ECF4] text-[#0D1421] shadow-sm rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[#E8ECF4] rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center justify-center">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-[#CBD5E1] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-[#CBD5E1] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-[#CBD5E1] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Options / Input Area */}
            <div className="p-4 bg-white border-t border-[#E8ECF4]">
              {step < QUESTIONS.length && !isTyping ? (
                <div className="flex flex-wrap gap-2">
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="px-4 py-2 bg-[#EFF5FF] text-[#1E6FFF] border border-[#BFDBFE] rounded-xl text-sm font-semibold hover:bg-[#E0EDFF] transition-colors flex items-center gap-1"
                    >
                      {opt} <ChevronRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-xs text-[#8896A8] py-2">
                  {isTyping ? "Diagnostic Bot is typing..." : "Chat completed."}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
