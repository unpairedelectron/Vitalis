# Test PDF Extraction - Apollo Diagnostics Glucose Report

## Create Test PDF Content

Create a file named `apollo_glucose_test.txt` with the following content:

```
APOLLO DIAGNOSTICS
Laboratory Report

Patient Name: Test Patient
Age: 45 Years, Male
Date: 29-07-2025
Report ID: LAB123456

BIOCHEMISTRY RESULTS
====================

Glucose Fasting: 122 mg/dL (Normal: 70-110 mg/dL) [HIGH]
HbA1c: 6.1% (Normal: 4.0-5.6%) [ELEVATED]

Collection Time: Morning 8:00 AM
Fasting Status: 12 Hours Fasted

CLINICAL INTERPRETATION:
- Fasting glucose level elevated
- Suggests impaired glucose tolerance
- HbA1c indicates prediabetic state

RECOMMENDATIONS:
1. Lifestyle modifications
2. Dietary counseling
3. Follow-up in 3 months
4. Consider endocrinologist consultation

Dr. Sharma, MD
Clinical Pathologist
Apollo Diagnostics, Delhi
```

## Testing Instructions

### 1. Test with cURL

```bash
# Test with text file
curl -X POST http://localhost:3000/api/medical/analyze-report \
  -F "file=@apollo_glucose_test.txt" \
  -F "age=45" \
  -F "gender=male"
```

### 2. Expected Results

The enhanced system should now:

✅ **Properly Extract Text**: 
- Recognize "Glucose Fasting: 122 mg/dL"
- Parse the normal range "(70-110 mg/dL)"
- Identify the elevated status

✅ **Apply Indian Standards**:
- Use ICMR glucose standards (70-110 mg/dL)
- Calculate population percentile
- Provide Indian population context

✅ **Advanced Pattern Recognition**:
- Clean and normalize text format
- Enhance medical terminology
- Structure unformatted data

✅ **Comprehensive Analysis**:
- Generate health score based on extracted values
- Provide Indian dietary recommendations
- Apply population-specific risk factors

### 3. Sample Expected Response

```json
{
  "success": true,
  "analysis": {
    "overallAssessment": {
      "healthScore": 72,
      "status": "fair",
      "summary": "Glucose levels elevated above Indian population standards, indicating prediabetic range requiring intervention."
    },
    "extractedData": {
      "labValues": [
        {
          "parameter": "Glucose Fasting",
          "value": 122,
          "unit": "mg/dL",
          "normalRange": "70-110",
          "status": "abnormal",
          "flagged": true
        }
      ]
    }
  },
  "parsingMetadata": {
    "method": "structured",
    "confidence": 0.85,
    "quality": 0.90
  },
  "traceability": [
    {
      "claim": "Text extraction and parsing",
      "source": "Advanced PDF parser with OCR fallback",
      "confidence": 0.85,
      "database": "ModelID"
    }
  ],
  "indianContext": {
    "standardsApplied": 1,
    "populationSpecificInsights": true,
    "diseasePrevalenceContext": true
  },
  "extractedValues": [
    "Glucose Fasting: 122 mg/dL (abnormal)"
  ]
}
```

### 4. PDF Testing

For actual PDF files:
1. The system will use `pdf-parse` library for text extraction
2. If PDF parsing fails, it falls back to OCR using Tesseract.js
3. For Apollo Diagnostics PDFs, it will apply specific recognition patterns

### 5. Image Testing

For scanned documents:
1. Direct OCR extraction with Tesseract.js
2. Medical document optimization settings
3. Progress tracking during OCR processing

### 6. Validation Steps

1. **Start the server**: `npm run dev`
2. **Upload your Apollo Diagnostics PDF**
3. **Check console logs** for extraction progress:
   ```
   📄 Starting advanced extraction from application/pdf file
   🔍 PDF file detected - using advanced PDF parser...
   ✅ PDF parsing successful - extracted 1247 characters
   🔬 Enhancing medical text with pattern recognition...
   ```
4. **Verify extracted values** in the response
5. **Confirm Indian standards application**

## Troubleshooting

### If PDF extraction still fails:
1. Check console logs for specific error messages
2. Try with a different PDF viewer export
3. Convert PDF to image and test OCR extraction
4. Use the intelligent fallback system

### Common Issues:
- **Password-protected PDFs**: Not supported
- **Image-only PDFs**: Will trigger OCR automatically  
- **Poor quality scans**: May need manual value entry
- **Non-English text**: OCR configured for English only

The new implementation provides multiple fallback layers to ensure medical data extraction succeeds even with challenging document formats!
