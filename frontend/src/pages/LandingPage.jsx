import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Activity, ArrowRight, ShieldCheck, Zap, Clock, CloudRain, AlertTriangle, Layers, Award } from 'lucide-react';
import MapView from '../components/MapView';

export default function LandingPage({ onRunDemo }) {
  const navigate = useNavigate();

  const heroDemoRoutes = [
    {
      id: 'r1-weh',
      name: 'Western Express Highway',
      via: 'WEH Main Arterial',
      distanceKm: 12.5,
      baseTimeMin: 28,
      predictedTimeMin: 48,
      delayMin: 20,
      congestionScore: 82,
      congestionLevel: 'SEVERE',
      color: '#DC2626'
    },
    {
      id: 'r2-svroad',
      name: 'S.V. Road Alternative',
      via: 'SV Road & Khar Signal',
      distanceKm: 14.2,
      baseTimeMin: 31,
      predictedTimeMin: 34,
      delayMin: 8,
      congestionScore: 48,
      congestionLevel: 'MODERATE',
      color: '#EAB308'
    },
    {
      id: 'r3-link',
      name: 'New Link Road Bypass',
      via: 'Juhu Coastal Connector',
      distanceKm: 11.8,
      baseTimeMin: 26,
      predictedTimeMin: 31,
      delayMin: 3,
      congestionScore: 24,
      congestionLevel: 'LOW',
      color: '#F97316',
      isRecommended: true
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 pb-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-extrabold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-current text-orange-500" />
                <span>Smart City Traffic Intelligence Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none">
                Predict Traffic <br />
                <span className="text-orange-500">Before You Travel.</span>
              </h1>

              <p className="text-base text-gray-600 leading-relaxed font-normal">
                AI-powered traffic prediction that combines historical patterns, weather conditions, live incidents, and route capacity to help you choose smarter, faster routes.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/predict')}
                  className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Predict My Route</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3.5 bg-black hover:bg-gray-900 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-orange-400" />
                  <span>Explore Dashboard</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div>
                  <span className="block text-2xl font-black text-black">15–60m</span>
                  <span className="text-xs text-gray-500 font-medium">Future Forecast</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-black">Multi-Route</span>
                  <span className="text-xs text-gray-500 font-medium">Comparison Engine</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-black">Weather</span>
                  <span className="text-xs text-gray-500 font-medium">Factor Weighting</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-black">Incident</span>
                  <span className="text-xs text-gray-500 font-medium">Aware Scoring</span>
                </div>
              </div>

            </div>

            {/* Right Map Visual + Forecast Snippet Card */}
            <div className="lg:col-span-6 relative">
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
                <MapView source="Andheri" destination="Bandra" routes={heroDemoRoutes} height="400px" />
                
                {/* Floating Prediction Card Overlay */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-xl max-w-xs z-30 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div>
                      <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider block">Traffic Forecast</span>
                      <h4 className="font-extrabold text-sm text-gray-900">Next 30 Minutes</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold text-[10px] rounded-md">
                      Moderate
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-gray-500 text-[11px] block">Expected Delay</span>
                      <strong className="text-red-600 font-extrabold text-sm">+8 min</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[11px] block">Prediction Confidence</span>
                      <strong className="text-black font-extrabold text-sm">87%</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-black">Engineered for Urban Mobility</h2>
          <p className="text-sm text-gray-500 mt-2">
            Combining multi-factor environmental and traffic signals into an explainable route scoring architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-orange-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-black">Deterministic AI Engine</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Transparent rule-based scoring engine evaluating 10 weighted factors: time of day, weather, events, and road capacities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-orange-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              <Layers className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-extrabold text-base text-black">Multi-Route Scoring</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Evaluates up to 3 distinct corridors simultaneously to recommend the path with the lowest overall congestion delay risk.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-orange-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-black">Full Explainability</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Understand exact factor weights contributing to every prediction. No black boxes — complete auditing for smart city operations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
