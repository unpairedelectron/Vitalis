# Vitalis API Testing Script
# PowerShell script to test Vitalis health platform endpoints

Write-Host "🏥 Vitalis API Testing Suite" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"
$headers = @{"Content-Type" = "application/json"}

# Test 1: Health Dashboard (Demo User)
Write-Host "`n🔍 Testing Health Dashboard API..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/health/dashboard/demo-user" -Method GET -Headers $headers
    Write-Host "✅ Health Dashboard API working!" -ForegroundColor Green
    Write-Host "   Found $($response.healthMetrics.Count) health metrics" -ForegroundColor Gray
} catch {
    Write-Host "❌ Health Dashboard API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Samsung OAuth URL Generation
Write-Host "`n🔗 Testing Samsung OAuth URL generation..." -ForegroundColor Yellow

$oauthBody = @{
    userId = "demo-user"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/health/oauth/samsung" -Method POST -Headers $headers -Body $oauthBody
    Write-Host "✅ Samsung OAuth URL generation working!" -ForegroundColor Green
    Write-Host "   Auth URL: $($response.authUrl.Substring(0, 50))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Samsung OAuth failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Device List
Write-Host "`n📱 Testing Device List API..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/health/devices/demo-user" -Method GET -Headers $headers
    Write-Host "✅ Device List API working!" -ForegroundColor Green
    Write-Host "   Found $($response.devices.Count) connected devices" -ForegroundColor Gray
} catch {
    Write-Host "❌ Device List API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Health Data Sync
Write-Host "`n🔄 Testing Health Data Sync..." -ForegroundColor Yellow

$syncBody = @{
    userId = "demo-user"
    deviceType = "SAMSUNG"
    forceSync = $true
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/health/sync" -Method POST -Headers $headers -Body $syncBody
    Write-Host "✅ Health Data Sync working!" -ForegroundColor Green
    Write-Host "   Message: $($response.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Health Data Sync failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Medical Analysis
Write-Host "`n🧠 Testing Medical Analysis..." -ForegroundColor Yellow

$analysisBody = @{
    text = "Patient shows normal blood glucose levels at 95 mg/dL. Blood pressure 120/80 mmHg."
    reportType = "blood_test"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/medical/analyze" -Method POST -Headers $headers -Body $analysisBody
    Write-Host "✅ Medical Analysis working!" -ForegroundColor Green
    Write-Host "   Confidence: $($response.confidence)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Medical Analysis failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: User Authentication
Write-Host "`n🔐 Testing User Authentication..." -ForegroundColor Yellow

$authBody = @{
    email = "demo@vitalis.ai"
    password = "demo123456"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/signin" -Method POST -Headers $headers -Body $authBody
    Write-Host "✅ User Authentication working!" -ForegroundColor Green
    Write-Host "   User: $($response.user.email)" -ForegroundColor Gray
    
    # Store token for authenticated requests
    $authToken = $response.token
    $headers["Authorization"] = "Bearer $authToken"
    
} catch {
    Write-Host "❌ User Authentication failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host "Check the results above to see which endpoints are working." -ForegroundColor Gray
Write-Host "If all tests pass, your Vitalis backend is ready for production! 🚀" -ForegroundColor Green
