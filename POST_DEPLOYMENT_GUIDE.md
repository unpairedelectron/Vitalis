# Post-Deployment Steps for Vitalis Health App

## 🎉 **After Pipeline Builds Successfully**

### **Step 1: Download Build Artifacts**
1. Go to **Azure DevOps** → **Pipelines** → **Your completed pipeline run**
2. Click on **"Artifacts"** tab
3. Download the **"vitalis-build"** ZIP file

### **Step 2: Deploy to Azure App Service**

#### **Option A: Azure Portal (Easiest)**
1. Go to **Azure Portal** → **Your App Service**
2. Click **"Deployment Center"**
3. Select **"Local Git"** or **"ZIP Deploy"**
4. Upload the downloaded ZIP file
5. Wait for deployment to complete

#### **Option B: Using Azure CLI**
```bash
# Install Azure CLI if not installed
# Then run:
az webapp deployment source config-zip \
  --resource-group YOUR_RESOURCE_GROUP \
  --name YOUR_WEB_APP_NAME \
  --src vitalis-app.zip
```

#### **Option C: VS Code Azure Extension**
1. Install **Azure App Service** extension in VS Code
2. Right-click your App Service
3. Select **"Deploy to Web App"**
4. Choose the ZIP file

### **Step 3: Configure App Service Settings**

Go to **Azure Portal** → **Your App Service** → **Configuration** → **Application Settings**

Add these settings:
```
WEBSITE_NODE_DEFAULT_VERSION = 18-lts
SCM_DO_BUILD_DURING_DEPLOYMENT = true
WEBSITE_RUN_FROM_PACKAGE = 1
NODE_ENV = production
NEXT_TELEMETRY_DISABLED = 1
```

### **Step 4: Set Runtime Stack**
1. Go to **Configuration** → **General Settings**
2. Set **Runtime stack**: `Node 18 LTS`
3. Set **Platform**: `64 Bit`
4. **Save** changes

### **Step 5: Restart App Service**
1. Go to **Overview** tab
2. Click **"Restart"**
3. Wait for restart to complete

## 🌐 **Step 6: Test Your Deployment**

### **A. Check App Service URL**
1. Go to **Overview** tab
2. Click on your **App Service URL** (e.g., https://vitalis-health-app.azurewebsites.net)
3. Your Vitalis app should load!

### **B. Test Key Features**
- ✅ Landing page loads
- ✅ Dashboard navigation works
- ✅ Health metrics display
- ✅ UX components render correctly

### **C. Check Logs (If Issues)**
1. Go to **Log Stream** in Azure Portal
2. Or **App Service Logs** → **File System**
3. Look for any errors

## 🚀 **Step 7: Optional Enhancements**

### **Custom Domain (Optional)**
1. Go to **Custom domains**
2. Add your domain (e.g., vitalis.yourdomain.com)
3. Configure DNS settings

### **SSL Certificate (Optional)**
1. Go to **TLS/SSL settings**
2. **Private Key Certificates**
3. Upload or create certificate

### **Monitoring (Recommended)**
1. Enable **Application Insights**
2. Set up **Alerts** for downtime
3. Configure **Performance monitoring**

## 🔄 **Future Deployments**

### **Option 1: Manual (Current Setup)**
- Run pipeline → Download ZIP → Upload to Azure

### **Option 2: Automatic (Add Later)**
- Add deployment stage back to pipeline
- Create service connection
- Automatic deployment on every commit

## 📊 **Success Indicators**

Your Vitalis app is successfully deployed when:
- ✅ **URL loads** without errors
- ✅ **Landing page** displays correctly
- ✅ **Dashboard** is accessible
- ✅ **Health analytics** components work
- ✅ **Mobile responsive** design functions

## 🐛 **Common Issues & Fixes**

### **Issue: App doesn't start**
- Check **Log Stream** for Node.js errors
- Verify **package.json** start script
- Ensure **Node 18** runtime is set

### **Issue: 404 errors**
- Check **web.config** exists in root
- Verify **Next.js** build completed
- Check **file paths** are correct

### **Issue: Slow loading**
- Enable **Application Insights**
- Check **Performance** metrics
- Optimize **image loading**

## 🎯 **Next Steps After Successful Deployment**

1. **Share your live URL** with stakeholders
2. **Test all features** thoroughly
3. **Monitor performance** and errors
4. **Set up automated backups**
5. **Plan for scaling** if needed

Your Vitalis Health App will be live and ready for users! 🌟
