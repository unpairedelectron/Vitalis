import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  CloudIcon,
  CommandLineIcon,
  CpuChipIcon,
  DocumentTextIcon,
  KeyIcon,
  PlayIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function APIDocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <CodeBracketIcon className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Vitalis API Documentation
            </h1>
          </div>
          <p className="text-xl text-blue-200 mt-4">
            Integrate military-grade health intelligence into your applications
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Start */}
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-8 mb-12 border border-blue-600/30">
          <div className="flex items-start">
            <PlayIcon className="h-8 w-8 text-blue-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Quick Start Guide</h2>
              <p className="text-blue-100 mb-6">
                Get started with the Vitalis API in minutes. Our RESTful API provides access to 
                real-time health data, AI insights, and clinical-grade analytics.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Install Vitalis SDK</div>
                <div className="text-blue-300">npm install @vitalis/health-api</div>
                <div className="text-green-400 mt-4 mb-2"># Initialize with your API key</div>
                <div className="text-blue-300">
                  const vitalis = new VitalisAPI('{'{'}API_KEY{'}'});<br/>
                  const healthData = await vitalis.getHealthMetrics(userId);
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <CpuChipIcon className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">AI Health Analysis</h3>
            <p className="text-blue-100 mb-4">
              Access Claude 3.5 Sonnet-powered health insights, predictive analytics, 
              and personalized recommendations through our API.
            </p>
            <div className="bg-purple-900/30 rounded-lg p-3">
              <p className="text-purple-200 text-sm font-medium">POST /api/v1/analyze</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <CloudIcon className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Real-Time Data</h3>
            <p className="text-blue-100 mb-4">
              Stream live health metrics from connected devices with WebSocket 
              connections and real-time push notifications.
            </p>
            <div className="bg-blue-900/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm font-medium">GET /api/v1/realtime</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <ShieldCheckIcon className="h-12 w-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">HIPAA Compliant</h3>
            <p className="text-blue-100 mb-4">
              All API endpoints are HIPAA/GDPR compliant with end-to-end encryption 
              and comprehensive audit logging.
            </p>
            <div className="bg-emerald-900/30 rounded-lg p-3">
              <p className="text-emerald-200 text-sm font-medium">✓ Medical-grade security</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <DocumentTextIcon className="h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Medical Reports</h3>
            <p className="text-blue-100 mb-4">
              Upload and analyze medical documents, lab reports, and imaging 
              studies with OCR and AI-powered interpretation.
            </p>
            <div className="bg-yellow-900/30 rounded-lg p-3">
              <p className="text-yellow-200 text-sm font-medium">POST /api/v1/analyze-report</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <CommandLineIcon className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Device Integration</h3>
            <p className="text-blue-100 mb-4">
              Connect and manage 50+ health devices including Apple Watch, 
              Samsung, Fitbit, Oura Ring, and more.
            </p>
            <div className="bg-cyan-900/30 rounded-lg p-3">
              <p className="text-cyan-200 text-sm font-medium">GET /api/v1/devices</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <KeyIcon className="h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Authentication</h3>
            <p className="text-blue-100 mb-4">
              Secure OAuth 2.0 authentication with JWT tokens, API keys, 
              and comprehensive access control.
            </p>
            <div className="bg-indigo-900/30 rounded-lg p-3">
              <p className="text-indigo-200 text-sm font-medium">POST /api/v1/auth</p>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Core API Endpoints</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">GET</span>
                <code className="text-green-400 font-mono">/api/v1/health/metrics/{'{userId}'}</code>
              </div>
              <p className="text-blue-100">Retrieve comprehensive health metrics for a user</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">POST</span>
                <code className="text-blue-400 font-mono">/api/v1/health/analyze</code>
              </div>
              <p className="text-blue-100">Generate AI-powered health insights and recommendations</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">POST</span>
                <code className="text-purple-400 font-mono">/api/v1/medical/analyze-report</code>
              </div>
              <p className="text-blue-100">Upload and analyze medical reports with OCR and AI</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">WS</span>
                <code className="text-orange-400 font-mono">wss://api.vitalis.health/realtime</code>
              </div>
              <p className="text-blue-100">Real-time health data streaming via WebSocket</p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <h3 className="text-xl font-bold text-white mb-4">JavaScript/Node.js</h3>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-green-400 mb-2">// Get user health metrics</div>
              <div className="text-blue-300">
                const response = await fetch(<br/>
                &nbsp;&nbsp;'https://api.vitalis.health/v1/health/metrics/user123',<br/>
                &nbsp;&nbsp;{'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;headers: {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Authorization': 'Bearer ' + apiKey,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Content-Type': 'application/json'<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                &nbsp;&nbsp;{'}'}<br/>
                );<br/>
                const data = await response.json();
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <h3 className="text-xl font-bold text-white mb-4">Python</h3>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-green-400 mb-2"># Analyze health data with AI</div>
              <div className="text-blue-300">
                import requests<br/><br/>
                response = requests.post(<br/>
                &nbsp;&nbsp;'https://api.vitalis.health/v1/health/analyze',<br/>
                &nbsp;&nbsp;headers={'{'}'Authorization': f'Bearer {'{api_key}'}'{'}'}<br/>
                &nbsp;&nbsp;json={'{'}'user_id': 'user123', 'timeframe': '7d'{'}'}<br/>
                )<br/>
                insights = response.json()
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">API Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-600/30">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <div className="text-3xl font-bold text-blue-400 mb-4">Free</div>
              <ul className="space-y-2 text-blue-100">
                <li>• 1,000 API calls/month</li>
                <li>• Basic health metrics</li>
                <li>• Community support</li>
              </ul>
            </div>
            
            <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-600/30">
              <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
              <div className="text-3xl font-bold text-purple-400 mb-4">$99/mo</div>
              <ul className="space-y-2 text-blue-100">
                <li>• 100,000 API calls/month</li>
                <li>• AI health analysis</li>
                <li>• Real-time data streams</li>
                <li>• Priority support</li>
              </ul>
            </div>
            
            <div className="bg-emerald-900/30 rounded-lg p-6 border border-emerald-600/30">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-emerald-400 mb-4">Custom</div>
              <ul className="space-y-2 text-blue-100">
                <li>• Unlimited API calls</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
                <li>• SLA guarantees</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Build with Vitalis?</h3>
          <p className="text-blue-200 mb-6">
            Get your API key and start integrating health intelligence into your applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Get API Key
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-blue-600/30"
            >
              View Full Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
