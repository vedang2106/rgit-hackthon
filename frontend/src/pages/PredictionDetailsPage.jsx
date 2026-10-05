import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Navigation, CloudRain, AlertTriangle, ShieldCheck, Award, HelpCircle, Activity } from 'lucide-react';
import ForecastChart from '../components/ForecastChart';
import ExplainabilityModal from '../components/ExplainabilityModal';

export default function PredictionDetailsPage() {
  const navigate = useNavigate();
  const [explainOpen, setExplainOpen] = useState(false);

  // Demo detail instance
  const detail = {
    source: 'Andheri',
    destination: 'Bandra',
    predictedTravelTime: 32,
    normalTravelTime: 28,
    delay: 4,
    congestionLevel: 'LOW',
    congestionScore: 24,
    confidence: '87%',
    distanceKm: 12.5,
    routeName: 'New Link Road Bypass',
    weatherImpact: '+12 pts (Rain reduces arterial speeds)',
    incidentImpact: '0 pts (No active blockages on bypass)',
    routeRisk: 'Low Risk Corridor'
  };

  const whyBreakdown = [
    { factor: 'Base Traffic Baseline', points: 20, note: 'Standard base city congestion index' },
    { factor: 'Time of Day', points: 5, note: 'Off-Peak Transit' },
    { factor: 'Weather Condition', points: 12, note: 'Rain' },
    { factor: 'Road Capacity', points: -13, note: 'Coastal Bypass Capacity Modifier' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-black text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-orange-500 text-white font-extrabold text-[10px] rounded uppercase">
              Prediction Details Audit
            </span>
            <span className="text-gray-400 text-xs font-mono">
              Confidence: {detail.confidence}
            </span>
          </div>

          <h1 className="text-2xl font-black text-white pt-1">
            {detail.source} → {detail.destination}
          </h1>
          <p className="text-xs text-gray-400">
            Primary Route: <strong className="text-orange-400">{detail.routeName}</strong> ({detail.distanceKm} km)
          </p>
        </div>

        <button
          onClick={() => setExplainOpen(true)}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          Why this prediction?
        </button>
      </div>

      {/* Primary Metrics Grid (Section 12 requirements) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Predicted Time</span>
          <strong className="text-2xl font-black text-black block mt-1">{detail.predictedTravelTime} min</strong>
          <span className="text-[10px] text-gray-500 block">Estimated travel</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Normal Time</span>
          <strong className="text-2xl font-black text-gray-700 block mt-1">{detail.normalTravelTime} min</strong>
          <span className="text-[10px] text-gray-500 block">Free-flow speed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Expected Delay</span>
          <strong className="text-2xl font-black text-red-600 block mt-1">+{detail.delay} min</strong>
          <span className="text-[10px] text-red-600 font-semibold block">Congestion shift</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Congestion Level</span>
          <strong className="text-xl font-black text-green-600 block mt-1 uppercase">{detail.congestionLevel}</strong>
          <span className="text-[10px] text-gray-500 block">Score: {detail.congestionScore}/100</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Confidence</span>
          <strong className="text-2xl font-black text-orange-500 block mt-1">{detail.confidence}</strong>
          <span className="text-[10px] text-gray-500 block">Data completeness</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Distance</span>
          <strong className="text-2xl font-black text-black block mt-1">{detail.distanceKm} km</strong>
          <span className="text-[10px] text-gray-500 block">Total corridor</span>
        </div>

      </div>

      {/* Forecast Chart */}
      <ForecastChart trendText="Traffic conditions are forecasted to remain low and stable over the next hour." />

      {/* Impact Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-orange-500" />
            <h4 className="font-extrabold text-black text-sm">Weather Impact</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed pt-1">
            {detail.weatherImpact}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h4 className="font-extrabold text-black text-sm">Incident Impact</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed pt-1">
            {detail.incidentImpact}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <h4 className="font-extrabold text-black text-sm">Route Risk Index</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed pt-1">
            {detail.routeRisk} — Optimal signal synchronization along Juhu Coastal Connector.
          </p>
        </div>

      </div>

      <ExplainabilityModal
        isOpen={explainOpen}
        onClose={() => setExplainOpen(false)}
        whyData={whyBreakdown}
        totalScore={detail.congestionScore}
        level={detail.congestionLevel}
      />

    </div>
  );
}
