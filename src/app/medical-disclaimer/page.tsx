import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ShieldCheckIcon, LockClosedIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Medical Disclaimer
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30 space-y-8">
          
          {/* Important Notice */}
          <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-6">
            <div className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-red-300 mb-2">Important Medical Notice</h2>
                <p className="text-red-100">
                  Vitalis is a wellness and fitness platform designed for informational and educational purposes only. 
                  It is NOT intended to diagnose, treat, cure, or prevent any disease or medical condition.
                </p>
              </div>
            </div>
          </div>

          {/* Not Medical Advice */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Not Medical Advice</h2>
            <div className="space-y-4 text-blue-100">
              <p>
                The information, insights, and recommendations provided by Vitalis, including AI-generated health 
                analysis, are for general wellness and educational purposes only. They should not be considered 
                as medical advice, diagnosis, or treatment recommendations.
              </p>
              <p>
                Always consult with qualified healthcare professionals before making any decisions related to your 
                health, medical treatment, or changes to your lifestyle, diet, or exercise routine.
              </p>
            </div>
          </section>

          {/* No Doctor-Patient Relationship */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">No Doctor-Patient Relationship</h2>
            <p className="text-blue-100">
              Use of Vitalis does not create a doctor-patient relationship between you and any healthcare provider 
              or medical professional associated with the platform. Our AI analysis and health insights are 
              algorithmic interpretations of data and should not replace professional medical consultation.
            </p>
          </section>

          {/* Emergency Situations */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Emergency Situations</h2>
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
              <p className="text-red-200 font-medium">
                If you are experiencing a medical emergency, immediately contact emergency services (108 in India, 
                911 in the US) or go to the nearest emergency room. Do not rely on Vitalis for emergency medical assistance.
              </p>
            </div>
          </section>

          {/* Data Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Accuracy and Limitations</h2>
            <div className="space-y-4 text-blue-100">
              <p>
                While Vitalis uses advanced algorithms and clinical-grade sensors, no health monitoring technology 
                is 100% accurate. Factors such as device placement, movement, environmental conditions, and 
                individual physiological differences can affect measurement accuracy.
              </p>
              <p>
                Health data should be interpreted in conjunction with your overall health status and in consultation 
                with healthcare professionals who have access to your complete medical history.
              </p>
            </div>
          </section>

          {/* FDA and Regulatory Status */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Regulatory Status</h2>
            <p className="text-blue-100">
              Vitalis is not an FDA-approved medical device. While we incorporate FDA-cleared algorithms where 
              applicable, the platform itself has not undergone medical device approval processes. Our health 
              insights are based on wellness and fitness data analysis, not clinical diagnostics.
            </p>
          </section>

          {/* Individual Results */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Individual Results May Vary</h2>
            <p className="text-blue-100">
              Health recommendations and insights provided by Vitalis are general in nature. Individual responses 
              to lifestyle changes, exercise programs, or wellness interventions can vary significantly based on 
              personal health status, genetics, lifestyle factors, and underlying medical conditions.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p className="text-blue-100">
              To the fullest extent permitted by law, Vitalis and its affiliates disclaim all liability for any 
              health-related decisions or actions taken based on information provided by the platform. Users 
              assume full responsibility for their health decisions and any consequences thereof.
            </p>
          </section>

          {/* Professional Consultation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">When to Consult Healthcare Professionals</h2>
            <div className="space-y-2 text-blue-100">
              <p>You should consult with healthcare professionals if you experience:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chest pain, shortness of breath, or irregular heartbeat</li>
                <li>Persistent fatigue, dizziness, or fainting</li>
                <li>Unusual changes in sleep patterns or physical symptoms</li>
                <li>Any concerning health symptoms or conditions</li>
                <li>Questions about medication interactions or health conditions</li>
              </ul>
            </div>
          </section>

          {/* Updates to Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Updates to This Disclaimer</h2>
            <p className="text-blue-100">
              This medical disclaimer may be updated periodically to reflect changes in our services or regulatory 
              requirements. Continued use of Vitalis constitutes acceptance of any updated disclaimer.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns</h2>
            <p className="text-blue-100">
              If you have questions about this medical disclaimer or need clarification about the scope of 
              Vitalis services, please contact our support team at{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                support@vitalis.health
              </Link>
            </p>
          </section>

          {/* Last Updated */}
          <div className="border-t border-blue-800/30 pt-6 text-center text-blue-300">
            <p>Last updated: January 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
