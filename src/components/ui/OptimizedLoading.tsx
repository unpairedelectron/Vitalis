import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedLoadingProps {
  isLoading: boolean;
  loadingText?: string;
  showProgress?: boolean;
  duration?: number;
}

export const OptimizedLoading: React.FC<OptimizedLoadingProps> = ({
  isLoading,
  loadingText = "Loading your health insights",
  showProgress = true,
  duration = 2000
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Connecting to health devices...",
    "Analyzing health data...",
    "Generating AI insights...",
    "Optimizing recommendations...",
    "Ready!"
  ];

  useEffect(() => {
    if (!isLoading) return;

    const stepDuration = duration / loadingSteps.length;
    const progressInterval = 50;
    const progressStep = 100 / (duration / progressInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressStep;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        const newStep = prev + 1;
        return newStep >= loadingSteps.length ? loadingSteps.length - 1 : newStep;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [isLoading, duration]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setCurrentStep(0);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8 max-w-md mx-auto p-8"
          >
            {/* Vitalis Logo/Icon */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-20 h-20 mx-auto"
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">V</span>
              </div>
            </motion.div>

            {/* Loading Text */}
            <div className="space-y-4">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl font-bold text-gray-800 dark:text-white"
              >
                {loadingText}
              </motion.h2>

              <motion.p
                key={currentStep}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-gray-600 dark:text-gray-300"
              >
                {loadingSteps[currentStep]}
              </motion.p>
            </div>

            {/* Progress Bar */}
            {showProgress && (
              <div className="w-full">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(progress)}%
                </div>
              </div>
            )}

            {/* Health Icons Animation */}
            <div className="flex justify-center space-x-4 mt-8">
              {['❤️', '🧠', '💪', '😴'].map((icon, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="text-2xl"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Quick demo loading for instant showcasing
export const DemoQuickLoad: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Allow exit animation
    }, 1200); // Quick demo load

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <OptimizedLoading
      isLoading={isVisible}
      loadingText="Vitalis AI Health Guardian"
      showProgress={true}
      duration={1000}
    />
  );
};

export default OptimizedLoading;
