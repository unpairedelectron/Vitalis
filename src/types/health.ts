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

// Enhanced Clinical Health Types for Advanced Features
export interface WHOGuidelineCompliance {
  physicalActivity: {
    weeklyMinutes: number;
    meetsModeratePAGuideline: boolean; // 150+ min/week
    meetsVigorousPAGuideline: boolean; // 75+ min/week
    muscleStrengtheningDays: number; // Should be 2+ days/week
    compliance: 'excellent' | 'good' | 'moderate' | 'needs_improvement';
    recommendations: string[];
  };
  cardiovascularHealth: {
    restingHeartRate: number;
    bloodPressureCategory: 'normal' | 'elevated' | 'stage1' | 'stage2' | 'crisis';
    framinghamRiskScore: number;
    recommendations: string[];
  };
  sleepGuidelines: {
    averageSleepHours: number;
    meetsAdultGuideline: boolean; // 7-9 hours for adults
    sleepQualityScore: number;
    recommendations: string[];
  };
}

export interface FDAAlgorithmData {
  algorithmName: string;
  fdaClearanceNumber: string;
  validationStudy: string;
  accuracyMetrics: {
    sensitivity: number;
    specificity: number;
    ppv: number; // Positive Predictive Value
    npv: number; // Negative Predictive Value
  };
  clinicalValidation: boolean;
}

export interface HIPAACompliantRecord {
  recordId: string;
  patientId: string; // Encrypted/Hashed
  timestamp: Date;
  dataType: string;
  encryptedData: string;
  accessLog: AccessLogEntry[];
  retentionPolicy: {
    keepUntil: Date;
    autoDelete: boolean;
  };
  consentStatus: ConsentStatus;
}

export interface AccessLogEntry {
  userId: string;
  timestamp: Date;
  action: 'read' | 'write' | 'delete' | 'export';
  ipAddress: string;
  userAgent: string;
}

export interface ConsentStatus {
  dataCollection: boolean;
  dataProcessing: boolean;
  dataSharing: boolean;
  researchParticipation: boolean;
  marketingCommunications: boolean;
  lastUpdated: Date;
}

export interface ClinicalAlert extends HealthAlert {
  clinicalSeverity: 'routine' | 'urgent' | 'emergent' | 'critical';
  icd10Code?: string;
  protocolRequired: boolean;
  physicianNotification: boolean;
  triageLevel: 'self_care' | 'primary_care' | 'specialist' | 'emergency';
  evidenceLevel: 'A' | 'B' | 'C' | 'expert_opinion';
  followUpRequired: boolean;
  followUpTimeframe?: string;
}

export interface PhysicianReport {
  reportId: string;
  patientId: string;
  generatedAt: Date;
  reportType: 'comprehensive' | 'focused' | 'emergency' | 'periodic';
  clinicalSummary: {
    chiefConcerns: string[];
    keyFindings: ClinicalFinding[];
    recommendations: ClinicalRecommendation[];
    riskAssessment: RiskAssessment;
  };
  dataQuality: {
    completeness: number; // 0-100%
    reliability: number; // 0-100%
    timespan: string;
    sources: HealthDataSource[];
  };
  attachments: {
    charts: string[];
    rawData: string[];
    comparativeAnalysis: string[];
  };
}

export interface ClinicalFinding {
  finding: string;
  severity: 'normal' | 'borderline' | 'abnormal' | 'critical';
  confidence: number;
  supportingData: HealthMetric[];
  clinicalSignificance: string;
  trend: 'improving' | 'stable' | 'worsening';
}

export interface ClinicalRecommendation {
  category: 'lifestyle' | 'monitoring' | 'medical_consultation' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  recommendation: string;
  rationale: string;
  timeframe: string;
  followUp: boolean;
}

export interface RiskAssessment {
  cardiovascularRisk: CardiovascularRisk;
  metabolicRisk: MetabolicRisk;
  mentalHealthRisk: MentalHealthRisk;
  overallRiskScore: number; // 0-100
}

// VO2 Max and Performance Analytics
export interface VO2MaxData {
  estimatedVO2Max: number;
  estimationMethod: 'sub_maximal_test' | 'heart_rate_reserve' | 'cooper_test' | 'ml_prediction';
  accuracyMetrics: {
    standardError: number;
    confidenceInterval: [number, number];
    reliability: number; // 0-1
  };
  agePercentile: number;
  genderPercentile: number;
  athleteComparison: 'recreational' | 'trained' | 'well_trained' | 'national' | 'international';
  lastUpdated: Date;
}

export interface TrainingZones {
  zone1_recovery: { minHR: number; maxHR: number; description: string };
  zone2_aerobic: { minHR: number; maxHR: number; description: string };
  zone3_tempo: { minHR: number; maxHR: number; description: string };
  zone4_lactate: { minHR: number; maxHR: number; description: string };
  zone5_neuromuscular: { minHR: number; maxHR: number; description: string };
  basedOn: 'hrMax' | 'lactateThreshold' | 'vo2Max' | 'fieldTest';
  updatedAt: Date;
}

export interface PowerOutputAnalysis {
  functionalThresholdPower: number; // FTP in watts
  peakPowerOutput: number;
  sustainedPowerOutput: number;
  powerToWeightRatio: number;
  lactateThreshold: {
    power: number;
    heartRate: number;
    percentageOfMax: number;
  };
  sport: 'cycling' | 'running' | 'rowing' | 'swimming';
  testDate: Date;
}

export interface PeriodizationPlan {
  currentPhase: 'base' | 'build' | 'peak' | 'recovery' | 'transition';
  phaseGoals: string[];
  weeklyTrainingLoad: number;
  trainingStressBalance: number;
  peakingDate?: Date;
  recommendations: {
    intensity: 'low' | 'moderate' | 'high';
    volume: 'low' | 'moderate' | 'high';
    recovery: 'minimal' | 'moderate' | 'extensive';
    focus: string[];
  };
}

// Blood Test and Medical Analysis
export interface BloodTestResults {
  testId: string;
  testDate: Date;
  labName: string;
  results: BloodMarker[];
  aiInterpretation: BloodTestAIAnalysis;
  physicianReview: boolean;
  flaggedValues: BloodMarker[];
}

export interface BloodMarker {
  name: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
    optimal?: number;
  };
  status: 'low' | 'normal' | 'high' | 'critical';
  clinicalSignificance: string;
  trend?: 'improving' | 'stable' | 'worsening';
}

export interface BloodTestAIAnalysis {
  overallAssessment: string;
  keyFindings: string[];
  riskMarkers: string[];
  recommendations: string[];
  correlations: BloodMarkerCorrelation[];
  confidence: number;
}

export interface BloodMarkerCorrelation {
  markers: string[];
  correlation: number; // -1 to 1
  clinicalMeaning: string;
  actionable: boolean;
}

export interface ECGAnalysis {
  recordingId: string;
  timestamp: Date;
  duration: number; // seconds
  heartRate: number;
  rhythm: 'sinus' | 'afib' | 'flutter' | 'bradycardia' | 'tachycardia' | 'irregular';
  arrhythmiaDetected: boolean;
  arrhythmiaTypes: ArrhythmiaType[];
  qrsDuration: number;
  qtInterval: number;
  stChanges: boolean;
  clinicalInterpretation: string;
  urgencyLevel: 'routine' | 'urgent' | 'emergent';
  fdaAlgorithm: FDAAlgorithmData;
}

export interface ArrhythmiaType {
  type: 'PAC' | 'PVC' | 'PSVT' | 'AFib' | 'VTach' | 'VFib';
  frequency: number;
  clinical_significance: 'benign' | 'monitor' | 'evaluate' | 'urgent';
}

export interface SleepStudyAnalysis {
  studyId: string;
  studyDate: Date;
  studyType: 'home' | 'lab' | 'wearable';
  sleepEfficiency: number;
  apneaHypopneaIndex: number;
  oxygenDesaturationIndex: number;
  sleepStages: {
    n1: number; // minutes
    n2: number;
    n3: number;
    rem: number;
    wake: number;
  };
  sleepDisorders: SleepDisorder[];
  recommendations: string[];
}

export interface SleepDisorder {
  disorder: 'sleep_apnea' | 'insomnia' | 'restless_leg' | 'narcolepsy' | 'circadian_disorder';
  severity: 'mild' | 'moderate' | 'severe';
  confidence: number;
  treatment_recommended: boolean;
}

export interface MedicationInteraction {
  medicationA: string;
  medicationB?: string;
  interactionType: 'contraindicated' | 'major' | 'moderate' | 'minor';
  description: string;
  clinicalEffect: string;
  management: string;
  severity: number; // 1-5 scale
}

// 3D Biomarker and Advanced Analytics
export interface BiomarkerCorrelationMap {
  correlations: BiomarkerCorrelation[];
  visualizationData: ThreeDimensionalData;
  statisticalSignificance: StatisticalAnalysis;
  timeSeriesAnalysis: TimeSeriesCorrelation[];
}

export interface BiomarkerCorrelation {
  biomarkerX: string;
  biomarkerY: string;
  biomarkerZ?: string;
  correlationCoefficient: number;
  pValue: number;
  sampleSize: number;
  clinicalMeaning: string;
}

export interface ThreeDimensionalData {
  xAxis: { label: string; values: number[] };
  yAxis: { label: string; values: number[] };
  zAxis: { label: string; values: number[] };
  dataPoints: DataPoint3D[];
}

export interface DataPoint3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  size?: number;
  label?: string;
  timestamp: Date;
}

export interface StatisticalAnalysis {
  rSquared: number;
  pValue: number;
  confidenceInterval: [number, number];
  standardError: number;
  degreesOfFreedom: number;
  significanceLevel: number;
}

export interface TimeSeriesCorrelation {
  timelag: number; // in hours/days
  correlation: number;
  significance: boolean;
  leadingIndicator: string;
  laggingIndicator: string;
}

// Real-time Monitoring (ICU-style)
export interface RealTimeVitalSigns {
  timestamp: Date;
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenSaturation: number;
  respiratoryRate: number;
  temperature: number;
  alertStatus: 'normal' | 'caution' | 'warning' | 'critical';
  trends: VitalSignTrend[];
}

export interface VitalSignTrend {
  parameter: string;
  direction: 'increasing' | 'decreasing' | 'stable';
  rate: number; // rate of change per minute
  alertThreshold: boolean;
}

export interface PopulationBenchmark {
  metric: string;
  userValue: number;
  populationPercentile: number;
  ageGroupPercentile: number;
  genderPercentile: number;
  activityLevelPercentile: number;
  cohortSize: number;
  lastUpdated: Date;
}

export interface HealthTimeline {
  events: HealthTimelineEvent[];
  annotations: TimelineAnnotation[];
  milestones: HealthMilestone[];
  trends: TrendAnalysis[];
}

export interface HealthTimelineEvent {
  id: string;
  timestamp: Date;
  type: 'measurement' | 'activity' | 'medication' | 'symptom' | 'treatment';
  category: string;
  description: string;
  value?: number;
  unit?: string;
  severity?: 'low' | 'medium' | 'high';
  source: HealthDataSource;
}

export interface TimelineAnnotation {
  id: string;
  timestamp: Date;
  text: string;
  type: 'user_note' | 'ai_insight' | 'clinical_note';
  author: string;
  tags: string[];
}

export interface HealthMilestone {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: 'achievement' | 'goal_reached' | 'improvement' | 'concern';
  significance: 'minor' | 'moderate' | 'major';
}

// Cardiovascular Risk Assessment
export interface CardiovascularRisk {
  framinghamScore: number;
  reynoldsScore?: number;
  aiEnhancedScore: number;
  riskCategory: 'low' | 'intermediate' | 'high' | 'very_high';
  tenYearRisk: number; // percentage
  lifetimeRisk: number;
  contributingFactors: RiskFactor[];
  protectiveFactors: ProtectiveFactor[];
  recommendations: RiskRecommendation[];
}

export interface RiskFactor {
  factor: string;
  value: number;
  weight: number; // impact on overall risk
  modifiable: boolean;
  timeframe: string; // how long to address
}

export interface ProtectiveFactor {
  factor: string;
  protectionLevel: number;
  evidence: string;
}

export interface RiskRecommendation {
  intervention: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expectedBenefit: string;
  timeframe: string;
  category: 'lifestyle' | 'medical' | 'monitoring';
}

export interface MetabolicRisk {
  metabolicSyndromeRisk: number;
  diabetesRisk: number;
  insulinResistance: number;
  metabolicAge: number;
  riskFactors: string[];
  recommendations: string[];
}

export interface MentalHealthRisk {
  stressLevel: number;
  burnoutRisk: number;
  depressionRisk: number;
  anxietyLevel: number;
  sleepImpact: number;
  socialSupport: number;
  recommendations: string[];
}

// HRV and Advanced Metrics
export interface HRVAnalysis {
  timestamp: Date;
  rmssd: number; // Root Mean Square of Successive Differences
  pnn50: number; // Percentage of NN intervals > 50ms
  sdnn: number; // Standard Deviation of NN intervals
  triangularIndex: number;
  stressIndex: number;
  recoveryScore: number; // 0-100
  readinessScore: number; // 0-100
  interpretation: HRVInterpretation;
  trends: HRVTrend[];
}

export interface HRVInterpretation {
  autonomicTone: 'low' | 'balanced' | 'high';
  stressLevel: 'low' | 'moderate' | 'high' | 'very_high';
  recoveryStatus: 'poor' | 'fair' | 'good' | 'excellent';
  trainingReadiness: 'high' | 'moderate' | 'low' | 'rest_needed';
  recommendations: string[];
}

export interface HRVTrend {
  parameter: string;
  direction: 'improving' | 'stable' | 'declining';
  duration: string;
  significance: 'low' | 'moderate' | 'high';
}

export interface BloodOxygenTrends {
  restingSpO2: number;
  exerciseSpO2: number;
  sleepSpO2: number;
  altitudeCompensation: {
    currentAltitude: number;
    expectedSpO2: number;
    actualSpO2: number;
    compensationNeeded: boolean;
  };
  trends: OxygenTrend[];
  alerts: OxygenAlert[];
}

export interface OxygenTrend {
  timeframe: string;
  averageSpO2: number;
  minSpO2: number;
  desaturationEvents: number;
  clinicalSignificance: string;
}

export interface OxygenAlert {
  timestamp: Date;
  spO2Value: number;
  duration: number; // seconds
  severity: 'mild' | 'moderate' | 'severe';
  context: 'sleep' | 'exercise' | 'rest' | 'altitude';
  actionRequired: boolean;
}

export interface StressIndex {
  overallStress: number; // 0-100
  physiologicalStress: number;
  psychologicalStress: number;
  environmentalStress: number;
  dataPoints: StressDataPoint[];
  correlations: StressCorrelation[];
  recommendations: StressRecommendation[];
}

export interface StressDataPoint {
  source: 'hrv' | 'cortisol' | 'survey' | 'sleep' | 'activity';
  value: number;
  timestamp: Date;
  weight: number; // importance in overall calculation
}

export interface StressCorrelation {
  factor: string;
  correlation: number;
  significance: boolean;
  actionable: boolean;
}

export interface StressRecommendation {
  technique: string;
  category: 'breathing' | 'meditation' | 'exercise' | 'lifestyle' | 'professional';
  difficulty: 'easy' | 'moderate' | 'advanced';
  timeCommitment: string;
  expectedBenefit: string;
}

export interface RecoveryScore {
  overallScore: number; // 0-100
  sleepRecovery: number;
  hrvRecovery: number;
  activityRecovery: number;
  nutritionRecovery: number;
  hydrationRecovery: number;
  stressRecovery: number;
  recommendations: RecoveryRecommendation[];
  trendAnalysis: RecoveryTrend[];
}

export interface RecoveryRecommendation {
  category: 'sleep' | 'nutrition' | 'hydration' | 'activity' | 'stress';
  action: string;
  priority: 'low' | 'medium' | 'high';
  timeframe: string;
  expectedImprovement: number;
}

export interface RecoveryTrend {
  metric: string;
  direction: 'improving' | 'stable' | 'declining';
  rate: number;
  timeframe: string;
  significance: 'low' | 'moderate' | 'high';
}

export interface MetabolicEfficiency {
  fatOxidationRate: number;
  carbohydrateOxidationRate: number;
  metabolicFlexibility: number; // 0-100
  restingMetabolicRate: number;
  thermalEffectOfFood: number;
  exerciseEfficiency: number;
  recommendations: MetabolicRecommendation[];
}

export interface MetabolicRecommendation {
  type: 'nutrition' | 'exercise' | 'timing' | 'supplementation';
  recommendation: string;
  expectedBenefit: string;
  timeframe: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
}

// Predictive Analytics
export interface PredictiveIllnessDetection {
  riskScore: number; // 0-100
  timeframe: '24h' | '48h' | '72h' | '1week';
  confidenceLevel: number;
  riskFactors: PredictiveRiskFactor[];
  earlyWarningSignals: EarlyWarningSignal[];
  preventativeActions: PreventativeAction[];
  monitoringPlan: MonitoringPlan;
}

export interface PredictiveRiskFactor {
  factor: string;
  currentValue: number;
  normalRange: [number, number];
  trendDirection: 'increasing' | 'decreasing' | 'stable';
  contributionToRisk: number; // 0-100%
}

export interface EarlyWarningSignal {
  signal: string;
  detected: boolean;
  severity: 'mild' | 'moderate' | 'significant';
  timeDetected: Date;
  pattern: string;
}

export interface PreventativeAction {
  action: string;
  category: 'immediate' | 'short_term' | 'long_term';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expectedBenefit: string;
  implementationDifficulty: 'easy' | 'moderate' | 'challenging';
}

export interface MonitoringPlan {
  frequency: 'continuous' | 'hourly' | 'daily' | 'weekly';
  parameters: string[];
  alertThresholds: AlertThreshold[];
  escalationPlan: EscalationStep[];
}

export interface AlertThreshold {
  parameter: string;
  threshold: number;
  direction: 'above' | 'below' | 'outside_range';
  severity: 'info' | 'warning' | 'urgent' | 'critical';
}

export interface EscalationStep {
  step: number;
  trigger: string;
  action: string;
  responsibleParty: 'user' | 'system' | 'healthcare_provider' | 'emergency';
  timeframe: string;
}

export interface PerformanceOptimization {
  currentPerformanceLevel: number; // 0-100
  optimizationOpportunities: OptimizationOpportunity[];
  trainingRecommendations: TrainingRecommendation[];
  recoveryOptimization: RecoveryOptimization;
  nutritionOptimization: NutritionOptimization;
  performancePredictions: PerformancePrediction[];
}

export interface OptimizationOpportunity {
  area: string;
  currentStatus: string;
  potentialGain: number; // % improvement
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TrainingRecommendation {
  type: 'endurance' | 'strength' | 'power' | 'flexibility' | 'recovery';
  recommendation: string;
  frequency: string;
  intensity: 'low' | 'moderate' | 'high' | 'variable';
  duration: string;
  expectedBenefit: string;
  progressMarkers: string[];
}

export interface RecoveryOptimization {
  sleepOptimization: string[];
  nutritionTiming: string[];
  activeRecovery: string[];
  stressManagement: string[];
  hydrationStrategy: string[];
}

export interface NutritionOptimization {
  macronutrientBalance: {
    carbs: number; // percentage
    protein: number;
    fat: number;
  };
  mealTiming: string[];
  hydrationNeeds: number; // liters per day
  supplementRecommendations: SupplementRecommendation[];
  deficiencyRisks: string[];
}

export interface SupplementRecommendation {
  supplement: string;
  dosage: string;
  timing: string;
  reason: string;
  evidence: 'strong' | 'moderate' | 'limited';
  duration: string;
}

export interface PerformancePrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: number;
  factors: string[];
  interventions: string[];
}

export interface InjuryRiskFactor {
  factor: string;
  value: number;
  riskContribution: number; // 0-100%
  modifiable: boolean;
  interventions: string[];
}

export interface PreventionStrategy {
  strategy: string;
  targetRisk: string;
  implementation: string;
  frequency: string;
  effectiveness: number; // 0-100%
  evidence: 'strong' | 'moderate' | 'limited';
}

export interface BodyPartRisk {
  bodyPart: string;
  riskScore: number;
  commonInjuries: string[];
  riskFactors: string[];
  preventionFocus: string[];
}

export interface InjuryRiskAssessment {
  overallRisk: number; // 0-100
  riskByBodyPart: BodyPartRisk[];
  riskFactors: InjuryRiskFactor[];
  preventionStrategies: PreventionStrategy[];
  monitoringParameters: string[];
  confidenceInterval: [number, number];
}

export interface PersonalizedTrainingLoad {
  currentLoad: number;
  optimalLoad: number;
  loadTolerance: number;
  adaptationRate: number;
  fatigueLevel: number;
  recommendedAdjustment: {
    direction: 'increase' | 'decrease' | 'maintain';
    magnitude: number; // percentage change
    rationale: string;
    timeframe: string;
  };
  periodizationPhase: string;
  nextAssessment: Date;
}
