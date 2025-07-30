// Test OpenAI API connection for Vitalis
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

loadEnvFile();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAIConnection() {
  console.log('🏥 Testing Vitalis OpenAI Connection...');
  console.log('=====================================');
  
  try {
    console.log('🔑 API Key:', process.env.OPENAI_API_KEY ? 'Loaded ✅' : 'Missing ❌');
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    console.log('\n🤖 Testing AI Health Analysis...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Vitalis AI, a medical-grade health analysis assistant. Provide brief, professional health insights."
        },
        {
          role: "user",
          content: "Analyze this health data: Heart rate 75 bpm, Sleep 7.5 hours, Steps 8,500. Provide a brief health insight."
        }
      ],
      max_tokens: 150,
      temperature: 0.3
    });

    console.log('\n✅ OpenAI API Connection Successful!');
    console.log('\n🔬 Sample Health Insight:');
    console.log('========================');
    console.log(response.choices[0].message.content);
    
    console.log('\n📊 API Usage:');
    console.log(`   • Tokens used: ${response.usage.total_tokens}`);
    console.log(`   • Model: ${response.model}`);
    
    console.log('\n🎉 Vitalis AI is ready for health analysis!');
    
  } catch (error) {
    console.error('\n❌ OpenAI Connection Failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'invalid_api_key') {
      console.log('\n🔧 Fix: Check your OpenAI API key in .env.local');
    } else if (error.code === 'insufficient_quota') {
      console.log('\n💳 Fix: Add billing info to your OpenAI account');
    }
  }
}

testOpenAIConnection();
