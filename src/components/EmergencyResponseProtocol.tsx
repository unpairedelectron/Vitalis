// Emergency Response Protocol System - Military-Grade Health Monitoring
'use client';

import React, { useState, useEffect } from 'react';
import {
  ExclamationTriangleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  ShieldExclamationIcon,
  SpeakerWaveIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export interface EmergencyEvent {
  id: string;
  type: 'cardiac' | 'respiratory' | 'neurological' | 'metabolic' | 'injury';
  severity: 'warning' | 'critical' | 'emergency';
  title: string;
  description: string;
  detectedAt: Date;
  vitalSigns: {
    heartRate?: number;
    bloodPressure?: string;
    oxygenSaturation?: number;
    temperature?: number;
    respiratoryRate?: number;
  };
  location?: string;
  emergencyContacts: EmergencyContact[];
  medicalHistory: string[];
  medications: string[];
  allergies: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  isPrimary: boolean;
  notificationMethods: ('sms' | 'call' | 'email')[];
}

export interface EmergencyProtocolStep {
  id: string;
  stepNumber: number;
  action: string;
  timeLimit: number; // seconds
  isCompleted: boolean;
  completedAt?: Date;
  isOptional: boolean;
}

interface EmergencyResponseProps {
  emergencyEvent: EmergencyEvent | null;
  isActive: boolean;
  onDismiss: () => void;
  onAcknowledge: () => void;
}

export function EmergencyResponseProtocol({
  emergencyEvent,
  isActive,
  onDismiss,
  onAcknowledge
}: EmergencyResponseProps) {
  const [protocolSteps, setProtocolSteps] = useState<EmergencyProtocolStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [contactsNotified, setContactsNotified] = useState<string[]>([]);

  // Initialize emergency protocol steps based on event type
  useEffect(() => {
    if (emergencyEvent && isActive) {
      const steps = generateProtocolSteps(emergencyEvent.type, emergencyEvent.severity);
      setProtocolSteps(steps);
      setTimeElapsed(0);
      setIsAcknowledged(false);
      setContactsNotified([]);
    }
  }, [emergencyEvent, isActive]);

  // Timer for tracking response time
  useEffect(() => {
    if (isActive && !isAcknowledged) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, isAcknowledged]);

  const generateProtocolSteps = (
    type: EmergencyEvent['type'],
    severity: EmergencyEvent['severity']
  ): EmergencyProtocolStep[] => {
    const baseSteps: EmergencyProtocolStep[] = [
      {
        id: 'acknowledge',
        stepNumber: 1,
        action: 'Acknowledge emergency alert and confirm consciousness',
        timeLimit: 30,
        isCompleted: false,
        isOptional: false
      }
    ];

    switch (type) {
      case 'cardiac':
        return [
          ...baseSteps,
          {
            id: 'call_911',
            stepNumber: 2,
            action: 'Call 911 immediately',
            timeLimit: 60,
            isCompleted: false,
            isOptional: false
          },
          {
            id: 'take_aspirin',
            stepNumber: 3,
            action: 'Take aspirin (if not allergic and conscious)',
            timeLimit: 120,
            isCompleted: false,
            isOptional: true
          },
          {
            id: 'position',
            stepNumber: 4,
            action: 'Sit upright, loosen tight clothing',
            timeLimit: 60,
            isCompleted: false,
            isOptional: false
          },
          {
            id: 'notify_contacts',
            stepNumber: 5,
            action: 'Auto-notify emergency contacts',
            timeLimit: 180,
            isCompleted: false,
            isOptional: false
          },
          {
            id: 'vital_monitoring',
            stepNumber: 6,
            action: 'Continue vital sign monitoring',
            timeLimit: 0,
            isCompleted: false,
            isOptional: false
          }
        ];

      case 'respiratory':
        return [
          ...baseSteps,
          {
            id: 'check_airways',
            stepNumber: 2,
            action: 'Check airways are clear',
            timeLimit: 30,
            isCompleted: false,
            isOptional: false
          },
          {
            id: 'position_breathing',
            stepNumber: 3,
            action: 'Sit upright, lean slightly forward',
            timeLimit: 60,
            isCompleted: false,
            isOptional: false
          },
          {
            id: 'inhaler',
            stepNumber: 4,
            action: 'Use rescue inhaler if available',
            timeLimit: 120,
            isCompleted: false,
            isOptional: true
          },
          {
            id: 'call_emergency',
            stepNumber: 5,
            action: 'Call 911 if no improvement',
            timeLimit: 300,
            isCompleted: false,
            isOptional: false
          }
        ];

      default:
        return [
          ...baseSteps,
          {
            id: 'assess_situation',
            stepNumber: 2,
            action: 'Assess current situation and symptoms',
            timeLimit: 60,
            isCompleted: false,
            isOptional: false
          },
          {
            id: 'seek_help',
            stepNumber: 3,
            action: 'Seek appropriate medical attention',
            timeLimit: 300,
            isCompleted: false,
            isOptional: false
          }
        ];
    }
  };

  const handleStepComplete = (stepId: string) => {
    setProtocolSteps(steps =>
      steps.map(step =>
        step.id === stepId
          ? { ...step, isCompleted: true, completedAt: new Date() }
          : step
      )
    );

    if (stepId === 'acknowledge') {
      setIsAcknowledged(true);
      onAcknowledge();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSeverityColor = (severity: EmergencyEvent['severity']) => {
    switch (severity) {
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'emergency': return 'border-red-600 bg-red-600/20 animate-pulse';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  if (!isActive || !emergencyEvent) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className={`bg-gray-900 border-2 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${getSeverityColor(emergencyEvent.severity)}`}>
        
        {/* Emergency Header */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 border-b border-red-500/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShieldExclamationIcon className="h-12 w-12 text-red-400" />
                {emergencyEvent.severity === 'emergency' && (
                  <div className="absolute inset-0 border-2 border-red-400 rounded-full animate-ping"></div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <span>EMERGENCY PROTOCOL ACTIVATED</span>
                  <SpeakerWaveIcon className="h-6 w-6 text-red-400 animate-bounce" />
                </h1>
                <p className="text-red-200 text-lg mt-1">{emergencyEvent.title}</p>
                <p className="text-red-300 text-sm">{emergencyEvent.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-mono text-2xl font-bold">
                {formatTime(timeElapsed)}
              </div>
              <div className="text-red-200 text-sm">Response Time</div>
              <div className="text-red-300 text-xs mt-1">
                Detected: {emergencyEvent.detectedAt.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Protocol Steps */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <DocumentTextIcon className="h-5 w-5 text-red-400" />
                  <span>Emergency Response Protocol</span>
                </h2>
                
                <div className="space-y-3">
                  {protocolSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`border rounded-lg p-4 transition-all ${
                        step.isCompleted
                          ? 'border-green-500/50 bg-green-500/10'
                          : index === currentStep
                          ? 'border-yellow-500/50 bg-yellow-500/10'
                          : 'border-gray-500/30 bg-gray-500/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              step.isCompleted
                                ? 'bg-green-500 text-white'
                                : index === currentStep
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-600 text-gray-300'
                            }`}
                          >
                            {step.isCompleted ? '✓' : step.stepNumber}
                          </div>
                          <div>
                            <div className="text-white font-medium">{step.action}</div>
                            {step.timeLimit > 0 && (
                              <div className="text-gray-400 text-sm">
                                Time limit: {formatTime(step.timeLimit)}
                                {step.isOptional && ' (Optional)'}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {!step.isCompleted && (
                          <button
                            onClick={() => handleStepComplete(step.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Info Panel */}
            <div className="space-y-4">
              
              {/* Current Vital Signs */}
              <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <HeartIcon className="h-4 w-4 text-red-400" />
                  <span>Current Vitals</span>
                </h3>
                <div className="space-y-2 text-sm">
                  {emergencyEvent.vitalSigns.heartRate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Heart Rate</span>
                      <span className="text-red-400 font-bold">{emergencyEvent.vitalSigns.heartRate} BPM</span>
                    </div>
                  )}
                  {emergencyEvent.vitalSigns.bloodPressure && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Blood Pressure</span>
                      <span className="text-red-400 font-bold">{emergencyEvent.vitalSigns.bloodPressure}</span>
                    </div>
                  )}
                  {emergencyEvent.vitalSigns.oxygenSaturation && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">SpO₂</span>
                      <span className="text-red-400 font-bold">{emergencyEvent.vitalSigns.oxygenSaturation}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-black/40 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-blue-400" />
                  <span>Emergency Contacts</span>
                </h3>
                <div className="space-y-2">
                  {emergencyEvent.emergencyContacts.slice(0, 3).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-white font-medium">{contact.name}</div>
                        <div className="text-gray-400">{contact.relationship}</div>
                      </div>
                      <div className="text-blue-400">{contact.phoneNumber}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <UserIcon className="h-4 w-4 text-purple-400" />
                  <span>Medical Info</span>
                </h3>
                <div className="space-y-2 text-xs">
                  {emergencyEvent.allergies.length > 0 && (
                    <div>
                      <div className="text-red-400 font-medium">Allergies:</div>
                      <div className="text-gray-300">{emergencyEvent.allergies.join(', ')}</div>
                    </div>
                  )}
                  {emergencyEvent.medications.length > 0 && (
                    <div>
                      <div className="text-yellow-400 font-medium">Medications:</div>
                      <div className="text-gray-300">{emergencyEvent.medications.join(', ')}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              {emergencyEvent.location && (
                <div className="bg-black/40 border border-green-500/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-green-400" />
                    <span>Location</span>
                  </h3>
                  <p className="text-green-400 text-sm">{emergencyEvent.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-600">
            <button
              onClick={() => window.open('tel:911', '_self')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg flex items-center space-x-2 transition-colors"
            >
              <PhoneIcon className="h-5 w-5" />
              <span>CALL 911</span>
            </button>
            
            {isAcknowledged && (
              <button
                onClick={onDismiss}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Close Protocol
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Emergency Event Generator for testing/demo
export const generateSampleEmergencyEvent = (): EmergencyEvent => ({
  id: `emergency_${Date.now()}`,
  type: 'cardiac',
  severity: 'critical',
  title: 'Cardiac Anomaly Detected',
  description: 'Irregular heart rhythm pattern detected with elevated heart rate',
  detectedAt: new Date(),
  vitalSigns: {
    heartRate: 145,
    bloodPressure: '160/95',
    oxygenSaturation: 94,
    temperature: 99.2
  },
  location: '123 Main St, San Francisco, CA 94102',
  emergencyContacts: [
    {
      id: 'contact_1',
      name: 'Jane Doe',
      relationship: 'Spouse',
      phoneNumber: '+1 (555) 123-4567',
      isPrimary: true,
      notificationMethods: ['call', 'sms']
    },
    {
      id: 'contact_2',
      name: 'Dr. Smith',
      relationship: 'Physician',
      phoneNumber: '+1 (555) 987-6543',
      isPrimary: false,
      notificationMethods: ['call']
    }
  ],
  medicalHistory: ['Hypertension', 'Previous MI (2019)'],
  medications: ['Lisinopril 10mg', 'Aspirin 81mg'],
  allergies: ['Penicillin', 'Shellfish']
});
