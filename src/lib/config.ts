// Environment configuration for Vitalis
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || '',
    directUrl: process.env.DIRECT_URL || process.env.DATABASE_URL || ''
  },
  
  // Authentication
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    tokenExpiresIn: '7d',
    refreshTokenExpiresIn: '30d'
  },
  
  // AI Services
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || ''
  },
  
  // Health APIs
  healthApis: {
    samsung: {
      clientId: process.env.SAMSUNG_HEALTH_CLIENT_ID || '',
      clientSecret: process.env.SAMSUNG_HEALTH_CLIENT_SECRET || ''
    },
    fitbit: {
      clientId: process.env.FITBIT_CLIENT_ID || '',
      clientSecret: process.env.FITBIT_CLIENT_SECRET || ''
    },
    oura: {
      clientId: process.env.OURA_CLIENT_ID || '',
      clientSecret: process.env.OURA_CLIENT_SECRET || ''
    },
    googleFit: {
      clientId: process.env.GOOGLE_FIT_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_FIT_CLIENT_SECRET || ''
    }
  },
  
  // Security
  security: {
    encryptionKey: process.env.HEALTH_DATA_ENCRYPTION_KEY || 'default-encryption-key-change-in-production',
    aesKey: process.env.AES_ENCRYPTION_KEY || 'default-aes-key-change-this-too'
  },
  
  // Email
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  },
  
  // Redis (for caching and sessions)
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  
  // File Upload
  upload: {
    maxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760'), // 10MB
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'pdf,jpg,jpeg,png,dcm').split(',')
  },
  
  // Application
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000'),
    baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  }
};

// Validation function to check required environment variables
export function validateConfig() {
  const errors = [];
  
  if (!config.database.url) {
    errors.push('DATABASE_URL is required');
  }
  
  if (!config.ai.openaiApiKey && !config.ai.anthropicApiKey) {
    errors.push('Either OPENAI_API_KEY or ANTHROPIC_API_KEY is required for AI features');
  }
  
  if (config.app.nodeEnv === 'production') {
    if (config.auth.jwtSecret === 'default-jwt-secret-change-in-production') {
      errors.push('JWT_SECRET must be set in production');
    }
    
    if (config.security.encryptionKey === 'default-encryption-key-change-in-production') {
      errors.push('HEALTH_DATA_ENCRYPTION_KEY must be set in production');
    }
  }
  
  return errors;
}

// Initialize configuration check
if (typeof window === 'undefined') { // Server-side only
  const configErrors = validateConfig();
  if (configErrors.length > 0) {
    console.warn('⚠️  Configuration warnings:');
    configErrors.forEach(error => console.warn(`   • ${error}`));
  }
}
