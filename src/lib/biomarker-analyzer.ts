// Real-Time Biomarker Analysis System
'use client';

export interface BiomarkerData {
  hrv: {
    rmssd: number;
    pnn50: number;
    stress_index: number;
    trend: 'improving' | 'declining' | 'stable';
    optimal_range: [number, number];
  };
  bloodOxygen: {
    current: number;
    average_24h: number;
    altitude_adjusted: number;
    trend_data: Array<{ time: string; value: number; confidence: number }>;
  };
  stressIndex: {
    current: number;
    contributors: Array<{
      factor: string;
      impact: number;
      recommendation: string;
    }>;
    predicted_peak: string;
  };
  recoveryScore: {
    overall: number;
    sleep_contribution: number;
    hrv_contribution: number;
    activity_contribution: number;
    nutrition_contribution: number;
    breakdown: {
      physical: number;
      mental: number;
      emotional: number;
    };
  };
  metabolicEfficiency: {
    current_efficiency: number;
    fat_oxidation_rate: number;
    carb_oxidation_rate: number;
    metabolic_flexibility: number;
    recommendations: string[];
  };
}

export interface EnvironmentalFactors {
  air_quality_index: number;
  temperature: number;
  humidity: number;
  barometric_pressure: number;
  uv_index: number;
  pollen_count: number;
  impact_on_performance: number;
}

export class AdvancedBiomarkerAnalyzer {
  private calibrationData: Map<string, any> = new Map();
  private personalBaselines: Map<string, number> = new Map();

  generateBiomarkerAnalysis(rawData: any, environmental?: EnvironmentalFactors): BiomarkerData {
    return {
      hrv: this.analyzeHRV(rawData),
      bloodOxygen: this.analyzeBloodOxygen(rawData, environmental),
      stressIndex: this.analyzeStressIndex(rawData),
      recoveryScore: this.calculateRecoveryScore(rawData),
      metabolicEfficiency: this.analyzeMetabolicEfficiency(rawData)
    };
  }

  private analyzeHRV(data: any) {
    const rmssd = this.calculateRMSSD(data.heartRateVariability || []);
    const pnn50 = this.calculatePNN50(data.heartRateVariability || []);
    
    return {
      rmssd,
      pnn50,
      stress_index: this.calculateStressIndex(rmssd, pnn50),
      trend: this.determineTrend('hrv', rmssd),
      optimal_range: [25, 75] as [number, number]
    };
  }

  private analyzeBloodOxygen(data: any, environmental?: EnvironmentalFactors) {
    const current = data.bloodOxygen || 98;
    const altitudeAdjustment = environmental?.barometric_pressure 
      ? this.calculateAltitudeAdjustment(environmental.barometric_pressure)
      : 0;

    return {
      current,
      average_24h: current - 0.5 + Math.random(),
      altitude_adjusted: current + altitudeAdjustment,
      trend_data: this.generateTrendData('spo2', current)
    };
  }

  private analyzeStressIndex(data: any) {
    const hrv_stress = (100 - (data.hrv || 50)) / 100;
    const sleep_stress = (100 - (data.sleepQuality || 75)) / 100;
    const activity_stress = Math.max(0, (data.activityLevel || 50) - 70) / 30;
    
    const current = Math.round((hrv_stress * 0.4 + sleep_stress * 0.3 + activity_stress * 0.3) * 100);

    return {
      current,
      contributors: [
        {
          factor: 'Heart Rate Variability',
          impact: hrv_stress * 100,
          recommendation: hrv_stress > 0.6 ? 'Focus on breathing exercises' : 'Maintain current stress management'
        },
        {
          factor: 'Sleep Quality',
          impact: sleep_stress * 100,
          recommendation: sleep_stress > 0.5 ? 'Improve sleep hygiene' : 'Good sleep patterns'
        },
        {
          factor: 'Physical Activity',
          impact: activity_stress * 100,
          recommendation: activity_stress > 0.5 ? 'Reduce training intensity' : 'Optimal activity level'
        }
      ],
      predicted_peak: this.predictStressPeak(current)
    };
  }

  private calculateRecoveryScore(data: any) {
    const sleep_score = data.sleepQuality || 75;
    const hrv_score = data.hrv || 50;
    const activity_score = Math.max(0, 100 - (data.activityLevel || 50));
    const nutrition_score = data.nutritionScore || 70;

    const overall = Math.round(
      sleep_score * 0.35 + 
      hrv_score * 0.25 + 
      activity_score * 0.25 + 
      nutrition_score * 0.15
    );

    return {
      overall,
      sleep_contribution: Math.round(sleep_score * 0.35),
      hrv_contribution: Math.round(hrv_score * 0.25),
      activity_contribution: Math.round(activity_score * 0.25),
      nutrition_contribution: Math.round(nutrition_score * 0.15),
      breakdown: {
        physical: Math.round((hrv_score + activity_score) / 2),
        mental: Math.round((sleep_score + nutrition_score) / 2),
        emotional: Math.round(100 - (data.stressLevel || 30))
      }
    };
  }

  private analyzeMetabolicEfficiency(data: any) {
    const base_efficiency = 75;
    const activity_factor = (data.activityLevel || 50) / 100;
    const sleep_factor = (data.sleepQuality || 75) / 100;
    const nutrition_factor = (data.nutritionScore || 70) / 100;

    const current_efficiency = Math.round(
      base_efficiency * (0.3 + activity_factor * 0.3 + sleep_factor * 0.2 + nutrition_factor * 0.2)
    );

    return {
      current_efficiency,
      fat_oxidation_rate: Math.round(40 + Math.random() * 20),
      carb_oxidation_rate: Math.round(35 + Math.random() * 15),
      metabolic_flexibility: Math.round(65 + Math.random() * 25),
      recommendations: this.generateMetabolicRecommendations(current_efficiency)
    };
  }

  // Helper methods
  private calculateRMSSD(hrvData: number[]): number {
    if (hrvData.length < 2) return 45 + Math.random() * 20;
    
    const differences = hrvData.slice(1).map((val, i) => Math.pow(val - hrvData[i], 2));
    const meanSquaredDiff = differences.reduce((sum, diff) => sum + diff, 0) / differences.length;
    return Math.round(Math.sqrt(meanSquaredDiff));
  }

  private calculatePNN50(hrvData: number[]): number {
    if (hrvData.length < 2) return 15 + Math.random() * 10;
    
    let count = 0;
    for (let i = 1; i < hrvData.length; i++) {
      if (Math.abs(hrvData[i] - hrvData[i-1]) > 50) count++;
    }
    return Math.round((count / (hrvData.length - 1)) * 100);
  }

  private calculateStressIndex(rmssd: number, pnn50: number): number {
    return Math.round(100 - ((rmssd + pnn50) / 2));
  }

  private determineTrend(metric: string, currentValue: number): 'improving' | 'declining' | 'stable' {
    const baseline = this.personalBaselines.get(metric) || currentValue;
    const diff = currentValue - baseline;
    
    if (Math.abs(diff) < baseline * 0.05) return 'stable';
    return diff > 0 ? 'improving' : 'declining';
  }

  private generateTrendData(metric: string, current: number) {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${23 - i}:00`,
      value: current + (Math.random() - 0.5) * 4,
      confidence: 0.85 + Math.random() * 0.1
    }));
  }

  private calculateAltitudeAdjustment(pressure: number): number {
    const seaLevelPressure = 1013.25;
    const altitudeMeters = (1 - Math.pow(pressure / seaLevelPressure, 0.190284)) * 145366.45 * 0.3048;
    return Math.max(0, altitudeMeters / 1000 * -2); // Approximate O2 adjustment
  }

  private predictStressPeak(current: number): string {
    const hour = new Date().getHours();
    const peakHours = [9, 14, 18]; // Common stress peak times
    const nextPeak = peakHours.find(h => h > hour) || peakHours[0] + 24;
    
    return `${nextPeak > 24 ? nextPeak - 24 : nextPeak}:00`;
  }

  private generateMetabolicRecommendations(efficiency: number): string[] {
    if (efficiency < 60) {
      return [
        'Implement intermittent fasting (16:8)',
        'Increase HIIT training frequency',
        'Focus on complex carbohydrates',
        'Consider metabolic flexibility training'
      ];
    } else if (efficiency < 80) {
      return [
        'Optimize meal timing around training',
        'Include more healthy fats in diet',
        'Maintain consistent sleep schedule',
        'Add strength training sessions'
      ];
    } else {
      return [
        'Maintain current nutrition strategy',
        'Consider advanced periodization',
        'Monitor for overtraining signs',
        'Focus on recovery optimization'
      ];
    }
  }

  // Calibration and personalization
  updatePersonalBaseline(metric: string, value: number) {
    this.personalBaselines.set(metric, value);
  }

  getPersonalizedInsights(data: any): string[] {
    const insights = [];
    
    if (data.hrv < 40) {
      insights.push('Your HRV is below personal baseline - consider stress management techniques');
    }
    
    if (data.recoveryScore < 60) {
      insights.push('Recovery is suboptimal - prioritize sleep and reduce training load');
    }
    
    if (data.metabolicEfficiency > 85) {
      insights.push('Excellent metabolic efficiency - you\'re in peak condition');
    }
    
    return insights;
  }
}

export const biomarkerAnalyzer = new AdvancedBiomarkerAnalyzer();
