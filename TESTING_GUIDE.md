# Test the Adaptive Clinical Intelligence Engine

## Testing Instructions

To test the enhanced AI report analysis system, follow these steps:

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test with Sample Medical Reports

Create test files with the following content:

#### Sample Lab Report (test-lab-report.txt)
```
LABORATORY REPORT
Patient: Test Patient
Age: 45 years, Male
Date: 25-07-2025

BIOCHEMISTRY RESULTS:
====================
Glucose Fasting: 125 mg/dL (70-110)
HbA1c: 6.2% (4.0-5.6)
Total Cholesterol: 220 mg/dL (150-200)
HDL Cholesterol: 38 mg/dL (>40)
LDL Cholesterol: 145 mg/dL (<100)
Triglycerides: 185 mg/dL (<150)
Creatinine: 1.1 mg/dL (0.6-1.2)
Urea: 35 mg/dL (15-40)
Hemoglobin: 13.5 g/dL (13-17)
Vitamin D: 18 ng/mL (30-100)
Vitamin B12: 180 pg/mL (300-900)

CLINICAL REMARKS:
Patient shows signs of prediabetes. Family history of diabetes.
Recommend lifestyle modifications and follow-up in 3 months.

Dr. Sharma, MD
AIIMS, New Delhi
```

#### Sample Handwritten Note (test-handwritten.txt)
```
Patient Notes - 25/07/2025

Chief Complaint: Fatigue, frequent urination
History: 45y M, software engineer, sedentary lifestyle
Family Hx: Father - T2DM, Mother - HTN

Physical Exam:
BP: 140/88 mmHg
Weight: 78 kg, Height: 170 cm
BMI: 27.0

Assessment:
- Prediabetes likely
- Hypertension stage 1
- Obesity

Plan:
1. Lifestyle counseling
2. Metformin 500mg BD
3. Follow up 4 weeks
4. HbA1c repeat 3 months

Dr. Patel
```

### 3. API Testing

Use curl or Postman to test the endpoint:

```bash
curl -X POST http://localhost:3000/api/medical/analyze-report \
  -F "file=@test-lab-report.txt" \
  -F "age=45" \
  -F "gender=male"
```

### 4. Expected Response Features

The enhanced system should provide:

#### 🔍 Format Detection
- Automatic detection of document type (lab report, clinical notes, etc.)
- Confidence scoring for extraction quality
- Parsing method identification

#### 🇮🇳 Indian Medical Standards
- ICMR/AIIMS standard ranges applied
- Population-specific interpretations
- Indian disease prevalence context

#### 📊 Enhanced Analysis
- Comprehensive health scoring
- Risk factor identification with Indian context
- Personalized recommendations

#### 🎯 Traceability
- Source attribution for all claims
- Confidence levels for each extraction
- Database references (ICMR, AIIMS, etc.)

### 5. Sample Response Structure

```json
{
  "success": true,
  "analysis": {
    "overallAssessment": {
      "healthScore": 72,
      "status": "fair",
      "summary": "Several parameters exceed Indian population normal ranges, indicating prediabetes and cardiovascular risk factors commonly seen in urban Indian males."
    },
    "keyFindings": [
      {
        "category": "Glucose Metabolism",
        "finding": "Fasting glucose 125 mg/dL",
        "significance": "high",
        "explanation": "Exceeds ICMR normal range (70-110 mg/dL). Indian population shows 2.3x higher progression to diabetes."
      }
    ],
    "detailedInsights": {
      "personalizedGuidance": {
        "culturalDietaryAdvice": [
          "Modify traditional dal-chawal combination with increased vegetable content",
          "Include turmeric and fenugreek in daily cooking for glucose management",
          "Reduce portion sizes of rice/roti, increase protein from dal and paneer"
        ]
      }
    }
  },
  "benchmarks": [
    {
      "parameter": "Glucose Fasting",
      "patientValue": 125,
      "populationPercentile": 78,
      "indianStandards": {
        "normal": { "min": 70, "max": 110 },
        "source": "ICMR"
      }
    }
  ],
  "indianContext": {
    "standardsApplied": 11,
    "populationSpecificInsights": true,
    "diseasePrevalenceContext": true
  },
  "traceability": [
    {
      "claim": "Glucose level interpretation",
      "source": "ICMR Diabetes Guidelines 2024",
      "confidence": 0.96,
      "database": "ICMR"
    }
  ]
}
```

### 6. Testing Different Document Types

#### PDF Lab Reports
- Upload actual lab report PDFs
- Test OCR capabilities
- Verify extraction accuracy

#### Image Files
- Scan of handwritten prescriptions
- Photo of lab reports
- Test image processing quality

#### Structured Data
- CSV exports from lab systems
- JSON formatted medical data
- XML clinical documents

### 7. Indian Context Validation

Verify that the system correctly applies:

#### Population-Specific Standards
- Lower BMI cutoffs for obesity (23 vs 25)
- Higher vitamin D deficiency thresholds
- Adjusted hemoglobin ranges for genetic variants

#### Disease Prevalence Context
- Earlier diabetes onset recognition
- Higher cardiovascular risk at lower traditional risk factors
- Nutritional deficiency patterns (B12, Iron, Vitamin D)

#### Cultural Considerations
- Vegetarian diet implications
- Traditional medicine integration
- Family-based healthcare decisions

### 8. Performance Metrics

Monitor these key metrics:

#### Extraction Accuracy
- Text recognition accuracy >95%
- Medical entity extraction >90%
- Parameter value parsing >98%

#### Clinical Relevance
- Appropriate Indian standard application
- Relevant cultural context inclusion
- Actionable recommendation generation

#### Response Quality
- Comprehensive analysis coverage
- Clear, understandable explanations
- Appropriate urgency classification

### 9. Error Scenarios to Test

#### Low Quality Documents
- Blurry images
- Poor handwriting
- Incomplete information

#### Edge Cases
- Mixed language documents
- Non-standard formats
- Critical value handling

#### Fallback Behaviors
- Low confidence handling
- Missing standard references
- Alternative parsing methods

### 10. Integration Testing

Test integration with:
- Existing health dashboards
- Medical report databases
- Alert systems
- Notification services

## Advanced Testing Scenarios

### Multi-Parameter Analysis
Test with comprehensive metabolic panels including:
- Complete blood count
- Comprehensive metabolic panel
- Lipid profile
- Thyroid function
- Vitamin levels

### Temporal Analysis
Test with sequential reports to verify:
- Trend detection
- Improvement tracking
- Risk progression monitoring

### Emergency Scenarios
Test critical value detection:
- Glucose >400 mg/dL
- Creatinine >3.0 mg/dL
- Hemoglobin <7.0 g/dL

The system should demonstrate superior performance in handling Indian medical documents while maintaining global medical standards compatibility.
