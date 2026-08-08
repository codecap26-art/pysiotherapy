'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Bot, Send, Edit2, Check, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

type Message = {
  id: string;
  role: 'bot' | 'user';
  content: string | React.ReactNode;
};

type StepId =
  | 'bodyPart'
  | 'painDuration'
  | 'painScale'
  | 'suddenStart'
  | 'surgery'
  | 'surgeryDetails'
  | 'previousPain'
  | 'accident'
  | 'painLocation'
  | 'radiatingPain'
  | 'aggravatingFactors'
  | 'relievingFactors'
  | 'movement'
  | 'swelling'
  | 'numbness'
  | 'fever'
  | 'age'
  | 'gender'
  | 'occupation'
  | 'additionalNotes'
  | 'completed';

interface PatientAnswers {
  bodyPart: string;
  painDuration: string;
  painScale: string;
  suddenStart: string;
  previousPain: string;
  surgery: string;
  accident: string;
  painLocation: string;
  radiatingPain: string;
  aggravatingFactors: string;
  relievingFactors: string;
  movement: string;
  swelling: string;
  numbness: string;
  fever: string;
  age: string;
  gender: string;
  occupation: string;
  additionalNotes: string;
}

const INITIAL_ANSWERS: PatientAnswers = {
  bodyPart: '',
  painDuration: '',
  painScale: '',
  suddenStart: '',
  previousPain: '',
  surgery: '',
  accident: '',
  painLocation: '',
  radiatingPain: '',
  aggravatingFactors: '',
  relievingFactors: '',
  movement: '',
  swelling: '',
  numbness: '',
  fever: '',
  age: '',
  gender: '',
  occupation: '',
  additionalNotes: ''
};

const FIELD_LABELS: Record<keyof PatientAnswers, string> = {
  bodyPart: 'Body Part',
  painDuration: 'Pain Duration',
  painScale: 'Pain Level (1-10)',
  suddenStart: 'Started Suddenly',
  surgery: 'Prior Surgeries',
  previousPain: 'Had Pain Before',
  accident: 'Caused by Accident/Injury',
  painLocation: 'Exact Location',
  radiatingPain: 'Radiates/Spreads',
  aggravatingFactors: 'Aggravating Factors',
  relievingFactors: 'Relieving Factors',
  movement: 'Movement Ability',
  swelling: 'Swelling',
  numbness: 'Numbness',
  fever: 'Fever',
  age: 'Age',
  gender: 'Gender',
  occupation: 'Occupation',
  additionalNotes: 'Additional Notes'
};

const STEPS_SEQUENCE: StepId[] = [
  'bodyPart',
  'painDuration',
  'painScale',
  'suddenStart',
  'surgery',
  'surgeryDetails',
  'previousPain',
  'accident',
  'painLocation',
  'radiatingPain',
  'aggravatingFactors',
  'relievingFactors',
  'movement',
  'swelling',
  'numbness',
  'fever',
  'age',
  'gender',
  'occupation',
  'additionalNotes'
];

const QUESTIONS_CONFIG: Record<StepId, {
  text: string;
  options?: string[];
  inputType: 'options' | 'text' | 'textarea';
  key: keyof PatientAnswers;
}> = {
  bodyPart: {
    text: "Where are you experiencing pain?",
    options: ["Neck", "Back", "Shoulders", "Knees"],
    inputType: 'options',
    key: 'bodyPart'
  },
  painDuration: {
    text: "How many days have you had this pain?",
    options: ["1-3 days", "1 week", "2 weeks", "1 month", "More than 1 month"],
    inputType: 'options',
    key: 'painDuration'
  },
  painScale: {
    text: "What is your pain level?",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    inputType: 'options',
    key: 'painScale'
  },
  suddenStart: {
    text: "Did the pain start suddenly?",
    options: ["Yes", "No", "Not sure"],
    inputType: 'options',
    key: 'suddenStart'
  },
  surgery: {
    text: "Have you had any surgery before?",
    options: ["Yes", "No"],
    inputType: 'options',
    key: 'surgery'
  },
  surgeryDetails: {
    text: "What surgery?",
    inputType: 'text',
    key: 'surgery'
  },
  previousPain: {
    text: "Have you had this pain before?",
    options: ["Yes", "No"],
    inputType: 'options',
    key: 'previousPain'
  },
  accident: {
    text: "Did any accident or injury cause it?",
    options: ["Yes", "No"],
    inputType: 'options',
    key: 'accident'
  },
  painLocation: {
    text: "Where exactly is the pain?",
    inputType: 'text',
    key: 'painLocation'
  },
  radiatingPain: {
    text: "Does the pain spread anywhere?",
    inputType: 'text',
    key: 'radiatingPain'
  },
  aggravatingFactors: {
    text: "What makes the pain worse?",
    inputType: 'text',
    key: 'aggravatingFactors'
  },
  relievingFactors: {
    text: "What makes the pain better?",
    inputType: 'text',
    key: 'relievingFactors'
  },
  movement: {
    text: "Can you move normally?",
    options: ["Yes", "No", "Little difficult"],
    inputType: 'options',
    key: 'movement'
  },
  swelling: {
    text: "Do you have swelling?",
    options: ["Yes", "No"],
    inputType: 'options',
    key: 'swelling'
  },
  numbness: {
    text: "Do you have numbness?",
    options: ["Yes", "No"],
    inputType: 'options',
    key: 'numbness'
  },
  fever: {
    text: "Do you have fever?",
    options: ["Yes", "No"],
    inputType: 'options',
    key: 'fever'
  },
  age: {
    text: "Age?",
    inputType: 'text',
    key: 'age'
  },
  gender: {
    text: "Gender?",
    options: ["Male", "Female", "Other"],
    inputType: 'options',
    key: 'gender'
  },
  occupation: {
    text: "Occupation?",
    inputType: 'text',
    key: 'occupation'
  },
  additionalNotes: {
    text: "Anything else you want to tell us?",
    inputType: 'textarea',
    key: 'additionalNotes'
  },
  completed: {
    text: "",
    inputType: 'text',
    key: 'additionalNotes'
  }
};

export function DiagnosticBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepId>('bodyPart');
  const [answers, setAnswers] = useState<PatientAnswers>(INITIAL_ANSWERS);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'bot', 
      content: "Hi there! 👋 I can help you understand your pain and point you in the right direction. Where are you experiencing pain?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [editingField, setEditingField] = useState<keyof PatientAnswers | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showReviewBtn, setShowReviewBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, showReviewScreen]);

  // Focus input automatically
  useEffect(() => {
    if (isOpen && !isTyping && currentStep !== 'completed' && !showReviewScreen) {
      const timer = setTimeout(() => {
        if (QUESTIONS_CONFIG[currentStep]?.inputType === 'textarea') {
          textareaRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isTyping, isOpen, showReviewScreen]);

  const handleBodyPartClick = async (bodyPart: string) => {
    // 1. Store answer
    const updatedAnswers = { ...answers, bodyPart };
    setAnswers(updatedAnswers);

    // 2. Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: bodyPart }]);
    setIsTyping(true);

    // 3. Show transition message and then the next question
    setTimeout(async () => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: "I'll ask a few questions before connecting you with a physiotherapist."
      }]);

      setCurrentStep('painDuration');
      
      const apiHistory = [
        { role: 'assistant', content: "Hi there! 👋 I can help you understand your pain and point you in the right direction. Where are you experiencing pain?" },
        { role: 'user', content: bodyPart },
        { role: 'assistant', content: "I'll ask a few questions before connecting you with a physiotherapist." }
      ];

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiHistory })
        });

        let nextQuestionText = '';
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.question) {
            nextQuestionText = data.question;
          }
        }

        if (!nextQuestionText) {
          nextQuestionText = QUESTIONS_CONFIG.painDuration.text;
        }

        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: nextQuestionText
        }]);

      } catch (err) {
        console.error("API Call error:", err);
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: QUESTIONS_CONFIG.painDuration.text
        }]);
      }
    }, 600);
  };

  const handleInputSubmit = async (userResponse: string) => {
    const trimmed = userResponse.trim();
    if (!trimmed) return;

    if (currentStep === 'bodyPart') {
      const formattedResponse = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
      const validOptions = ["Neck", "Back", "Shoulders", "Knees"];
      if (validOptions.includes(formattedResponse)) {
        handleBodyPartClick(formattedResponse);
      } else {
        // Fallback for bodyPart entered manually
        handleBodyPartClick(trimmed);
      }
      setInputValue('');
      return;
    }

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: trimmed }]);
    setInputValue('');

    // Save to answers
    const updatedAnswers = { ...answers };
    const currentConfig = QUESTIONS_CONFIG[currentStep];
    
    if (currentStep === 'surgeryDetails') {
      updatedAnswers.surgery = `Yes: ${trimmed}`;
    } else if (currentConfig) {
      updatedAnswers[currentConfig.key] = trimmed;
    }
    setAnswers(updatedAnswers);

    // Determine next step
    let nextStep: StepId = 'completed';
    if (currentStep === 'surgery') {
      if (trimmed.toLowerCase() === 'yes') {
        nextStep = 'surgeryDetails';
      } else {
        nextStep = 'previousPain';
      }
    } else if (currentStep === 'surgeryDetails') {
      nextStep = 'previousPain';
    } else {
      const currentIndex = STEPS_SEQUENCE.indexOf(currentStep);
      if (currentIndex !== -1 && currentIndex + 1 < STEPS_SEQUENCE.length) {
        nextStep = STEPS_SEQUENCE[currentIndex + 1];
      }
    }

    setCurrentStep(nextStep);

    setIsTyping(true);

    if (nextStep === 'completed') {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: "Thank you. Your information has been collected successfully. Our physiotherapist will review your responses before your appointment."
        }]);
        setShowReviewBtn(true);
      }, 800);
      return;
    }

    // Send history to API to query next question
    const apiHistory = [
      { role: 'assistant', content: "Hi there! 👋 I can help you understand your pain and point you in the right direction. Where are you experiencing pain?" },
      ...messages.map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: typeof m.content === 'string' ? m.content : ''
      })),
      { role: 'user', content: trimmed }
    ].filter(m => m.content !== '');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiHistory })
      });

      let nextQuestionText = '';
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.question) {
          nextQuestionText = data.question;
        }
      }

      if (!nextQuestionText) {
        nextQuestionText = QUESTIONS_CONFIG[nextStep].text;
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: nextQuestionText
      }]);

    } catch (err) {
      console.error("API Call error:", err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: QUESTIONS_CONFIG[nextStep].text
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInputSubmit(inputValue);
    }
  };

  const resetChat = () => {
    setCurrentStep('bodyPart');
    setAnswers(INITIAL_ANSWERS);
    setMessages([
      { 
        id: Date.now().toString(), 
        role: 'bot', 
        content: "Hi there! 👋 I can help you understand your pain and point you in the right direction. Where are you experiencing pain?" 
      }
    ]);
    setShowReviewBtn(false);
    setShowReviewScreen(false);
    setEditingField(null);
    setInputValue('');
  };

  const startEditing = (key: keyof PatientAnswers) => {
    setEditingField(key);
    setEditValue(answers[key]);
  };

  const saveEdit = () => {
    if (editingField) {
      setAnswers(prev => ({
        ...prev,
        [editingField]: editValue
      }));
      setEditingField(null);
    }
  };

  const renderEditControl = (key: keyof PatientAnswers) => {
    // Determine options if it is an options field
    let options = QUESTIONS_CONFIG[key]?.options;
    if (key === 'surgery') {
      options = ["Yes", "No"];
    }

    if (options) {
      // If editing surgery, custom value could have been typed. 
      // If it starts with 'Yes:', we check 'Yes' by default or display it.
      const isSurgeryDetails = key === 'surgery' && editValue.startsWith('Yes');
      const selectValue = isSurgeryDetails ? 'Yes' : (options.includes(editValue) ? editValue : options[0]);

      return (
        <div className="flex flex-col gap-2 w-full">
          <select
            value={selectValue}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'Yes' && key === 'surgery') {
                setEditValue('Yes: ');
              } else {
                setEditValue(val);
              }
            }}
            className="w-full p-2 border border-[#E8ECF4] rounded-xl text-sm focus:outline-none focus:border-[#1E6FFF] bg-white cursor-pointer font-medium"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {key === 'surgery' && editValue.startsWith('Yes') && (
            <input
              type="text"
              placeholder="What surgery?"
              value={editValue.replace(/^Yes:\s*/, '')}
              onChange={(e) => setEditValue(`Yes: ${e.target.value}`)}
              className="w-full h-10 px-3 border border-[#E8ECF4] rounded-xl text-sm focus:outline-none focus:border-[#1E6FFF]"
            />
          )}
        </div>
      );
    }

    if (key === 'additionalNotes') {
      return (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full min-h-[60px] p-2 border border-[#E8ECF4] rounded-xl text-sm focus:outline-none focus:border-[#1E6FFF] resize-none"
        />
      );
    }

    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full h-10 px-3 border border-[#E8ECF4] rounded-xl text-sm focus:outline-none focus:border-[#1E6FFF]"
      />
    );
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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1E6FFF] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1558D6] transition-colors focus:outline-none focus:ring-4 focus:ring-[#1E6FFF]/30 cursor-pointer"
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
                className="p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher: Chat or Review Screen */}
            {showReviewScreen ? (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFBFF]">
                {/* Review Subheader */}
                <div className="px-4 py-3 border-b border-[#E8ECF4] flex items-center justify-between bg-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowReviewScreen(false)} 
                      className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-[#4A5568] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm text-[#0D1421]">Review Your Responses</span>
                  </div>
                  <button 
                    onClick={resetChat} 
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                  >
                    Reset All
                  </button>
                </div>

                {/* Review Body */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                  {Object.entries(FIELD_LABELS).map(([fieldKey, label]) => {
                    const key = fieldKey as keyof PatientAnswers;
                    const isEditing = editingField === key;
                    const val = answers[key];

                    return (
                      <div key={key} className="p-3 bg-white border border-[#E8ECF4] rounded-xl shadow-sm flex flex-col gap-2 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-[#8896A8] uppercase tracking-wider">{label}</span>
                          {!isEditing && (
                            <button
                              onClick={() => startEditing(key)}
                              className="text-xs text-[#1E6FFF] hover:text-[#1558D6] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" /> Edit
                            </button>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="flex flex-col gap-2 mt-1">
                            {renderEditControl(key)}
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setEditingField(null)}
                                className="px-3 py-1.5 border border-[#E8ECF4] rounded-lg text-xs font-semibold text-[#4A5568] hover:bg-slate-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={saveEdit}
                                className="px-3 py-1.5 bg-[#1E6FFF] text-white rounded-lg text-xs font-semibold hover:bg-[#1558D6] flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3 h-3" /> Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-[#0D1421] whitespace-pre-wrap min-h-[1.25rem]">
                            {val ? val : <span className="text-slate-400 italic">Not specified</span>}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Review Footer */}
                <div className="p-4 bg-white border-t border-[#E8ECF4]">
                  <Button
                    onClick={() => setShowReviewScreen(false)}
                    className="w-full bg-[#1E6FFF] hover:bg-[#1558D6] text-white font-bold py-2.5 rounded-xl cursor-pointer"
                  >
                    Finish Review
                  </Button>
                </div>
              </div>
            ) : (
              <>
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

                {/* Options / Input Area (Always Fixed at bottom) */}
                <div className="p-4 bg-white border-t border-[#E8ECF4] flex flex-col gap-3">
                  {/* Quick-action choices chips */}
                  {currentStep !== 'completed' && !isTyping && QUESTIONS_CONFIG[currentStep]?.options && (
                    <div className="flex flex-wrap gap-2">
                      {QUESTIONS_CONFIG[currentStep].options?.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (currentStep === 'bodyPart') {
                              handleBodyPartClick(opt);
                            } else {
                              handleInputSubmit(opt);
                            }
                          }}
                          className="px-4 py-2 bg-[#EFF5FF] text-[#1E6FFF] border border-[#BFDBFE] rounded-xl text-sm font-semibold hover:bg-[#E0EDFF] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {opt} <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Message input text box with Send button */}
                  {currentStep !== 'completed' && (
                    <div className="flex items-center gap-2 mt-1">
                      {currentStep === 'additionalNotes' ? (
                        <textarea
                          ref={textareaRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your response..."
                          className="flex-1 min-h-[40px] max-h-[80px] p-2.5 border border-[#E8ECF4] rounded-xl text-sm focus:outline-none focus:border-[#1E6FFF] resize-none"
                          disabled={isTyping}
                        />
                      ) : (
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your response..."
                          className="flex-1 h-10 px-3.5 border border-[#E8ECF4] rounded-xl text-sm focus:outline-none focus:border-[#1E6FFF]"
                          disabled={isTyping}
                        />
                      )}
                      <Button
                        onClick={() => handleInputSubmit(inputValue)}
                        disabled={isTyping || !inputValue.trim()}
                        className="bg-[#1E6FFF] hover:bg-[#1558D6] text-white h-10 w-10 p-0 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Completion buttons */}
                  {currentStep === 'completed' && (
                    <div className="flex flex-col gap-2 w-full pt-1">
                      {showReviewBtn && (
                        <Button
                          onClick={() => setShowReviewScreen(true)}
                          className="w-full bg-[#10B981] hover:bg-[#0E9F6E] text-white font-bold py-2.5 rounded-xl cursor-pointer"
                        >
                          Review Answers
                        </Button>
                      )}
                      <button 
                        onClick={resetChat}
                        className="text-xs text-center text-[#8896A8] hover:text-[#4A5568] underline mt-1 cursor-pointer"
                      >
                        Restart Chat
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
