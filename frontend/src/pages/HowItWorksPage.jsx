import React from 'react';
import { Cpu, ArrowDown, GitBranch, Layers, ShieldCheck, Database, Server, Code } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="bg-black text-white p-8 rounded-2xl shadow-xl text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-extrabold uppercase tracking-wider">
          AI Architecture & System Design
        </span>
        <h1 className="text-3xl font-black tracking-tight">How TrafficFlow AI Works</h1>
        <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Transparent multi-factor deterministic scoring designed for easy future migration to Python ML Random Forest models.
        </p>
      </div>

      {/* 5-Step Process Pipeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-black text-center">End-to-End Prediction Workflow</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2 relative">
            <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-extrabold text-xs flex items-center justify-center mx-auto">1</span>
            <h3 className="font-extrabold text-sm text-black">Data Collection</h3>
            <p className="text-[11px] text-gray-500">Live feeds, weather, incidents & event markers</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-extrabold text-xs flex items-center justify-center mx-auto">2</span>
            <h3 className="font-extrabold text-sm text-black">Data Processing</h3>
            <p className="text-[11px] text-gray-500">Normalizing time of day & road capacities</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center mx-auto shadow-xs">3</span>
            <h3 className="font-extrabold text-sm text-black">AI Prediction</h3>
            <p className="text-[11px] text-gray-500">Weighted factor calculation & clamping</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-extrabold text-xs flex items-center justify-center mx-auto">4</span>
            <h3 className="font-extrabold text-sm text-black">Route Analysis</h3>
            <p className="text-[11px] text-gray-500">Composite travel time & delay risk scoring</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <span className="w-8 h-8 rounded-full bg-black text-white font-extrabold text-xs flex items-center justify-center mx-auto">5</span>
            <h3 className="font-extrabold text-sm text-black">Recommendation</h3>
            <p className="text-[11px] text-gray-500">Highlighting optimal route with rationale</p>
          </div>

        </div>
      </div>

      {/* Input Factor Sum Diagram */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <h3 className="text-lg font-extrabold text-black text-center">Factor Combination Matrix</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-800">Historical Patterns</div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-800">Live Corridors</div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-800">Weather Feed</div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-800">Road Incidents</div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-800">Local Events</div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-800">Time of Day</div>
        </div>

        <div className="flex justify-center text-orange-500">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>

        <div className="bg-black text-white p-6 rounded-2xl text-center max-w-xl mx-auto space-y-2 shadow-lg">
          <span className="px-3 py-1 bg-orange-500 text-white font-extrabold text-xs rounded-full uppercase tracking-wider">
            Traffic Intelligence Engine
          </span>
          <p className="text-xs text-gray-300 pt-1">
            Calculates 0-100 score + Travel Time Multipliers (LOW 1.0x, MODERATE 1.2x, HIGH 1.5x, SEVERE 1.9x)
          </p>
        </div>
      </div>

      {/* Current vs Future Architecture Comparison (Section 18 & 29) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Current Architecture */}
        <div className="bg-white p-6 rounded-2xl border-2 border-orange-500 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 font-extrabold text-xs rounded-md uppercase">
              Current Prototype Engine
            </span>
            <span className="text-xs font-bold text-green-600">Active</span>
          </div>

          <h3 className="font-black text-lg text-black">Rule-Based Traffic Intelligence</h3>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-xs text-gray-800 space-y-2">
            <p className="font-bold text-orange-600">React Dashboard</p>
            <p className="pl-4">↓ Express REST API (/api/traffic/predict)</p>
            <p className="pl-8 font-bold text-black">↓ RuleBasedPredictor (/server/ai/trafficEngine.js)</p>
            <p className="pl-12">↓ Multi-Factor Score & Travel Time Calculation</p>
            <p className="pl-16 font-bold text-green-600">↓ JSON Prediction Response</p>
          </div>
        </div>

        {/* Future Architecture */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 font-extrabold text-xs rounded-md uppercase">
              Production ML Engine
            </span>
            <span className="text-xs font-bold text-gray-400">Future Roadmap</span>
          </div>

          <h3 className="font-black text-lg text-black">Python Random Forest ML Service</h3>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-xs text-gray-800 space-y-2">
            <p className="font-bold text-black">React Dashboard</p>
            <p className="pl-4">↓ Express Node.js Proxy</p>
            <p className="pl-8 font-bold text-orange-600">↓ Python FastAPI ML Server</p>
            <p className="pl-12 font-bold text-blue-600">↓ Trained Random Forest Model (.joblib)</p>
            <p className="pl-16 font-bold text-green-600">↓ ML Inference Output</p>
          </div>
        </div>

      </div>

    </div>
  );
}
