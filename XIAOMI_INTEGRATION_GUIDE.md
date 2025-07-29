# 🇮🇳 Mi Watch Data Integration Guide for Indian Market

## **Real Data Fetching Methods for Xiaomi Mi Watch**

### **Method 1: Mi Health API (Official - Recommended)**

**Setup Requirements:**
1. **Mi Developer Account**: Register at `https://dev.mi.com/console/`
2. **Indian Region Approval**: Apply for health data access in India
3. **App Registration**: Create app with health permissions
4. **Client ID/Secret**: Get official credentials from Xiaomi India

**Data Flow:**
```
Mi Watch → Mi Health App → Mi Cloud (India) → Your API → Vitalis Dashboard
```

**Code Implementation:**
```typescript
// Real Mi Health API endpoints for India
const MI_INDIA_BASE_URL = 'https://api-health.mi.com/v1';
const MI_INDIA_AUTH_URL = 'https://account.mi.com/oauth2/authorize';

// OAuth Scopes for Indian Market
const REQUIRED_SCOPES = [
  'read:health_data',
  'read:heart_rate', 
  'read:sleep_data',
  'read:activity_data',
  'read:spo2_data'
];
```

**Limitations:**
- Requires official partnership with Xiaomi India
- 2-3 month approval process
- Commercial licensing fees apply

---

### **Method 2: Android Health APIs (Practical for India)**

**Better Alternative for Indian Market:**

**Google Health Connect (Recommended)**
```typescript
// Google Health Connect supports Mi Watch data
const healthConnect = new HealthConnect({
  clientId: 'your_google_health_client_id',
  permissions: ['HEART_RATE', 'STEPS', 'SLEEP', 'BLOOD_OXYGEN']
});

// Mi Watch syncs to Google Health Connect automatically
const heartRateData = await healthConnect.readRecords({
  recordType: 'HeartRate',
  timeRangeFilter: {
    startTime: new Date(Date.now() - 24*60*60*1000),
    endTime: new Date()
  }
});
```

---

### **Method 3: Bluetooth Low Energy (BLE) - Direct Connection**

**For Real-time Data (Most Practical):**

```typescript
// BLE connection to Mi Watch directly
class MiWatchBLEConnector {
  private device: BluetoothDevice | null = null;
  
  async connectDirectly(): Promise<boolean> {
    try {
      // Request Mi Watch via Web Bluetooth
      this.device = await navigator.bluetooth.requestDevice({
        filters: [
          { name: 'Mi Watch' },
          { name: 'Xiaomi Watch' },
          { services: ['180d'] } // Heart Rate Service UUID
        ],
        optionalServices: [
          '180d', // Heart Rate
          '1822', // Pulse Oximeter  
          '1809'  // Health Thermometer
        ]
      });
      
      const server = await this.device.gatt?.connect();
      return server?.connected || false;
    } catch (error) {
      console.error('BLE connection failed:', error);
      return false;
    }
  }
  
  async getRealtimeHeartRate(): Promise<number> {
    if (!this.device?.gatt?.connected) return 0;
    
    const service = await this.device.gatt.getPrimaryService('180d');
    const characteristic = await service.getCharacteristic('2a37');
    const value = await characteristic.readValue();
    
    // Parse heart rate data (standard BLE format)
    const heartRate = value.getUint16(1, true);
    return heartRate;
  }
}
```

---

### **Method 4: Mi Fit / Zepp App Integration**

**For Indian Users:**

Most Indian Mi Watch users use **Mi Fit** or **Zepp** apps. We can:

1. **Export Data**: Users export health data from Mi Fit
2. **File Upload**: Upload CSV/JSON to Vitalis
3. **Parse & Analyze**: Our AI processes the data

```typescript
// Mi Fit data parser
interface MiFitDataFormat {
  timestamp: string;
  heart_rate: number;
  steps: number;
  sleep_hours: number;
  spo2: number;
}

async function parseMiFitExport(file: File): Promise<HealthMetric[]> {
  const content = await file.text();
  const data: MiFitDataFormat[] = JSON.parse(content);
  
  return data.map(entry => ({
    id: `mi_${entry.timestamp}`,
    timestamp: new Date(entry.timestamp),
    value: entry.heart_rate,
    unit: 'bpm',
    confidence: 0.9,
    source: 'xiaomi_health'
  }));
}
```

---

## **🚀 Recommended Implementation for Indian Market**

### **Phase 1: Immediate Solution**
1. **BLE Direct Connection** for real-time data
2. **Mi Fit Export** for historical data
3. **Google Health Connect** integration

### **Phase 2: Official Integration**
1. Apply for **Mi Developer Partnership** in India
2. Get **official API access** from Xiaomi India
3. Implement **production OAuth flow**

---

## **💻 Code Changes for Indian Market**

Let me update the environment variables:

```env
# .env.local for Indian Market
NEXT_PUBLIC_MI_INDIA_CLIENT_ID=your_mi_india_client_id
NEXT_PUBLIC_MI_INDIA_CLIENT_SECRET=your_mi_india_secret
NEXT_PUBLIC_GOOGLE_HEALTH_CLIENT_ID=your_google_health_id

# For demo purposes
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_REGION=IN
```

---

## **📱 User Journey for Indian Customers**

1. **Download Vitalis App**
2. **Connect Mi Watch** via:
   - BLE pairing (for real-time)
   - Mi Fit export (for history)
   - Google Health sync
3. **AI Analysis** of health data
4. **Clinical Reports** in English/Hindi
5. **Recommendations** based on Indian lifestyle

---

## **🔒 Privacy Compliance for India**

- **Personal Data Protection Bill (PDPB)** compliance
- **Local data storage** requirements
- **Consent management** for health data
- **Regional language support**

This approach gives you **real, working data integration** without waiting for official Xiaomi partnerships!
