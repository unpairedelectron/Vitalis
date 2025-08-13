#!/usr/bin/env powershell

# Azure App Service Deployment Script for Vitalis
Write-Host "🚀 Starting Azure App Service Deployment for Vitalis" -ForegroundColor Green

# Configuration
$resourceGroupName = "vitalis-rg"
$appServicePlanName = "vitalis-plan"
$webAppName = "vitalis-health-app"
$location = "East US"
$sku = "B1"  # Basic tier

try {
    # Login to Azure (if not already logged in)
    Write-Host "🔐 Checking Azure login status..." -ForegroundColor Blue
    az account show 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Please login to Azure..." -ForegroundColor Yellow
        az login
    }

    # Create Resource Group
    Write-Host "📦 Creating Resource Group: $resourceGroupName" -ForegroundColor Blue
    az group create --name $resourceGroupName --location $location

    # Create App Service Plan
    Write-Host "🏗️ Creating App Service Plan: $appServicePlanName" -ForegroundColor Blue
    az appservice plan create --name $appServicePlanName --resource-group $resourceGroupName --sku $sku --is-linux

    # Create Web App
    Write-Host "🌐 Creating Web App: $webAppName" -ForegroundColor Blue
    az webapp create --resource-group $resourceGroupName --plan $appServicePlanName --name $webAppName --runtime "NODE:18-lts"

    # Configure App Settings
    Write-Host "⚙️ Configuring App Settings..." -ForegroundColor Blue
    az webapp config appsettings set --resource-group $resourceGroupName --name $webAppName --settings `
        WEBSITE_NODE_DEFAULT_VERSION="18.17.0" `
        NODE_ENV="production" `
        NPM_CONFIG_PRODUCTION="false" `
        NEXT_TELEMETRY_DISABLED="1" `
        PORT="8080"

    # Configure startup command
    Write-Host "🚀 Configuring startup command..." -ForegroundColor Blue
    az webapp config set --resource-group $resourceGroupName --name $webAppName --startup-file "npm run deploy:azure"

    # Build and deploy
    Write-Host "🔨 Building application..." -ForegroundColor Blue
    npm install
    npm run build

    # Create deployment package
    Write-Host "📦 Creating deployment package..." -ForegroundColor Blue
    if (Test-Path "deploy.zip") { Remove-Item "deploy.zip" }
    
    # Create zip package excluding unnecessary files
    $excludeItems = @(".git", "node_modules", ".next", "*.log", "*.md", ".env.local")
    Compress-Archive -Path * -DestinationPath deploy.zip -CompressionLevel Optimal

    # Deploy to Azure
    Write-Host "🚀 Deploying to Azure App Service..." -ForegroundColor Blue
    az webapp deployment source config-zip --resource-group $resourceGroupName --name $webAppName --src deploy.zip

    # Get the app URL
    $appUrl = az webapp show --resource-group $resourceGroupName --name $webAppName --query defaultHostName --output tsv
    
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🌍 Your app is available at: https://$appUrl" -ForegroundColor Cyan
    Write-Host "📊 Monitor logs: az webapp log tail --resource-group $resourceGroupName --name $webAppName" -ForegroundColor Yellow

} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    exit 1
}
