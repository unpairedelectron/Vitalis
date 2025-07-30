#!/usr/bin/env node
// Database initialization script for Vitalis
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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
  console.log('✅ Loaded environment variables from .env.local');
} else {
  console.log('⚠️  No .env.local file found');
}

console.log('🏥 Vitalis Database Setup');
console.log('========================');

async function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📝 ${description}...`);
    
    exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('warn')) {
        console.error(`⚠️  Warning: ${stderr}`);
      }
      
      if (stdout) {
        console.log(stdout);
      }
      
      console.log(`✅ ${description} completed`);
      resolve();
    });
  });
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...\n');
    
    // Generate Prisma client
    await runCommand('npx prisma generate', 'Generating Prisma client');
    
    // Apply database migrations
    await runCommand('npx prisma db push', 'Applying database schema');
    
    // Optional: Seed the database with demo data
    console.log('\n🌱 Would you like to seed the database with demo data? (Recommended for development)');
    console.log('Note: This will create a demo user account and sample health data.');
    
    // For now, we'll skip interactive input and just log the instructions
    console.log('\n📋 Setup Instructions:');
    console.log('1. Copy .env.example to .env.local');
    console.log('2. Update DATABASE_URL with your PostgreSQL connection string');
    console.log('3. Set JWT_SECRET to a secure random string');
    console.log('4. Configure other environment variables as needed');
    console.log('5. Run: npm run dev');
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n🔗 Next steps:');
    console.log('   • Configure your .env.local file');
    console.log('   • Start the development server: npm run dev');
    console.log('   • Visit http://localhost:3000 to see Vitalis in action');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   • Ensure PostgreSQL is running');
    console.log('   • Check your DATABASE_URL in .env.local');
    console.log('   • Verify database permissions');
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
