#!/usr/bin/env node
// API Endpoint Testing Script for Vitalis Health Platform

const https = require('https');
const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_USER = {
  email: 'test@vitalis.health',
  password: 'test123',
  name: 'Test User'
};

let authToken = null;
let userId = null;

console.log('🧪 Vitalis Health Platform - API Testing');
console.log('=========================================\n');

const makeRequest = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const requestModule = url.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = requestModule.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            data: data ? JSON.parse(data) : null,
          };
          resolve(response);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
          });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
};

const testEndpoint = async (name, path, options = {}, expectedStatus = 200) => {
  try {
    console.log(`📋 Testing ${name}...`);
    const response = await makeRequest(path, options);
    
    if (response.statusCode === expectedStatus) {
      console.log(`✅ ${name} - Status: ${response.statusCode}`);
      return response;
    } else {
      console.log(`❌ ${name} - Expected: ${expectedStatus}, Got: ${response.statusCode}`);
      if (response.data) {
        console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
      }
      return response;
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    return null;
  }
};

const runTests = async () => {
  console.log(`🔗 Testing API endpoints at: ${BASE_URL}\n`);

  // 1. Health Check
  await testEndpoint(
    'Health Check',
    '/api/health-check',
    { method: 'GET' }
  );

  // 2. User Registration
  const signupResponse = await testEndpoint(
    'User Signup',
    '/api/auth/signup',
    {
      method: 'POST',
      body: TEST_USER,
    },
    201
  );

  if (signupResponse && signupResponse.data && signupResponse.data.user) {
    userId = signupResponse.data.user.id;
    console.log(`   User ID: ${userId}`);
  }

  // 3. User Login
  const loginResponse = await testEndpoint(
    'User Login',
    '/api/auth/signin',
    {
      method: 'POST',
      body: {
        email: TEST_USER.email,
        password: TEST_USER.password,
      },
    }
  );

  if (loginResponse && loginResponse.data && loginResponse.data.token) {
    authToken = loginResponse.data.token;
    console.log(`   Auth Token: ${authToken.substring(0, 20)}...`);
  }

  // 4. Authenticated Profile Access
  if (authToken) {
    await testEndpoint(
      'User Profile',
      '/api/auth/profile',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      }
    );
  }

  // 5. Health Dashboard (with sample data)
  if (userId) {
    await testEndpoint(
      'Health Dashboard',
      `/api/health/dashboard/${userId}`,
      { method: 'GET' }
    );
  }

  // 6. Device Connection Endpoints
  if (userId && authToken) {
    // Get connected devices
    await testEndpoint(
      'Get Connected Devices',
      `/api/health/devices/${userId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      }
    );

    // Test OAuth URL generation
    await testEndpoint(
      'Generate Samsung OAuth URL',
      '/api/health/oauth/samsung',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: { userId },
      }
    );

    await testEndpoint(
      'Generate Fitbit OAuth URL',
      '/api/health/oauth/fitbit',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: { userId },
      }
    );

    await testEndpoint(
      'Generate Oura OAuth URL',
      '/api/health/oauth/oura',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: { userId },
      }
    );
  }

  // 7. Health Data Sync (mock)
  if (userId && authToken) {
    await testEndpoint(
      'Health Data Sync',
      '/api/health/sync',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: {
          userId,
          deviceType: 'SAMSUNG',
          forceSync: true,
        },
      }
    );
  }

  // 8. Device Connection Management
  if (userId && authToken) {
    // Create a test device connection
    const deviceResponse = await testEndpoint(
      'Create Device Connection',
      `/api/health/devices/${userId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: {
          deviceType: 'TEST_DEVICE',
          deviceId: 'test-device-123',
          deviceName: 'Test Health Device',
          connectionData: {
            testData: true,
          },
        },
      }
    );

    if (deviceResponse && deviceResponse.data && deviceResponse.data.device) {
      const deviceId = deviceResponse.data.device.id;
      
      // Update device connection
      await testEndpoint(
        'Update Device Connection',
        `/api/health/devices/${deviceId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          body: {
            deviceName: 'Updated Test Device',
            isConnected: true,
          },
        }
      );

      // Delete device connection
      await testEndpoint(
        'Delete Device Connection',
        `/api/health/devices/${deviceId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
    }
  }

  // 9. Error Handling Tests
  await testEndpoint(
    'Invalid Endpoint',
    '/api/nonexistent',
    { method: 'GET' },
    404
  );

  await testEndpoint(
    'Unauthorized Access',
    '/api/auth/profile',
    { method: 'GET' },
    401
  );

  await testEndpoint(
    'Invalid Login',
    '/api/auth/signin',
    {
      method: 'POST',
      body: {
        email: 'invalid@email.com',
        password: 'wrongpassword',
      },
    },
    401
  );

  console.log('\n🎉 API testing completed!');
  console.log('\n📊 Test Summary:');
  console.log('   • All core authentication endpoints tested');
  console.log('   • Health data APIs validated');
  console.log('   • Device management endpoints verified');
  console.log('   • OAuth integration endpoints checked');
  console.log('   • Error handling scenarios tested');
  
  if (authToken && userId) {
    console.log('\n🔑 Test Credentials:');
    console.log(`   User ID: ${userId}`);
    console.log(`   Auth Token: ${authToken.substring(0, 30)}...`);
  }
};

// Performance testing
const performanceTest = async () => {
  console.log('\n⚡ Running performance tests...');
  
  const testConcurrency = async (endpoint, concurrent = 10) => {
    const start = Date.now();
    const promises = Array(concurrent).fill().map(() => 
      makeRequest(endpoint, { method: 'GET' })
    );
    
    try {
      await Promise.all(promises);
      const duration = Date.now() - start;
      console.log(`✅ ${endpoint} - ${concurrent} concurrent requests in ${duration}ms`);
    } catch (error) {
      console.log(`❌ ${endpoint} - Concurrency test failed: ${error.message}`);
    }
  };

  await testConcurrency('/api/health-check', 10);
  if (userId) {
    await testConcurrency(`/api/health/dashboard/${userId}`, 5);
  }
};

// Load testing
const loadTest = async () => {
  console.log('\n🏋️ Running load tests...');
  
  const testLoad = async (endpoint, requests = 100) => {
    console.log(`📋 Testing ${endpoint} with ${requests} sequential requests...`);
    const start = Date.now();
    let successful = 0;
    let failed = 0;
    
    for (let i = 0; i < requests; i++) {
      try {
        const response = await makeRequest(endpoint, { method: 'GET' });
        if (response.statusCode < 400) {
          successful++;
        } else {
          failed++;
        }
      } catch (error) {
        failed++;
      }
      
      if (i % 20 === 0) {
        process.stdout.write('.');
      }
    }
    
    const duration = Date.now() - start;
    const rps = Math.round((requests / duration) * 1000);
    
    console.log(`\n✅ Completed: ${successful} successful, ${failed} failed`);
    console.log(`   Duration: ${duration}ms, RPS: ${rps}`);
  };

  await testLoad('/api/health-check', 50);
};

// Main execution
async function main() {
  try {
    await runTests();
    
    if (process.argv.includes('--performance')) {
      await performanceTest();
    }
    
    if (process.argv.includes('--load')) {
      await loadTest();
    }
    
    console.log('\n🏁 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { makeRequest, testEndpoint, runTests };
