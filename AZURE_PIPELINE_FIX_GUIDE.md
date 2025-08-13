# Azure DevOps Pipeline Setup Guide - Fix Service Connection Issue

## 🚨 **ISSUE**: Service Connection Not Found
The pipeline is looking for a service connection that doesn't exist yet.

## 🔧 **SOLUTION**: Create Service Connection First

### **Step 1: Create Azure Service Connection**

1. **Go to Azure DevOps Project Settings:**
   - Click on **Project Settings** (bottom left)
   - Select **Service connections**

2. **Create New Service Connection:**
   - Click **"Create service connection"**
   - Select **"Azure Resource Manager"**
   - Choose **"Service principal (automatic)"**

3. **Configure the Connection:**
   - **Scope**: Subscription
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Select the resource group with your web app
   - **Service connection name**: `vitalis-azure-connection`
   - Check **"Grant access permission to all pipelines"**
   - Click **Save**

### **Step 2: Update Pipeline Variables**

Update these variables in your `azure-pipelines.yml`:

```yaml
variables:
  nodeVersion: '18.x'
  buildConfiguration: 'production'
  azureServiceConnection: 'vitalis-azure-connection'  # ← Name from Step 1
  webAppName: 'your-actual-web-app-name'              # ← Your Azure Web App name
```

### **Step 3: Create Environment**

1. **Go to Pipelines → Environments**
2. **Create new environment:**
   - Name: `production`
   - Description: `Vitalis production environment`
   - Click **Create**

### **Step 4: Get Your Web App Name**

1. **Go to Azure Portal**
2. **Find your App Service**
3. **Copy the exact name** (e.g., `vitalis-health-app-2024`)

## 🎯 **Quick Fix Options:**

### **Option A: Use Variables (Recommended)**
```yaml
azureServiceConnection: '$(azureServiceConnection)'
webAppName: '$(webAppName)'
```

### **Option B: Direct Names (If you know them)**
```yaml
azureServiceConnection: 'vitalis-azure-connection'
webAppName: 'vitalis-health-app'
```

## ✅ **After Creating Service Connection:**

1. **Update the pipeline file** with correct names
2. **Commit and push** the changes
3. **Run the pipeline** - it should work now!

## 🚀 **Alternative: Simplified Pipeline**

If you're still having issues, you can also use the Azure Portal deployment:

1. Go to your **Azure App Service**
2. Click **Deployment Center**
3. Select **Azure DevOps**
4. It will auto-generate the service connection and pipeline!
