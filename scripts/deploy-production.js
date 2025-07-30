#!/usr/bin/env node
// Production deployment script for Vitalis Health Platform

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Vitalis Health Platform - Production Deployment');
console.log('================================================\n');

const runCommand = (command, description) => {
  console.log(`📋 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
};

const checkEnvironment = () => {
  console.log('🔍 Checking production environment...');
  
  const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'NEXTAUTH_SECRET',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS',
    'OPENAI_API_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease set these variables in your .env.local file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated\n');
};

const validateDatabase = async () => {
  console.log('🗄️ Validating database connection...');
  
  try {
    runCommand('npx prisma db push --accept-data-loss', 'Database schema push');
    runCommand('npx prisma generate', 'Prisma client generation');
    console.log('✅ Database validated and ready\n');
  } catch (error) {
    console.error('❌ Database validation failed:', error.message);
    process.exit(1);
  }
};

const buildApplication = () => {
  console.log('🏗️ Building production application...');
  
  // Clean previous builds
  runCommand('rm -rf .next', 'Cleaning previous build');
  
  // Run type checking
  runCommand('npm run type-check', 'TypeScript type checking');
  
  // Run linting
  runCommand('npm run lint', 'Code linting');
  
  // Build the application
  runCommand('npm run build', 'Next.js production build');
  
  console.log('✅ Application built successfully\n');
};

const setupHealthChecks = () => {
  console.log('🩺 Setting up health checks...');
  
  const healthCheckContent = `import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    // Check database connection
    const db = getDatabase();
    await db.$queryRaw\`SELECT 1\`;
    
    // Check environment
    const envCheck = {
      database: !!process.env.DATABASE_URL,
      jwt: !!process.env.JWT_SECRET,
      smtp: !!process.env.SMTP_HOST,
      ai: !!process.env.OPENAI_API_KEY,
    };
    
    const allChecksPass = Object.values(envCheck).every(check => check);
    
    if (!allChecksPass) {
      return NextResponse.json(
        { 
          status: 'unhealthy', 
          checks: envCheck,
          timestamp: new Date().toISOString() 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json({
      status: 'healthy',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      timestamp: new Date().toISOString(),
      checks: envCheck
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: error.message,
        timestamp: new Date().toISOString() 
      },
      { status: 503 }
    );
  }
}`;
  
  const healthCheckDir = path.join(process.cwd(), 'src', 'app', 'api', 'health-check');
  if (!fs.existsSync(healthCheckDir)) {
    fs.mkdirSync(healthCheckDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(healthCheckDir, 'route.ts'),
    healthCheckContent
  );
  
  console.log('✅ Health checks configured\n');
};

const generateDockerfile = () => {
  console.log('🐳 Generating Dockerfile...');
  
  const dockerfileContent = `# Vitalis Health Platform - Production Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]`;

  fs.writeFileSync(path.join(process.cwd(), 'Dockerfile'), dockerfileContent);
  
  console.log('✅ Dockerfile generated\n');
};

const generateDockerCompose = () => {
  console.log('🐳 Generating docker-compose.yml...');
  
  const dockerComposeContent = `version: '3.8'

services:
  vitalis-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://vitalis:vitalis_password@db:5432/vitalis_db
      - JWT_SECRET=\${JWT_SECRET}
      - NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - SMTP_HOST=\${SMTP_HOST}
      - SMTP_USER=\${SMTP_USER}
      - SMTP_PASS=\${SMTP_PASS}
    depends_on:
      - db
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health-check"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=vitalis_db
      - POSTGRES_USER=vitalis
      - POSTGRES_PASSWORD=vitalis_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U vitalis -d vitalis_db"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - vitalis-app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:`;

  fs.writeFileSync(path.join(process.cwd(), 'docker-compose.yml'), dockerComposeContent);
  
  console.log('✅ Docker Compose configuration generated\n');
};

const generateNginxConfig = () => {
  console.log('🌐 Generating nginx configuration...');
  
  const nginxContent = `events {
    worker_connections 1024;
}

http {
    upstream vitalis_app {
        server vitalis-app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=auth:10m rate=5r/s;

    server {
        listen 80;
        server_name vitalis.health www.vitalis.health;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name vitalis.health www.vitalis.health;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/vitalis.crt;
        ssl_certificate_key /etc/nginx/ssl/vitalis.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        ssl_prefer_server_ciphers off;

        # Security Headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
        add_header Referrer-Policy "strict-origin-when-cross-origin";

        # Health check endpoint (no rate limiting)
        location /api/health-check {
            proxy_pass http://vitalis_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # API rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://vitalis_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Auth endpoints (stricter rate limiting)
        location /api/auth/ {
            limit_req zone=auth burst=10 nodelay;
            proxy_pass http://vitalis_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Main application
        location / {
            proxy_pass http://vitalis_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static files caching
        location /_next/static/ {
            proxy_pass http://vitalis_app;
            add_header Cache-Control "public, immutable, max-age=31536000";
        }
    }
}`;

  fs.writeFileSync(path.join(process.cwd(), 'nginx.conf'), nginxContent);
  
  console.log('✅ Nginx configuration generated\n');
};

const generateDeploymentScript = () => {
  console.log('📋 Generating deployment script...');
  
  const deployScript = `#!/bin/bash
# Vitalis Health Platform - Deployment Script

set -e

echo "🚀 Deploying Vitalis Health Platform..."

# Pull latest code
git pull origin main

# Build and deploy with Docker
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check health
curl -f http://localhost/api/health-check || {
    echo "❌ Health check failed"
    docker-compose logs vitalis-app
    exit 1
}

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running at https://vitalis.health"`;

  fs.writeFileSync(path.join(process.cwd(), 'deploy.sh'), deployScript);
  
  // Make script executable
  try {
    execSync('chmod +x deploy.sh');
  } catch (error) {
    // Windows doesn't support chmod, but that's okay
  }
  
  console.log('✅ Deployment script generated\n');
};

// Main deployment process
async function deploy() {
  try {
    console.log('Starting production deployment process...\n');
    
    // Step 1: Environment validation
    checkEnvironment();
    
    // Step 2: Database setup
    await validateDatabase();
    
    // Step 3: Build application
    buildApplication();
    
    // Step 4: Setup monitoring
    setupHealthChecks();
    
    // Step 5: Generate Docker files
    generateDockerfile();
    generateDockerCompose();
    generateNginxConfig();
    generateDeploymentScript();
    
    console.log('🎉 Production deployment preparation completed!\n');
    console.log('📋 Next steps:');
    console.log('   1. Review the generated configuration files');
    console.log('   2. Update SSL certificates in ./ssl/ directory');
    console.log('   3. Set production environment variables');
    console.log('   4. Run: docker-compose up -d');
    console.log('   5. Monitor: docker-compose logs -f vitalis-app\n');
    
    console.log('🔗 Important URLs:');
    console.log('   • Application: https://vitalis.health');
    console.log('   • Health Check: https://vitalis.health/api/health-check');
    console.log('   • Admin Dashboard: https://vitalis.health/dashboard\n');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment if this script is executed directly
if (require.main === module) {
  deploy();
}
