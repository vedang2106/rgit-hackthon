import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';
import MapView from '../components/MapView';

export default function RouteComparisonPage() {
  const navigate = useNavigate();
  const [selectedPair, setSelectedPair] = useState('andheri-bandra');

  const routePairs = {
    'andheri-bandra': {
      source: 'Andheri',
      destination: 'Bandra',
      routes: [
        {
          id: 'r1',
          name: 'Western Express Highway',
          via: 'WEH Main Highway',
          distanceKm: 12.5,
          predictedTimeMin: 48,
          baseTimeMin: 28,
          delayMin: 20,
          congestionLevel: 'HIGH',
          congestionScore: 78,
          color: '#F97316'
        },
        {
          id: 'r2',
          name: 'S.V. Road Alternative',
          via: 'Khar Arterial Corridor',
          distanceKm: 14.2,
          predictedTimeMin: 34,
          baseTimeMin: 31,
          delayMin: 8,
          congestionLevel: 'MODERATE',
          congestionScore: 48,
          color: '#EAB308'
        },
        {
          id: 'r3',
          name: 'New Link Road Bypass',
          via: 'Juhu Coastal Connector',
          distanceKm: 11.8,
          predictedTimeMin: 31,
          baseTimeMin: 26,
          delayMin: 3,
          congestionLevel: 'LOW',
          congestionScore: 24,
          color: '#16A34A',
          isRecommended: true
        }
      ]
    },
    'powai-bkc': {
      source: 'Powai',
      destination: 'BKC',
      routes: [
        {
          id: 'r-pb-1',
          name: 'JVLR to Eastern Express',
          via: 'JVLR Highway',
          distanceKm: 15.1,
          predictedTimeMin: 46,
          baseTimeMin: 30,
          delayMin: 16,
          congestionLevel: 'HIGH',
          congestionScore: 72,
          color: '#F97316'
        },
        {
          id: 'r-pb-2',
          name: 'LBS Marg Connector',
          via: 'Ghatkopar West',
          distanceKm: 13.6,
          predictedTimeMin: 36,
          baseTimeMin: 28,
          delayMin: 8,
          congestionLevel: 'MODERATE',
          congestionScore: 42,
          color: '#EAB308',
          isRecommended: true
        }
      ]
    }
  };

  const currentData = routePairs[selectedPair] || routePairs['andheri-bandra'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-black flex items-center gap-2">
            Multi-Route Traffic Comparison
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Compare travel time, congestion levels, and delay risks across parallel road corridors.
          </p>
        </div>

        {/* Route Pair Selector */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <span>Corridor Pair:</span>
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-black font-extrabold focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="andheri-bandra">Andheri → Bandra (3 Routes)</option>
            <option value="powai-bkc">Powai → BKC (2 Routes)</option>
          </select>
        </div>
      </div>

      {/* Source -> Destination Indicator */}
      <div className="bg-black text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Evaluating Corridor</span>
            <h2 className="text-xl font-black text-white">
              {currentData.source} <span className="text-orange-400">→</span> {currentData.destination}
            </h2>
          </div>
        </div>

        <span className="text-xs font-bold text-gray-300 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
          Ranked by Composite AI Risk Score
        </span>
      </div>

      {/* 3 Route Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentData.routes.map((route, idx) => (
          <div
            key={route.id}
            className={`bg-white p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
              route.isRecommended
                ? 'border-2 border-orange-500 shadow-xl ring-2 ring-orange-200'
                : 'border-gray-200 shadow-xs'
            }`}
          >
            {route.isRecommended && (
              <span className="absolute -top-3.5 left-4 px-3.5 py-1 bg-orange-500 text-white font-extrabold text-xs rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Recommended
              </span>
            )}

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">ROUTE {idx + 1}</span>
                  <h3 className="font-extrabold text-base text-gray-900">{route.name}</h3>
                  <p className="text-xs text-gray-500">via {route.via}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] block">Distance</span>
                  <strong className="text-black font-extrabold text-sm">{route.distanceKm} km</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Predicted ETA</span>
                  <strong className="text-black font-black text-xl">{route.predictedTimeMin} min</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <span className="text-gray-500 text-[11px] block">Expected Delay</span>
                  <strong className="text-red-600 font-extrabold text-sm">+{route.delayMin} min</strong>
                </div>

                <span
                  className="px-3 py-1 rounded-lg font-black text-xs uppercase"
                  style={{ color: route.color, backgroundColor: `${route.color}15` }}
                >
                  {route.congestionLevel}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => navigate(`/predict?demo=true`)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  route.isRecommended
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                {route.isRecommended ? 'Select Recommended Route' : 'View Detailed Prediction'}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Map visualization of routes */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <h3 className="font-extrabold text-black text-base px-2">Route Corridor Overlay</h3>
        <MapView source={currentData.source} destination={currentData.destination} routes={currentData.routes} height="400px" />
      </div>

    </div>
  );
}
