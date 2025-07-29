# Vitalis: AI Health Guardian - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
Vitalis is a premium smartwatch wellness analytics app that aggregates data from Samsung Health, Apple Health, Fitbit, and Oura to generate military-grade health reports with AI-powered insights.

## Tech Stack
- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **Backend**: Node.js API routes with TypeScript
- **AI/ML**: OpenAI/Claude integration for health insights
- **Health APIs**: Samsung Health, Apple HealthKit, Google Fit, Fitbit, Oura Ring
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: WebSocket connections for live health monitoring
- **Mobile**: React Native for cross-platform mobile app

## Code Style Guidelines
- Use TypeScript strictly with proper type definitions
- Follow Next.js App Router patterns
- Implement clinical-grade error handling and validation
- Use Tailwind CSS for styling with health-focused color schemes
- Create reusable components inspired by Whoop and Levels UX
- Implement WHO/ACSM health guidelines in all calculations
- Use proper medical terminology and units

## Health Data Standards
- All health metrics must include confidence intervals
- Implement HIPAA/GDPR compliant data handling
- Use FDA-cleared validation methods where applicable
- Cross-reference data against WHO physical activity guidelines
- Implement proper data sanitization and anomaly detection

## UI/UX Principles
- Clinical precision with consumer-friendly presentation
- Real-time health dashboards with actionable insights
- Military-grade alert systems with appropriate urgency levels
- Accessible design for all users including those with disabilities
- Dark mode support for night-time health monitoring

## Security Requirements
- End-to-end encryption for all health data
- Secure API key management
- Proper authentication and authorization
- Data residency compliance
- Regular security audits and penetration testing
