#!/usr/bin/env node
// Database seeding script for Vitalis
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      process.env[key.trim()] = value.trim();
    }
  });
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Vitalis database...');
  
  try {
    // Create demo user
    const demoUserEmail = 'demo@vitalis.ai';
    const hashedPassword = await bcrypt.hash('demo123456', 12);
    
    console.log('👤 Creating demo user...');
    const demoUser = await prisma.user.upsert({
      where: { email: demoUserEmail },
      update: {},
      create: {
        email: demoUserEmail,
        password: hashedPassword,
        firstName: 'Demo',
        lastName: 'User',
        dateOfBirth: new Date('1995-01-15'),
        gender: 'MALE',
        height: 175,
        weight: 70,
        timezone: 'Asia/Kolkata',
        language: 'en',
        country: 'IN',
        preferences: {
          create: {
            emailNotifications: true,
            pushNotifications: true,
            theme: 'dark',
            units: 'metric'
          }
        },
        emergencyContact: {
          create: {
            name: 'Emergency Contact',
            relationship: 'Family',
            phoneNumber: '+91-9876543210',
            email: 'emergency@example.com',
            isPrimary: true
          }
        },
        medicalHistory: {
          create: [
            {
              condition: 'Hypertension',
              diagnosedAt: new Date('2020-03-15'),
              status: 'active',
              medications: 'Lisinopril 10mg',
              notes: 'Well controlled with medication'
            }
          ]
        }
      },
      include: {
        preferences: true,
        emergencyContact: true,
        medicalHistory: true
      }
    });
    
    console.log(`✅ Demo user created: ${demoUser.email}`);
    
    // Create sample health data
    console.log('📊 Creating sample health data...');
    
    const healthDataEntries = [];
    const now = new Date();
    
    // Generate heart rate data for the last 7 days
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour += 2) {
        const timestamp = new Date(now);
        timestamp.setDate(timestamp.getDate() - day);
        timestamp.setHours(hour, 0, 0, 0);
        
        let baseHeartRate = 65;
        // Simulate circadian rhythm
        if (hour >= 6 && hour <= 9) baseHeartRate = 75;
        else if (hour >= 12 && hour <= 14) baseHeartRate = 80;
        else if (hour >= 18 && hour <= 21) baseHeartRate = 85;
        
        const heartRate = baseHeartRate + Math.floor(Math.random() * 20) - 10;
        
        healthDataEntries.push({
          userId: demoUser.id,
          type: 'HEART_RATE',
          value: Math.max(45, Math.min(200, heartRate)),
          unit: 'bpm',
          timestamp,
          source: 'Demo Device',
          confidence: 0.95
        });
      }
    }
    
    // Generate sleep data
    for (let day = 0; day < 7; day++) {
      const sleepDate = new Date(now);
      sleepDate.setDate(sleepDate.getDate() - day);
      sleepDate.setHours(7, 0, 0, 0); // 7 AM wake up
      
      const sleepDuration = (7 + Math.random() * 2) * 60; // 7-9 hours in minutes
      
      healthDataEntries.push({
        userId: demoUser.id,
        type: 'SLEEP_DURATION',
        value: sleepDuration,
        unit: 'minutes',
        timestamp: sleepDate,
        source: 'Sleep Tracker',
        confidence: 0.90
      });
    }
    
    // Generate activity data (steps)
    for (let day = 0; day < 7; day++) {
      const activityDate = new Date(now);
      activityDate.setDate(activityDate.getDate() - day);
      activityDate.setHours(20, 0, 0, 0); // End of day summary
      
      const steps = Math.floor(6000 + Math.random() * 8000); // 6k-14k steps
      
      healthDataEntries.push({
        userId: demoUser.id,
        type: 'STEPS',
        value: steps,
        unit: 'count',
        timestamp: activityDate,
        source: 'Fitness Tracker',
        confidence: 0.98
      });
    }
    
    // Bulk insert health data
    await prisma.healthData.createMany({
      data: healthDataEntries,
      skipDuplicates: true
    });
    
    console.log(`✅ Created ${healthDataEntries.length} health data entries`);
    
    // Create sample device connections
    console.log('📱 Creating sample device connections...');
    
    const devices = [
      {
        userId: demoUser.id,
        deviceType: 'SMARTWATCH',
        deviceName: 'Samsung Galaxy Watch 6',
        deviceId: 'samsung-gw6-001',
        manufacturer: 'Samsung',
        model: 'Galaxy Watch 6',
        connectionType: 'BLE',
        dataTypes: ['HEART_RATE', 'STEPS', 'SLEEP_DURATION', 'BLOOD_OXYGEN'],
        isConnected: true,
        lastSyncAt: new Date()
      },
      {
        userId: demoUser.id,
        deviceType: 'FITNESS_BAND',
        deviceName: 'Fire-Boltt Ring 3',
        deviceId: 'fireboltt-ring3-001',
        manufacturer: 'Fire-Boltt',
        model: 'Ring 3',
        connectionType: 'BLE',
        dataTypes: ['HEART_RATE', 'STEPS', 'CALORIES_BURNED'],
        isConnected: true,
        lastSyncAt: new Date()
      }
    ];
    
    for (const device of devices) {
      await prisma.deviceConnection.upsert({
        where: {
          userId_deviceId: {
            userId: device.userId,
            deviceId: device.deviceId
          }
        },
        update: device,
        create: device
      });
    }
    
    console.log(`✅ Created ${devices.length} device connections`);
    
    // Create sample health insights
    console.log('🧠 Creating sample health insights...');
    
    const insights = [
      {
        userId: demoUser.id,
        type: 'RECOMMENDATION',
        priority: 'MEDIUM',
        title: 'Excellent Sleep Consistency',
        description: 'Your sleep schedule has been very consistent over the past week, averaging 7.8 hours per night.',
        recommendations: [
          'Continue maintaining this excellent sleep schedule',
          'Consider adding a wind-down routine 30 minutes before bed',
          'Keep your bedroom cool (18-20°C) for optimal sleep quality'
        ],
        confidence: 0.92,
        sourceDataIds: []
      },
      {
        userId: demoUser.id,
        type: 'WARNING',
        priority: 'HIGH',
        title: 'Heart Rate Variability Decline',
        description: 'Your heart rate variability has decreased by 12% this week, which may indicate increased stress or insufficient recovery.',
        recommendations: [
          'Consider stress reduction techniques like meditation',
          'Ensure adequate hydration throughout the day',
          'Evaluate your current workload and rest periods',
          'Consider consulting a healthcare provider if pattern continues'
        ],
        confidence: 0.85,
        sourceDataIds: []
      },
      {
        userId: demoUser.id,
        type: 'ACHIEVEMENT',
        priority: 'LOW',
        title: 'Step Goal Achieved',
        description: 'Congratulations! You\'ve exceeded your daily step goal of 8,000 steps for 5 consecutive days.',
        recommendations: [
          'Great job maintaining an active lifestyle!',
          'Consider gradually increasing your step goal',
          'Mix in different types of activities for variety'
        ],
        confidence: 1.0,
        sourceDataIds: []
      }
    ];
    
    for (const insight of insights) {
      await prisma.healthInsight.create({
        data: insight
      });
    }
    
    console.log(`✅ Created ${insights.length} health insights`);
    
    // Create sample medical report
    console.log('📋 Creating sample medical report...');
    
    const medicalReport = {
      userId: demoUser.id,
      title: 'Annual Health Checkup 2025',
      reportType: 'BLOOD_TEST',
      extractedData: {
        tests: [
          { name: 'Total Cholesterol', value: 185, unit: 'mg/dL', reference: '< 200' },
          { name: 'LDL Cholesterol', value: 110, unit: 'mg/dL', reference: '< 130' },
          { name: 'HDL Cholesterol', value: 45, unit: 'mg/dL', reference: '> 40' },
          { name: 'Triglycerides', value: 150, unit: 'mg/dL', reference: '< 150' },
          { name: 'Glucose (Fasting)', value: 92, unit: 'mg/dL', reference: '70-99' },
          { name: 'HbA1c', value: 5.4, unit: '%', reference: '< 5.7' }
        ]
      },
      analysisResult: {
        overallAssessment: {
          healthScore: 85,
          status: 'good',
          summary: 'Overall good health with minor areas for improvement'
        },
        keyFindings: [
          'Cholesterol levels within normal range',
          'Blood glucose well controlled',
          'HDL cholesterol could be higher'
        ]
      },
      reportDate: new Date('2025-01-15'),
      provider: 'Apollo Hospitals',
      doctorName: 'Dr. Priya Sharma',
      confidence: 0.95,
      status: 'COMPLETED'
    };
    
    await prisma.medicalReport.create({
      data: medicalReport
    });
    
    console.log('✅ Created sample medical report');
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Demo Account Details:');
    console.log(`   Email: ${demoUserEmail}`);
    console.log('   Password: demo123456');
    console.log('\n🔗 You can now:');
    console.log('   • Start the app: npm run dev');
    console.log('   • Sign in with the demo account');
    console.log('   • Explore the health dashboard with sample data');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
