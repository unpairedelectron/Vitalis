'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationModeProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isActive,
  onToggle
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);

  const presentationSlides = [
    {
      title: "AI Health Guardian",
      subtitle: "Military-grade health intelligence platform",
      highlight: "Real-time monitoring with 2-week prediction capability",
      duration: 5000
    },
    {
      title: "Universal Device Integration",
      subtitle: "Samsung, Apple, Fitbit, Oura in one dashboard",
      highlight: "50+ device compatibility with clinical-grade accuracy",
      duration: 4000
    },
    {
      title: "Advanced AI Insights",
      subtitle: "Trained on 1.3M+ medical records",
      highlight: "Predictive analytics with 91% accuracy",
      duration: 4000
    },
    {
      title: "Enterprise Ready",
      subtitle: "HIPAA/GDPR compliant with end-to-end encryption",
      highlight: "Scalable architecture for millions of users",
      duration: 3000
    }
  ];

  // Auto-advance slides in presentation mode
  useEffect(() => {
    if (!isActive || !autoAdvance) return;

    const timer = setTimeout(() => {
      setCurrentSlide(prev => 
        prev >= presentationSlides.length - 1 ? 0 : prev + 1
      );
    }, presentationSlides[currentSlide]?.duration || 4000);

    return () => clearTimeout(timer);
  }, [currentSlide, autoAdvance, isActive]);

  // Keyboard controls for presentation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          setCurrentSlide(prev => 
            prev >= presentationSlides.length - 1 ? 0 : prev + 1
          );
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentSlide(prev => 
            prev <= 0 ? presentationSlides.length - 1 : prev - 1
          );
          break;
        case 'Escape':
          onToggle(false);
          break;
        case 'a':
        case 'A':
          setAutoAdvance(!autoAdvance);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, autoAdvance, onToggle]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 z-50 flex items-center justify-center"
    >
      {/* Presentation Content */}
      <div className="max-w-4xl mx-auto text-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-8"
          >
            <motion.h1
              className="text-5xl font-bold text-white mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {presentationSlides[currentSlide]?.title}
            </motion.h1>

            <motion.h2
              className="text-2xl text-blue-200 mb-8"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {presentationSlides[currentSlide]?.subtitle}
            </motion.h2>

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xl text-white">
                {presentationSlides[currentSlide]?.highlight}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {presentationSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Auto-advance indicator */}
        {autoAdvance && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ 
                  duration: (presentationSlides[currentSlide]?.duration || 4000) / 1000,
                  ease: "linear" 
                }}
                key={currentSlide}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-8 text-white/70 text-sm space-y-1">
        <div>← → Navigate</div>
        <div>Space: Next</div>
        <div>A: Auto-advance ({autoAdvance ? 'ON' : 'OFF'})</div>
        <div>Esc: Exit</div>
      </div>

      {/* Exit Button */}
      <motion.button
        onClick={() => onToggle(false)}
        className="absolute top-8 right-8 text-white/70 hover:text-white text-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </motion.button>
    </motion.div>
  );
};

// Quick presentation launcher
export const PresentationLauncher: React.FC = () => {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  // Check for presentation URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('presentation') === 'true') {
      setIsPresentationMode(true);
    }
  }, []);

  return (
    <>
      {/* Presentation trigger button */}
      <motion.button
        onClick={() => setIsPresentationMode(true)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🎯 Start Presentation
      </motion.button>

      {/* Presentation Mode */}
      <AnimatePresence>
        {isPresentationMode && (
          <PresentationMode
            isActive={isPresentationMode}
            onToggle={setIsPresentationMode}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PresentationMode;
