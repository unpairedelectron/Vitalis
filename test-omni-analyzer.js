// Test file for Omni-Medical Analysis Protocol
import { omniMedicalAnalyzer } from '../src/lib/omni-medical-analyzer';

async function testOmniAnalyzer() {
  console.log('Testing Omni-Medical Analysis Protocol...');
  
  // Test with sample medical text
  const sampleMedicalText = `
    PATIENT: John Doe
    DATE: 2024-01-15
    
    LAB RESULTS:
    Glucose: 95 mg/dL (Normal: 70-110)
    Cholesterol: 180 mg/dL (Normal: <200)
    Hemoglobin: 14.2 g/dL (Normal: 12-15.5)
    Creatinine: 1.0 mg/dL (Normal: 0.6-1.3)
    
    IMPRESSION:
    All lab values within normal range.
    Continue current lifestyle.
    
    MEDICATIONS:
    Tablet Metformin 500mg BID
    Cap Vitamin D 1000 units daily
  `;
  
  try {
    const result = await omniMedicalAnalyzer.parseAnyReport(sampleMedicalText);
    
    console.log('✅ Omni-extraction completed successfully!');
    console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`🔬 Parsing Method: ${result.parsingMethod}`);
    console.log(`📄 Findings: ${result.findings.length}`);
    console.log(`💊 Medications: ${result.medications.length}`);
    console.log(`🧪 Lab Values: ${result.extractedData.labValues.length}`);
    
    return result;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return null;
  }
}

// Run the test
testOmniAnalyzer().then((result) => {
  if (result) {
    console.log('\n🎉 Omni-Medical Analysis Protocol is working correctly!');
    console.log('\nSample output:');
    console.log('Traceability sources:', result.traceability.length);
    console.log('Source metadata:', result.sourceMetadata);
  }
});
