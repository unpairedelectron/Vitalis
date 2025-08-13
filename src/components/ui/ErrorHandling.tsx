'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusAnimation } from './Animations';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorDisplayProps {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  type,
  title,
  message,
  action,
  onClose,
  className = ''
}) => {
  const typeStyles = {
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300',
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`border rounded-lg p-4 ${typeStyles[type]} ${className}`}
    >
      <div className="flex items-start space-x-3">
        <StatusAnimation type={type} size="md" />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-sm opacity-90">{message}</p>
          
          {action && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md text-sm font-medium hover:bg-white/30 transition-colors"
            >
              {action.label}
            </motion.button>
          )}
        </div>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// Toast notification system
export interface Toast {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ErrorDisplay
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onClose={() => onRemove(toast.id)}
              className="shadow-lg backdrop-blur-sm"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Error Boundary
export class EnhancedErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; retry: () => void }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service
    console.error('Enhanced Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.handleRetry} />;
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error: Error; retry: () => void }> = ({ error, retry }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-md w-full"
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <StatusAnimation type="error" size="lg" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We're sorry for the inconvenience. Our health monitoring system encountered an unexpected error.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-mono break-all">
            {error.message}
          </p>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={retry}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Try Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
          >
            Return Home
          </motion.button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">
          If this problem persists, please contact our support team.
        </p>
      </div>
    </motion.div>
  </div>
);

// Loading error states
export const LoadingError: React.FC<{
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({ 
  message = "Failed to load data", 
  onRetry,
  className = "" 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
  >
    <StatusAnimation type="error" size="lg" />
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-4 mb-2">
      {message}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 mb-6">
      Please check your connection and try again.
    </p>
    {onRetry && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Retry
      </motion.button>
    )}
  </motion.div>
);

// Form validation error component
export const FormError: React.FC<{
  message: string;
  field?: string;
}> = ({ message, field }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.2 }}
    className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm mt-1"
  >
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{message}</span>
  </motion.div>
);
