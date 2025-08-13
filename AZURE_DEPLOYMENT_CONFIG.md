# Azure App Service Configuration Guide

## Required Application Settings

Add these in Azure Portal → App Service → Configuration → Application Settings:

```
WEBSITE_NODE_DEFAULT_VERSION=18-lts
NPM_CONFIG_PRODUCTION=false
SCM_DO_BUILD_DURING_DEPLOYMENT=true
WEBSITE_RUN_FROM_PACKAGE=1
```

## Environment Variables for Vitalis:
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-app-name.azurewebsites.net
```

## Startup Command (if needed):
```
npm start
```

## Build Command (Azure handles automatically):
```
npm install && npm run build
```
