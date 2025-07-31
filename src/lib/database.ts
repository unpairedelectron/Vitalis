// Database client configuration for Vitalis
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Health Data Encryption Utilities
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.HEALTH_DATA_ENCRYPTION_KEY || 'default-key-change-in-production';
const ALGORITHM = 'aes-256-gcm';

export class HealthDataEncryption {
  static encrypt(text: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();
      
      return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt health data');
    }
  }

  static decrypt(encryptedData: string): string {
    try {
      const parts = encryptedData.split(':');
      if (parts.length !== 3) {
        throw new Error('Invalid encrypted data format');
      }

      const iv = Buffer.from(parts[0], 'hex');
      const authTag = Buffer.from(parts[1], 'hex');
      const encrypted = parts[2];

      const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt health data');
    }
  }
}

// Database Helper Functions
export class DatabaseHelpers {
  static getInstance: any;
  // User Management
  static async createUser(userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const hashedPassword = await import('bcryptjs').then(bcrypt => 
      bcrypt.hash(userData.password, parseInt(process.env.BCRYPT_ROUNDS || '12'))
    );

    return prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        preferences: {
          create: {
            // Default preferences
            emailNotifications: true,
            pushNotifications: true,
            theme: 'dark',
            units: 'metric'
          }
        }
      },
      include: {
        preferences: true
      }
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        preferences: true,
        sessions: {
          where: {
            expiresAt: { gt: new Date() },
            isRevoked: false
          }
        }
      }
    });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        preferences: true,
        deviceConnections: true,
        medicalHistory: true,
        emergencyContact: true
      }
    });
  }

  // Health Data Management
  static async storeHealthData(userId: string, healthData: {
    type: any;
    value: number;
    unit: string;
    timestamp: Date;
    source: string;
    confidence?: number;
    metadata?: any;
  }) {
    return prisma.healthData.create({
      data: {
        userId,
        type: healthData.type,
        value: healthData.value,
        unit: healthData.unit,
        timestamp: healthData.timestamp,
        source: healthData.source,
        confidence: healthData.confidence || 1.0,
        metadata: healthData.metadata
      }
    });
  }

  static async getHealthDataByType(
    userId: string, 
    type: any, 
    startDate: Date, 
    endDate: Date
  ) {
    return prisma.healthData.findMany({
      where: {
        userId,
        type,
        timestamp: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
  }

  static async getLatestHealthData(userId: string, type: any) {
    return prisma.healthData.findFirst({
      where: {
        userId,
        type
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
  }

  // Device Management
  static async connectDevice(userId: string, deviceData: {
    deviceType: any;
    deviceName: string;
    deviceId: string;
    manufacturer: string;
    model?: string;
    connectionType: string;
    dataTypes: string[];
  }) {
    return prisma.deviceConnection.upsert({
      where: {
        userId_deviceId: {
          userId,
          deviceId: deviceData.deviceId
        }
      },
      update: {
        isConnected: true,
        lastSyncAt: new Date(),
        updatedAt: new Date()
      },
      create: {
        userId,
        deviceType: deviceData.deviceType,
        deviceName: deviceData.deviceName,
        deviceId: deviceData.deviceId,
        manufacturer: deviceData.manufacturer,
        model: deviceData.model,
        connectionType: deviceData.connectionType,
        dataTypes: Array.isArray(deviceData.dataTypes) ? deviceData.dataTypes.join(',') : deviceData.dataTypes,
        isConnected: true,
        lastSyncAt: new Date()
      }
    });
  }

  // Session Management
  static async createSession(userId: string, sessionData: {
    token: string;
    refreshToken?: string;
    expiresAt: Date;
    userAgent?: string;
    ipAddress?: string;
  }) {
    return prisma.session.create({
      data: {
        userId,
        token: sessionData.token,
        refreshToken: sessionData.refreshToken,
        expiresAt: sessionData.expiresAt,
        userAgent: sessionData.userAgent,
        ipAddress: sessionData.ipAddress
      }
    });
  }

  static async getValidSession(token: string) {
    return prisma.session.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
        isRevoked: false
      },
      include: {
        user: {
          include: {
            preferences: true
          }
        }
      }
    });
  }

  static async revokeSession(sessionId: string) {
    return prisma.session.update({
      where: { id: sessionId },
      data: { isRevoked: true }
    });
  }

  static async revokeAllUserSessions(userId: string) {
    return prisma.session.updateMany({
      where: { userId },
      data: { isRevoked: true }
    });
  }

  // Medical Report Management
  static async storeMedicalReport(userId: string, reportData: {
    title: string;
    reportType: any;
    uploadedFile?: string;
    extractedData: any;
    analysisResult: any;
    reportDate?: Date;
    provider?: string;
    doctorName?: string;
    confidence?: number;
  }) {
    return prisma.medicalReport.create({
      data: {
        userId,
        title: reportData.title,
        reportType: reportData.reportType,
        uploadedFile: reportData.uploadedFile,
        extractedData: reportData.extractedData,
        analysisResult: reportData.analysisResult,
        reportDate: reportData.reportDate,
        provider: reportData.provider,
        doctorName: reportData.doctorName,
        confidence: reportData.confidence || 0.0,
        status: 'COMPLETED'
      }
    });
  }

  // Health Insights Management
  static async storeHealthInsight(userId: string, insightData: {
    type: any;
    priority: any;
    title: string;
    description: string;
    recommendations: string[];
    confidence: number;
    sourceDataIds: string[];
  }) {
    return prisma.healthInsight.create({
      data: {
        userId,
        type: insightData.type,
        priority: insightData.priority,
        title: insightData.title,
        description: insightData.description,
        recommendations: Array.isArray(insightData.recommendations) ? insightData.recommendations.join('|') : insightData.recommendations,
        confidence: insightData.confidence,
        sourceDataIds: Array.isArray(insightData.sourceDataIds) ? insightData.sourceDataIds.join(',') : insightData.sourceDataIds
      }
    });
  }

  static async getUserInsights(userId: string, limit: number = 10) {
    return prisma.healthInsight.findMany({
      where: { userId },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });
  }
}

export default prisma;
