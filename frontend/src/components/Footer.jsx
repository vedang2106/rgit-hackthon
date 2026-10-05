import React from 'react';
import { Navigation, GitBranch, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 pt-12 pb-8 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                <Navigation className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-black">
                TrafficFlow <span className="text-orange-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Predict traffic. Plan smarter. Intelligent traffic forecasting & multi-route optimization platform for modern smart cities.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-[11px] font-medium text-gray-700">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              Deterministic Traffic Intelligence v1.0
            </div>
          </div>

          <div>
            <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-3">Product Features</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/predict" className="hover:text-orange-500 transition-colors">Traffic Predictor</Link></li>
              <li><Link to="/routes" className="hover:text-orange-500 transition-colors">Multi-Route Scoring</Link></li>
              <li><Link to="/live-traffic" className="hover:text-orange-500 transition-colors">Live Corridors Feed</Link></li>
              <li><Link to="/heatmap" className="hover:text-orange-500 transition-colors">60-Min Heatmap Forecast</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-3">AI Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/how-it-works" className="hover:text-orange-500 transition-colors">Rule-Based Scoring Engine</Link></li>
              <li><Link to="/how-it-works" className="hover:text-orange-500 transition-colors">Explainable Predictions</Link></li>
              <li><Link to="/how-it-works" className="hover:text-orange-500 transition-colors">Future ML Pipeline (FastAPI)</Link></li>
              <li><span className="text-gray-400">Random Forest Benchmark</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-3">System Mode</h4>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-gray-700 font-medium">
                <span>Active Backend:</span>
                <span className="text-black font-bold">Node.js Express</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 font-medium">
                <span>Database Readiness:</span>
                <span className="text-black font-bold">MongoDB Ready</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 font-medium">
                <span>Data Source:</span>
                <span className="text-orange-600 font-bold">Demo/Simulated</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TrafficFlow AI. Built for Smart City Congestion Prediction.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-black">Privacy Policy</span>
            <span className="hover:text-black">Terms of Service</span>
            <span className="flex items-center gap-1 text-black font-semibold">
              <GitBranch className="w-3.5 h-3.5 text-orange-500" />
              AIML Prototype
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
