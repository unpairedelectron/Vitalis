# Vitalis API Testing Script
# PowerShell script to test all API endpoints

Write-Host "🔬 Vitalis API Testing Suite" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"
$headers = @{"Content-Type" = "application/json"}

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [hashtable]$Body = $null
    )
    
    Write-Host "`n🧪 Testing: $Description" -ForegroundColor Yellow
    Write-Host "   URL: $Method $Url" -ForegroundColor Gray
    
    try {
        if ($Body) {
            $jsonBody = $Body | ConvertTo-Json -Depth 5
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -Body $jsonBody
        } else {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers
        }
        
        Write-Host "   ✅ Success" -ForegroundColor Green
        Write-Host "   Response: $($response | ConvertTo-Json -Depth 2 -Compress)" -ForegroundColor DarkGreen
        return $true
    }
    catch {
        Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Test health dashboard endpoint
Test-Endpoint -Method "GET" -Url "$baseUrl/api/health/dashboard/demo-user" -Description "Health Dashboard Data"

# Test device connection endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/api/health/devices/demo-user" -Description "User Devices List"

# Test Samsung Health OAuth initiation
Test-Endpoint -Method "POST" -Url "$baseUrl/api/health/oauth/samsung" -Description "Samsung Health OAuth" -Body @{
    userId = "demo-user"
}

# Test Fitbit OAuth initiation
Test-Endpoint -Method "POST" -Url "$baseUrl/api/health/oauth/fitbit" -Description "Fitbit OAuth" -Body @{
    userId = "demo-user"
}

# Test health data sync
Test-Endpoint -Method "POST" -Url "$baseUrl/api/health/sync" -Description "Health Data Sync" -Body @{
    userId = "demo-user"
    deviceType = "SAMSUNG"
    forceSync = $true
}

# Test device connection
Test-Endpoint -Method "POST" -Url "$baseUrl/api/health/connect" -Description "Device Connection" -Body @{
    userId = "demo-user"
    deviceType = "samsung"
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Cyan
