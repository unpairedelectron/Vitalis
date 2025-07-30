// Test script to isolate the fetch issue
console.log('Testing fetch to dashboard API...');

const testFetch = async () => {
  try {
    console.log('Starting fetch request...');
    const startTime = Date.now();
    
    const response = await fetch('/api/health/dashboard/demo-user-001');
    const fetchTime = Date.now() - startTime;
    
    console.log(`Fetch completed in ${fetchTime}ms`);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Data received:', data);
      console.log('Data size:', JSON.stringify(data).length, 'characters');
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Run the test when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testFetch);
} else {
  testFetch();
}
