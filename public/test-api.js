// Simple test to verify Omni-Medical Analysis API
const testMedicalAnalysis = async () => {
  console.log('🔬 Testing Omni-Medical Analysis API endpoint...');
  
  // Create a simple test file
  const testData = `
APOLLO DIAGNOSTICS
Medical Report

PATIENT: Test Patient
DATE: July 29, 2025

LAB RESULTS:
Glucose: 95 mg/dL (70-110) Normal
Cholesterol: 180 mg/dL (<200) Normal
Hemoglobin: 14.2 g/dL (12-15.5) Normal

IMPRESSION: All values normal
`;

  try {
    const formData = new FormData();
    const blob = new Blob([testData], { type: 'text/plain' });
    formData.append('file', blob, 'test-report.txt');

    console.log('📡 Sending request to API...');
    const response = await fetch('/api/medical/analyze-report', {
      method: 'POST',
      body: formData
    });

    console.log('📊 Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ API Response successful!');
      console.log('📋 Success:', result.success);
      console.log('📊 Extracted data available:', !!result.extractedData);
      console.log('🧬 Analysis available:', !!result.analysis);
      
      if (result.extractedData && result.extractedData.labValues) {
        console.log('🧪 Lab values extracted:', result.extractedData.labValues.length);
      }
      
      return result;
    } else {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      return null;
    }
  } catch (error) {
    console.error('💥 Test failed:', error);
    return null;
  }
};

// Export for browser console testing
if (typeof window !== 'undefined') {
  window.testMedicalAnalysis = testMedicalAnalysis;
  console.log('🌐 Test function available as window.testMedicalAnalysis()');
}
