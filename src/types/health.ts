// Health Data Types for Vitalis Platform
export interface HealthMetric {
  id: string;
  timestamp: Date;
  value: number;
  unit: string;
  confidence: number; // 0-1 scale
  source: HealthDataSource;
  anomaly?: boolean;
}

export interface HeartRateData extends HealthMetric {
  type: 'resting' | 'active' | 'maximum' | 'hrv';
  zone?: 'fat_burn' | 'cardio' | 'peak' | 'anaerobic';
}

export interface SleepData {
  id: string;
  date: Date;
  totalSleep: number; // minutes
  deepSleep: number;
  remSleep: number;
  lightSleep: number;
  awakeTime: number;
  sleepScore: number; // 0-100
  efficiency: number; // percentage
  source: HealthDataSource;
}

export interface ActivityData {
  id: string;
  timestamp: Date;
  type: ActivityType;
  duration: number; // minutes
  calories: number;
  steps?: number;
  distance?: number; // meters
  avgHeartRate?: number;
  maxHeartRate?: number;
  source: HealthDataSource;
}

export interface BiometricData {
  id: string;
  timestamp: Date;
  weight?: number; // kg
  bodyFat?: number; // percentage
  muscleMass?: number; // kg
  bodyWater?: number; // percentage
  boneDensity?: number;
  visceralFat?: number;
  source: HealthDataSource;
}

export interface BloodOxygenData extends HealthMetric {
  type: 'spot_check' | 'continuous';
  context: 'rest' | 'exercise' | 'sleep';
}

export interface StressData extends HealthMetric {
  type: 'hrv_based' | 'survey_based' | 'cortisol';
  level: 'low' | 'normal' | 'elevated' | 'high';
}

export type HealthDataSource = 
  | 'samsung_health'
  | 'apple_health'
  | 'google_fit'
  | 'fitbit'
  | 'oura'
  | 'xiaomi_health'
  | 'fire_boltt' // Indian smartwatch
  | 'garmin'
  | 'whoop'
  | 'amazfit'
  | 'huawei_health'
  | 'manual_entry'
  | 'vitalis_ai';

export type ActivityType = 
  | 'walking'
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'strength_training'
  | 'yoga'
  | 'meditation'
  | 'sport'
  | 'other';

export interface HealthInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'trend' | 'anomaly';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendations: string[];
  confidence: number;
  evidence: HealthMetric[];
  createdAt: Date;
  validUntil?: Date;
}

export interface UserProfile {
  id: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  healthGoals: HealthGoal[];
  medicalConditions?: string[];
  medications?: string[];
  allergies?: string[];
  emergencyContact?: EmergencyContact;
}

export interface HealthGoal {
  id: string;
  type: 'weight_loss' | 'muscle_gain' | 'endurance' | 'sleep_quality' | 'stress_reduction' | 'general_wellness';
  target: number;
  unit: string;
  deadline?: Date;
  progress: number; // 0-100 percentage
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

// Military-grade alert types
export interface HealthAlert {
  id: string;
  type: 'medical_emergency' | 'anomaly_detected' | 'goal_milestone' | 'routine_reminder';
  severity: 'info' | 'warning' | 'danger' | 'critical';
  message: string;
  actionRequired: boolean;
  autoResolve: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  metadata?: Record<string, any>;
}

// AI Analysis types
export interface AIAnalysisRequest {
  userId: string;
  dataTypes: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
  analysisType: 'comprehensive' | 'focused' | 'emergency';
}

export interface AIAnalysisResponse {
  insights: HealthInsight[];
  alerts: HealthAlert[];
  recommendations: string[];
  healthScore: number; // 0-100
  trends: TrendAnalysis[];
  confidence: number;
  generatedAt: Date;
}

export interface TrendAnalysis {
  metric: string;
  direction: 'improving' | 'declining' | 'stable';
  rate: number; // rate of change
  significance: 'low' | 'medium' | 'high';
  timeframe: string;
}
