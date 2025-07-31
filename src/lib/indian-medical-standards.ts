// Indian Medical Standards and Guidelines
// Comprehensive database of Indian medical standards from ICMR, AIIMS, PGIMER, CMC Vellore

export interface IndianMedicalStandard {
  parameter: string;
  normalRange: {
    min: number;
    max: number;
    unit: string;
  };
  source: 'ICMR' | 'AIIMS' | 'PGIMER' | 'CMC_Vellore' | 'NIMHANS' | 'Sanjay_Gandhi_PGIMS' | 'King_George_Medical_University';
  populationSpecific?: {
    ageGroup?: string;
    gender?: 'male' | 'female' | 'both';
    region?: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'central';
    dietaryPattern?: 'vegetarian' | 'non_vegetarian' | 'mixed';
  };
  indianFactors?: {
    geneticVariations?: string[];
    environmentalFactors?: string[];
    dietaryInfluences?: string[];
    diseasePrevalence?: string[];
  };
  clinicalRelevance: string;
  lastUpdated: string;
}

export interface IndianDiseasePrevalence {
  condition: string;
  prevalence: number; // per 100,000 population
  ageGroup: string;
  region: string;
  riskFactors: string[];
  screeningGuidelines: string[];
  source: string;
}

export interface IndianPharmacogenomics {
  medication: string;
  indianPopulationResponse: {
    efficacy: number; // percentage
    adverseReactions: string[];
    dosageAdjustments: string[];
  };
  geneticVariations: string[];
  source: string;
}

export class IndianMedicalStandards {
  private standards: Map<string, IndianMedicalStandard> = new Map();
  private diseasePrevalence: Map<string, IndianDiseasePrevalence> = new Map();
  private pharmacogenomics: Map<string, IndianPharmacogenomics> = new Map();

  constructor() {
    this.initializeStandards();
    this.initializeDiseasePrevalence();
    this.initializePharmacogenomics();
  }

  private initializeStandards(): void {
    // Laboratory Parameters - Indian Population Specific
    this.addStandard('glucose_fasting', {
      parameter: 'Fasting Glucose',
      normalRange: { min: 70, max: 110, unit: 'mg/dL' },
      source: 'ICMR',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both',
        dietaryPattern: 'mixed'
      },
      indianFactors: {
        geneticVariations: ['TCF7L2 polymorphism', 'KCNJ11 mutations'],
        environmentalFactors: ['Urban lifestyle', 'Stress levels', 'Physical inactivity'],
        dietaryInfluences: ['High carbohydrate diet', 'Rice-based meals', 'Refined sugar intake'],
        diseasePrevalence: ['Type 2 DM: 7.3% adults', 'Prediabetes: 10.3% adults']
      },
      clinicalRelevance: 'Indians have higher risk of diabetes at lower BMI levels',
      lastUpdated: '2024-01-15'
    });

    this.addStandard('hba1c', {
      parameter: 'HbA1c',
      normalRange: { min: 4.0, max: 5.6, unit: '%' },
      source: 'AIIMS',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both'
      },
      indianFactors: {
        geneticVariations: ['Hemoglobin variants', 'G6PD deficiency'],
        environmentalFactors: ['Temperature variations', 'Altitude effects'],
        dietaryInfluences: ['Vegetarian diet effects on iron levels'],
        diseasePrevalence: ['Diabetes complications: Higher retinopathy rates']
      },
      clinicalRelevance: 'Indian population shows earlier onset of diabetic complications',
      lastUpdated: '2024-02-10'
    });

    this.addStandard('vitamin_d', {
      parameter: 'Vitamin D (25-OH)',
      normalRange: { min: 30, max: 100, unit: 'ng/mL' },
      source: 'PGIMER',
      populationSpecific: {
        ageGroup: 'all_ages',
        gender: 'both',
        // region: 'all' - commented out, invalid value
      },
      indianFactors: {
        geneticVariations: ['VDR gene polymorphisms', 'CYP2R1 variations'],
        environmentalFactors: ['Limited sun exposure', 'Air pollution', 'Indoor lifestyle'],
        dietaryInfluences: ['Low dietary vitamin D', 'Limited fortified foods'],
        diseasePrevalence: ['Deficiency: 70-90% urban population', 'Rickets: Higher in northern states']
      },
      clinicalRelevance: 'Extremely high prevalence of deficiency despite tropical climate',
      lastUpdated: '2024-01-20'
    });

    this.addStandard('vitamin_b12', {
      parameter: 'Vitamin B12',
      normalRange: { min: 300, max: 900, unit: 'pg/mL' },
      source: 'CMC_Vellore',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both',
        dietaryPattern: 'vegetarian'
      },
      indianFactors: {
        geneticVariations: ['TCN2 polymorphisms', 'FUT2 gene variants'],
        environmentalFactors: ['H. pylori infection', 'Malabsorption syndromes'],
        dietaryInfluences: ['Vegetarian diet', 'Limited animal products', 'Traditional cooking methods'],
        diseasePrevalence: ['Deficiency: 47% in vegetarians', 'Megaloblastic anemia: High prevalence']
      },
      clinicalRelevance: 'Higher deficiency rates in vegetarian population (70% of Indians)',
      lastUpdated: '2024-01-25'
    });

    this.addStandard('hemoglobin', {
      parameter: 'Hemoglobin',
      normalRange: { min: 12.0, max: 16.0, unit: 'g/dL' },
      source: 'ICMR',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both'
      },
      indianFactors: {
        geneticVariations: ['Thalassemia traits', 'Sickle cell traits', 'G6PD deficiency'],
        environmentalFactors: ['Iron-deficient soils', 'Parasitic infections', 'Malaria endemic areas'],
        dietaryInfluences: ['Phytate-rich diet', 'Tea/coffee consumption', 'Iron absorption inhibitors'],
        diseasePrevalence: ['Iron deficiency anemia: 53% women', 'Thalassemia: 3-4% population']
      },
      clinicalRelevance: 'Highest anemia burden globally, complex genetic and nutritional factors',
      lastUpdated: '2024-02-05'
    });

    this.addStandard('cholesterol_total', {
      parameter: 'Total Cholesterol',
      normalRange: { min: 150, max: 200, unit: 'mg/dL' },
      source: 'ICMR',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both'
      },
      indianFactors: {
        geneticVariations: ['APOE polymorphisms', 'LDLR variants'],
        environmentalFactors: ['Urbanization', 'Lifestyle changes', 'Stress'],
        dietaryInfluences: ['Ghee consumption', 'Coconut oil usage', 'Fried foods'],
        diseasePrevalence: ['CAD: Earlier onset (45-50 years)', 'Dyslipidemia: 25-30% urban adults']
      },
      clinicalRelevance: 'Indians develop CAD 5-10 years earlier than Western populations',
      lastUpdated: '2024-01-30'
    });

    this.addStandard('creatinine', {
      parameter: 'Serum Creatinine',
      normalRange: { min: 0.6, max: 1.2, unit: 'mg/dL' },
      source: 'AIIMS',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both'
      },
      indianFactors: {
        geneticVariations: ['Lower muscle mass', 'Different body composition'],
        environmentalFactors: ['Heat stress', 'Dehydration', 'Nephrotoxic medications'],
        dietaryInfluences: ['Vegetarian diet effects', 'Protein intake variations'],
        diseasePrevalence: ['CKD: 17.2% population', 'Diabetic nephropathy: High progression']
      },
      clinicalRelevance: 'eGFR equations need Indian population-specific modifications',
      lastUpdated: '2024-02-15'
    });

    this.addStandard('thyroid_tsh', {
      parameter: 'Thyroid Stimulating Hormone (TSH)',
      normalRange: { min: 0.4, max: 4.0, unit: 'mIU/L' },
      source: 'AIIMS',
      populationSpecific: {
        ageGroup: 'adults',
        gender: 'both'
      },
      indianFactors: {
        geneticVariations: ['TSHR polymorphisms', 'TPO gene variants'],
        environmentalFactors: ['Iodine deficiency', 'Goitrogens in food', 'Fluoride excess'],
        dietaryInfluences: ['Goitrogenic foods (cabbage, cauliflower)', 'Soy consumption'],
        diseasePrevalence: ['Hypothyroidism: 11% adults', 'Goiter: Endemic in sub-Himalayan regions']
      },
      clinicalRelevance: 'Regional variations in iodine status affect thyroid function',
      lastUpdated: '2024-01-18'
    });

    // Add more parameters...
    this.addCardiacMarkers();
    this.addLiverFunction();
    this.addInflammatoryMarkers();
  }

  private addCardiacMarkers(): void {
    this.addStandard('troponin_i', {
      parameter: 'Troponin I',
      normalRange: { min: 0, max: 0.04, unit: 'ng/mL' },
      source: 'AIIMS',
      indianFactors: {
        diseasePrevalence: ['MI: Younger age onset', 'CAD: 3-4x risk at same BMI'],
        geneticVariations: ['9p21 locus variants', 'APOE4 higher frequency']
      },
      clinicalRelevance: 'Indians have higher cardiovascular risk at lower traditional risk factors',
      lastUpdated: '2024-01-12'
    });

    this.addStandard('ck_mb', {
      parameter: 'CK-MB',
      normalRange: { min: 0, max: 6.3, unit: 'ng/mL' },
      source: 'CMC_Vellore',
      indianFactors: {
        environmentalFactors: ['Physical labor patterns', 'Heat stress'],
        diseasePrevalence: ['Young CAD: 25% <40 years vs 5% in West']
      },
      clinicalRelevance: 'Higher baseline values in physically active rural populations',
      lastUpdated: '2024-01-15'
    });
  }

  private addLiverFunction(): void {
    this.addStandard('alt', {
      parameter: 'ALT (SGPT)',
      normalRange: { min: 7, max: 56, unit: 'U/L' },
      source: 'PGIMER',
      indianFactors: {
        environmentalFactors: ['Hepatitis B/C prevalence', 'Aflatoxin exposure', 'Alcohol patterns'],
        diseasePrevalence: ['NAFLD: 25-30% adults', 'Hepatitis B: 2-8% prevalence'],
        dietaryInfluences: ['Turmeric (hepatoprotective)', 'High carb diet effects']
      },
      clinicalRelevance: 'NAFLD epidemic paralleling diabetes increase',
      lastUpdated: '2024-02-01'
    });

    this.addStandard('ast', {
      parameter: 'AST (SGOT)',
      normalRange: { min: 10, max: 40, unit: 'U/L' },
      source: 'PGIMER',
      indianFactors: {
        environmentalFactors: ['Traditional medicine use', 'Occupational toxin exposure'],
        diseasePrevalence: ['Cirrhosis: Higher viral etiology vs Western alcoholic']
      },
      clinicalRelevance: 'Different etiological patterns of liver disease',
      lastUpdated: '2024-02-01'
    });
  }

  private addInflammatoryMarkers(): void {
    this.addStandard('crp', {
      parameter: 'C-Reactive Protein',
      normalRange: { min: 0, max: 3.0, unit: 'mg/L' },
      source: 'AIIMS',
      indianFactors: {
        environmentalFactors: ['Air pollution', 'Infectious disease burden', 'Poor sanitation'],
        diseasePrevalence: ['Chronic inflammation: Higher baseline levels'],
        geneticVariations: ['CRP gene polymorphisms affecting baseline levels']
      },
      clinicalRelevance: 'Higher baseline inflammatory markers due to environmental factors',
      lastUpdated: '2024-01-28'
    });

    this.addStandard('esr', {
      parameter: 'Erythrocyte Sedimentation Rate',
      normalRange: { min: 0, max: 20, unit: 'mm/hr' },
      source: 'ICMR',
      indianFactors: {
        environmentalFactors: ['Infectious diseases', 'Rheumatic conditions'],
        diseasePrevalence: ['Rheumatic heart disease: Higher prevalence', 'TB: Endemic areas']
      },
      clinicalRelevance: 'Higher baseline due to higher infectious disease burden',
      lastUpdated: '2024-01-25'
    });
  }

  private initializeDiseasePrevalence(): void {
    this.diseasePrevalence.set('diabetes_type2', {
      condition: 'Type 2 Diabetes Mellitus',
      prevalence: 7300, // per 100,000
      ageGroup: '>20 years',
      region: 'National average',
      riskFactors: [
        'Central obesity (>90cm waist men, >80cm women)',
        'Family history (stronger genetic predisposition)',
        'Sedentary lifestyle',
        'High carbohydrate diet',
        'Stress and urbanization'
      ],
      screeningGuidelines: [
        'Annual screening for adults >25 years with risk factors',
        'HbA1c preferred over OGTT in Indian guidelines',
        'Lower BMI cutoffs for obesity (>23 kg/m² overweight, >25 obese)'
      ],
      source: 'ICMR-INDIAB Study 2023'
    });

    this.diseasePrevalence.set('hypertension', {
      condition: 'Hypertension',
      prevalence: 28000, // per 100,000
      ageGroup: '>18 years',
      region: 'National average',
      riskFactors: [
        'High salt intake (>10g/day average)',
        'Low potassium diet',
        'Obesity (at lower BMI than Western populations)',
        'Alcohol consumption',
        'Stress and urban lifestyle'
      ],
      screeningGuidelines: [
        'Annual BP measurement for all adults >18 years',
        'Home BP monitoring recommended',
        'Lower thresholds for treatment initiation (130/80 vs 140/90)'
      ],
      source: 'National Family Health Survey 2022'
    });

    this.diseasePrevalence.set('coronary_artery_disease', {
      condition: 'Coronary Artery Disease',
      prevalence: 5400, // per 100,000
      ageGroup: '30-70 years',
      region: 'Urban higher than rural',
      riskFactors: [
        'Premature CAD (men <45, women <55)',
        'South Asian genetic predisposition',
        'Low HDL levels',
        'High triglycerides',
        'Central obesity',
        'Metabolic syndrome'
      ],
      screeningGuidelines: [
        'Risk assessment starting age 30 for men, 35 for women',
        'TMT/ECHO for high-risk individuals',
        'Aggressive lipid management (LDL <70 for high risk)'
      ],
      source: 'Registrar General of India 2023'
    });
  }

  private initializePharmacogenomics(): void {
    this.pharmacogenomics.set('warfarin', {
      medication: 'Warfarin',
      indianPopulationResponse: {
        efficacy: 85,
        adverseReactions: ['Increased bleeding risk with CYP2C9*2/*3 variants'],
        dosageAdjustments: ['Lower starting dose (2.5mg vs 5mg)', 'More frequent monitoring']
      },
      geneticVariations: ['CYP2C9*2/*3 variants (12-15%)', 'VKORC1 haplotypes'],
      source: 'PGI Chandigarh Pharmacogenomics Study'
    });

    this.pharmacogenomics.set('clopidogrel', {
      medication: 'Clopidogrel',
      indianPopulationResponse: {
        efficacy: 70,
        adverseReactions: ['Poor response in CYP2C19 poor metabolizers'],
        dosageAdjustments: ['Higher dose or alternative agent for poor metabolizers']
      },
      geneticVariations: ['CYP2C19*2 (27-35%)', 'CYP2C19*3 (6-10%)'],
      source: 'AIIMS Cardiology Pharmacogenomics Study'
    });

    this.pharmacogenomics.set('metformin', {
      medication: 'Metformin',
      indianPopulationResponse: {
        efficacy: 92,
        adverseReactions: ['GI intolerance (15-20%)', 'B12 deficiency (higher risk)'],
        dosageAdjustments: ['Start with 500mg BD', 'Monitor B12 levels annually']
      },
      geneticVariations: ['OCT1 polymorphisms', 'SLC22A1 variants'],
      source: 'ICMR Diabetes Task Force'
    });
  }

  private addStandard(key: string, standard: IndianMedicalStandard): void {
    this.standards.set(key, standard);
  }

  // Public methods
  public getStandard(parameter: string): IndianMedicalStandard | undefined {
    const key = parameter.toLowerCase().replace(/[\s\-]/g, '_');
    return this.standards.get(key);
  }

  public getDiseasePrevalence(condition: string): IndianDiseasePrevalence | undefined {
    return this.diseasePrevalence.get(condition);
  }

  public getPharmacogenomics(medication: string): IndianPharmacogenomics | undefined {
    return this.pharmacogenomics.get(medication.toLowerCase());
  }

  public getAllStandards(): Map<string, IndianMedicalStandard> {
    return this.standards;
  }

  public getStandardsBySource(source: string): IndianMedicalStandard[] {
    return Array.from(this.standards.values()).filter(std => std.source === source);
  }

  public getParametersForSystem(system: 'cardiovascular' | 'endocrine' | 'hepatic' | 'renal' | 'hematological'): string[] {
    const systemParameters = {
      cardiovascular: ['cholesterol_total', 'hdl', 'ldl', 'triglycerides', 'troponin_i', 'ck_mb', 'crp'],
      endocrine: ['glucose_fasting', 'hba1c', 'thyroid_tsh', 't3', 't4', 'insulin'],
      hepatic: ['alt', 'ast', 'bilirubin_total', 'albumin', 'ggt'],
      renal: ['creatinine', 'bun', 'uric_acid', 'microalbumin'],
      hematological: ['hemoglobin', 'wbc', 'platelet_count', 'esr', 'vitamin_b12', 'folate']
    };
    
    return systemParameters[system] || [];
  }

  public validateValue(parameter: string, value: number, age?: number, gender?: string): {
    isNormal: boolean;
    status: 'normal' | 'borderline' | 'abnormal' | 'critical';
    interpretation: string;
    indianContext: string;
  } {
    const standard = this.getStandard(parameter);
    
    if (!standard) {
      return {
        isNormal: true,
        status: 'normal',
        interpretation: 'No Indian standard available for this parameter',
        indianContext: 'Please refer to international guidelines'
      };
    }

    const { min, max } = standard.normalRange;
    let status: 'normal' | 'borderline' | 'abnormal' | 'critical' = 'normal';
    let interpretation = '';
    
    if (value < min * 0.7 || value > max * 1.5) {
      status = 'critical';
      interpretation = `Value significantly outside normal range (${min}-${max} ${standard.normalRange.unit})`;
    } else if (value < min || value > max) {
      status = 'abnormal';
      interpretation = `Value outside normal range (${min}-${max} ${standard.normalRange.unit})`;
    } else if (value < min * 1.1 || value > max * 0.9) {
      status = 'borderline';
      interpretation = `Value at borderline of normal range (${min}-${max} ${standard.normalRange.unit})`;
    } else {
      interpretation = `Value within normal range (${min}-${max} ${standard.normalRange.unit})`;
    }

    return {
      isNormal: status === 'normal',
      status,
      interpretation,
      indianContext: standard.clinicalRelevance
    };
  }

  public getScreeningRecommendations(age: number, gender: string, riskFactors: string[]): string[] {
    const recommendations: string[] = [];
    
    // Age-based screening
    if (age >= 25) {
      recommendations.push('Annual diabetes screening (HbA1c or FPG)');
      recommendations.push('Blood pressure monitoring every 6 months');
    }
    
    if (age >= 30) {
      recommendations.push('Lipid profile every 2 years');
      recommendations.push('ECG baseline and every 3 years');
    }
    
    if (age >= 35) {
      recommendations.push('Comprehensive metabolic panel annually');
      recommendations.push('Thyroid function test every 3 years');
    }
    
    if (age >= 40) {
      recommendations.push('Coronary artery calcium score (if high risk)');
      recommendations.push('Annual cardiac risk assessment');
    }
    
    // Gender-specific
    if (gender === 'female') {
      if (age >= 21) {
        recommendations.push('Cervical cancer screening (Pap smear) every 3 years');
      }
      if (age >= 40) {
        recommendations.push('Mammography every 2 years');
        recommendations.push('Bone density scan (if risk factors)');
      }
    }
    
    if (gender === 'male' && age >= 40) {
      recommendations.push('Prostate cancer screening discussion');
    }
    
    // Risk factor-based
    if (riskFactors.includes('family_history_diabetes')) {
      recommendations.push('Annual diabetes screening from age 20');
      recommendations.push('HbA1c every 6 months if prediabetic');
    }
    
    if (riskFactors.includes('family_history_heart_disease')) {
      recommendations.push('Lipid screening from age 25');
      recommendations.push('Consider genetic counseling');
    }
    
    return recommendations;
  }
}

export const indianMedicalStandards = new IndianMedicalStandards();
