// Medical Report Analysis Types
export interface MedicalReport {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'text';
  uploadDate: Date;
  patientInfo?: {
    name?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
  };
  reportType: MedicalReportType;
  extractedData: ExtractedMedicalData;
  aiAnalysis: MedicalAIAnalysis;
  processingStatus: 'pending' | 'processing' | 'completed' | 'error';
}

export type MedicalReportType = 
  | 'blood_test'
  | 'lipid_panel'
  | 'diabetes_panel'
  | 'thyroid_function'
  | 'liver_function'
  | 'kidney_function'
  | 'cardiac_markers'
  | 'vitamin_deficiency'
  | 'hormone_panel'
  | 'inflammation_markers'
  | 'imaging_report'
  | 'ecg_report'
  | 'general_checkup'
  | 'specialist_report'
  | 'other';

export interface ExtractedMedicalData {
  testResults: TestResult[];
  vitalSigns?: VitalSigns;
  medications?: Medication[];
  diagnoses?: string[];
  recommendations?: string[];
  labValues: LabValue[];
  reportDate?: Date;
  doctorName?: string;
  hospitalName?: string;
}

export interface TestResult {
  testName: string;
  value: number | string;
  unit?: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical' | 'borderline';
  category: string;
}

export interface LabValue {
  parameter: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  flagged: boolean;
}

export interface VitalSigns {
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    status: string;
  };
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  bmi?: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration?: string;
  indication?: string;
}

export interface MedicalAIAnalysis {
  overallAssessment: OverallAssessment;
  keyFindings: KeyFinding[];
  riskFactors: RiskFactor[];
  recommendations: AIRecommendation[];
  lifestyle: LifestyleRecommendations;
  followUp: FollowUpRecommendations;
  redFlags: RedFlag[];
  trends?: TrendAnalysis[];
  confidence: number; // 0-1 scale
  disclaimers: string[];
}

export interface OverallAssessment {
  healthScore: number; // 0-100
  status: 'excellent' | 'good' | 'fair' | 'concerning' | 'critical';
  summary: string;
  keyPoints: string[];
}

export interface KeyFinding {
  category: string;
  finding: string;
  significance: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  actionRequired: boolean;
}

export interface RiskFactor {
  factor: string;
  level: 'low' | 'moderate' | 'high' | 'very_high';
  description: string;
  mitigation: string[];
}

export interface AIRecommendation {
  category: 'immediate' | 'short_term' | 'long_term' | 'lifestyle' | 'medical';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  recommendation: string;
  rationale: string;
  timeline: string;
}

export interface LifestyleRecommendations {
  diet: DietRecommendation[];
  exercise: ExerciseRecommendation[];
  sleep: SleepRecommendation[];
  stress: StressRecommendation[];
  supplements?: SupplementRecommendation[];
}

export interface DietRecommendation {
  type: 'increase' | 'decrease' | 'avoid' | 'include';
  food: string;
  reason: string;
  targetAmount?: string;
}

export interface ExerciseRecommendation {
  type: 'cardio' | 'strength' | 'flexibility' | 'balance';
  activity: string;
  frequency: string;
  duration: string;
  intensity: string;
  benefit: string;
}

export interface SleepRecommendation {
  targetHours: number;
  sleepHygiene: string[];
  improvements: string[];
}

export interface StressRecommendation {
  technique: string;
  frequency: string;
  benefit: string;
}

export interface SupplementRecommendation {
  supplement: string;
  dosage: string;
  reason: string;
  duration: string;
  caution?: string;
}

export interface FollowUpRecommendations {
  urgentConsultation: boolean;
  specialistReferral?: string[];
  retestingSchedule: RetestRecommendation[];
  monitoringParams: string[];
}

export interface RetestRecommendation {
  test: string;
  timeframe: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

export interface RedFlag {
  finding: string;
  severity: 'warning' | 'urgent' | 'critical';
  action: string;
  timeframe: string;
}

export interface TrendAnalysis {
  parameter: string;
  trend: 'improving' | 'stable' | 'declining' | 'fluctuating';
  changePercent?: number;
  significance: string;
}

// Medical Data Processing Settings
export interface ProcessingSettings {
  enableOCR: boolean;
  enableAIAnalysis: boolean;
  anonymizeData: boolean;
  retainOriginal: boolean;
  shareWithPhysician: boolean;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  notifyOnCritical: boolean;
}
