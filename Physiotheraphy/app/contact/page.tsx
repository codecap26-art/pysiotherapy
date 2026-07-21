'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = 'Email is invalid';
    if (!formState.subject) newErrors.subject = 'Please select a subject';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      setTimeout(() => setSubmitted(true), 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFBFF] pt-24 pb-24 text-[#0D1421]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Get in Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            We're here to help
          </h1>
          <p className="text-lg text-[#4A5568] max-w-prose mx-auto leading-relaxed">
            Reach out any way that's easiest. Our team is ready to answer your questions and guide your recovery.
          </p>
        </div>

        {/* Emergency Callout */}
        <div className="max-w-4xl mx-auto mb-16 bg-red-50 border border-red-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-800 text-lg mb-1">Medical Emergency?</h3>
            <p className="text-red-700/80 text-sm leading-relaxed">
              This contact form is not for medical emergencies. If you are experiencing a medical emergency, please call <span className="font-bold">[LOCAL_EMERGENCY_NUMBER]</span> or go to your nearest ER immediately.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Info Cards */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421] mb-1">Phone</h4>
                  <a href="tel:+15550123" className="text-[#4A5568] hover:text-[var(--color-primary)] transition-colors block">[PLACEHOLDER_PHONE]</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421] mb-1">Email</h4>
                  <a href="mailto:hello@healingmotion.com" className="text-[#4A5568] hover:text-[var(--color-primary)] transition-colors block">[PLACEHOLDER_EMAIL]</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421] mb-1">Address</h4>
                  <p className="text-[#4A5568] mb-2">[PLACEHOLDER_STREET]<br />[PLACEHOLDER_CITY], [ZIP]</p>
                  <a href="#" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">Get Directions →</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-[#0D1421] mb-2">Hours</h4>
                  <div className="text-sm text-[#4A5568] space-y-1">
                    <div className="flex justify-between"><span>Mon - Fri</span><span className="font-medium text-[#0D1421]">8:00 AM - 7:00 PM</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-[#0D1421]">9:00 AM - 2:00 PM</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-red-500">Closed</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#E8ECF4] rounded-3xl h-[300px] w-full flex items-center justify-center overflow-hidden border border-[var(--color-border-strong)] relative shadow-inner">
              <div className="text-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white">
                <MapPin className="w-8 h-8 text-[#8896A8] mx-auto mb-2" />
                <p className="font-bold text-[#4A5568] text-sm">[MAP_PLACEHOLDER]</p>
                <p className="text-xs text-[#8896A8] mt-1">Google Maps iframe goes here</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E8ECF4] shadow-lg relative overflow-hidden">
              {submitted ? (
                <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-[var(--color-accent-light)] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-3xl font-black text-[#0D1421] mb-4">Message Sent!</h3>
                  <p className="text-[#4A5568] mb-8 max-w-[40ch]">
                    Thank you for reaching out. A member of our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormState({name:'', email:'', phone:'', subject:'', message:''}); }}
                    className="px-6 py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0D1421] font-bold rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : null}

              <h2 className="text-2xl font-bold text-[#0D1421] mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#4A5568] mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-[#E8ECF4] bg-[#FAFBFF]'}`}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#4A5568] mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-[#E8ECF4] bg-[#FAFBFF]'}`}
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#4A5568] mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-[#4A5568] mb-2">Subject *</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formState.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all ${errors.subject ? 'border-red-500 bg-red-50' : 'border-[#E8ECF4] bg-[#FAFBFF]'}`}
                    >
                      <option value="">Select a reason</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Home Visit Question">Home Visit Question</option>
                      <option value="Insurance Question">Insurance Question</option>
                      <option value="Reschedule/Cancel">Reschedule/Cancel</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#4A5568] mb-2">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all resize-y ${errors.message ? 'border-red-500 bg-red-50' : 'border-[#E8ECF4] bg-[#FAFBFF]'}`}
                    placeholder="How can we help you today?"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[var(--color-primary)] hover:bg-primary-hover text-white font-bold rounded-xl transition-colors shadow-[0_8px_30px_rgba(30,111,255,0.3)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
