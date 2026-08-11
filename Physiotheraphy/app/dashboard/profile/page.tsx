'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { 
  User, Mail, Phone, Calendar, Heart, Shield, CheckCircle2, Save, Stethoscope 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileSettingsPage() {
  const { user, updateProfile } = useAuthStore();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [age, setAge] = useState(user?.age || 30);
  const [gender, setGender] = useState(user?.gender || 'male');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');
  const [medicalConditions, setMedicalConditions] = useState(user?.medicalConditions || '');
  const [allergies, setAllergies] = useState(user?.allergies || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      phone,
      age: Number(age),
      gender: gender as any,
      emergencyContact,
      medicalConditions,
      allergies,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0D1421] tracking-tight">
          Profile & Account Settings
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Update your personal details, emergency contact information, and medical background.
        </p>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0D1421] flex items-center gap-2">
            <User className="w-5 h-5 text-[#1E6FFF]" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] bg-[#F8FAFC] text-sm text-[#8896A8] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                Age
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>
        </div>

        {/* Medical & Emergency Info */}
        <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0D1421] flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            Emergency Contact & Health History
          </h2>

          <div>
            <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
              Emergency Contact Name & Phone
            </label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="e.g. Priya Sharma — +91 98765 43211"
              className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                Medical Conditions / Past Surgeries
              </label>
              <textarea
                rows={3}
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
                placeholder="e.g. L4-L5 disc herniation, ACL reconstruction (2023)"
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                Allergies & Contraindications
              </label>
              <textarea
                rows={3}
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g. Latex sensitivity, Penicillin allergy"
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Doctor Specific Info if role === therapist */}
        {(user?.role === 'therapist' || user?.role === 'doctor') && (
          <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#0D1421] flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#1E6FFF]" />
              Doctor Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8FAFC]">
                <span className="text-[#8896A8] uppercase font-bold">License Number</span>
                <p className="text-sm font-bold text-[#0D1421] mt-1">{user.licenseNumber || 'KA-PT-2018-9482'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC]">
                <span className="text-[#8896A8] uppercase font-bold">Specialty</span>
                <p className="text-sm font-bold text-[#0D1421] mt-1">{user.specialization || 'Chief of Physiotherapy'}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="py-4 px-8 rounded-2xl bg-[#1E6FFF] text-white font-bold text-sm shadow-[0_4px_16px_rgba(30,111,255,0.3)] hover:bg-[#1558D6] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </form>
    </div>
  );
}
