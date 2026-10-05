import React, { useState } from 'react';
import { Clock, Filter, Flame, Info } from 'lucide-react';

export default function HeatmapView() {
  const [selectedTimeOffset, setSelectedTimeOffset] = useState(0); // 0, 15, 30, 45, 60

  // Base city zones data
  const baseZones = [
    { id: 'z1', name: 'Western Express Highway (Andheri - Bandra)', baseScore: 48, coords: 'North-South Arterial' },
    { id: 'z2', name: 'Link Road & Juhu Corridor', baseScore: 32, coords: 'Coastal West Zone' },
    { id: 'z3', name: 'SV Road Commercial Strip', baseScore: 42, coords: 'West Central' },
    { id: 'z4', name: 'BKC Financial Hub Gateway', baseScore: 65, coords: 'Central Business District' },
    { id: 'z5', name: 'JVLR Connector (Powai)', baseScore: 52, coords: 'East-West Link' },
    { id: 'z6', name: 'Eastern Express Highway (Thane Link)', baseScore: 58, coords: 'North East Corridor' },
    { id: 'z7', name: 'Lower Parel Flyover Zone', baseScore: 78, coords: 'South Central Business Hub' },
    { id: 'z8', name: 'Worli Sea Link Approach', baseScore: 28, coords: 'Coastal Highway' }
  ];

  // Calculate dynamic predicted score based on time offset
  const getZoneScore = (baseScore, offset) => {
    // Peak progression: score increases gradually up to +45 min
    const offsetDelta = Math.round((offset / 15) * 8.5);
    return Math.min(100, Math.max(10, baseScore + offsetDelta));
  };

  const getStatusObj = (score) => {
    if (score <= 25) return { level: 'LOW', bg: 'bg-green-500', text: 'text-green-600', badge: 'bg-green-100 text-green-800 border-green-300' };
    if (score <= 50) return { level: 'MODERATE', bg: 'bg-amber-400', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (score <= 75) return { level: 'HIGH', bg: 'bg-orange-500', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-800 border-orange-300' };
    return { level: 'SEVERE', bg: 'bg-red-600', text: 'text-red-600', badge: 'bg-red-100 text-red-800 border-red-300' };
  };

  const timeOptions = [
    { label: 'Now', offset: 0 },
    { label: '+15 min', offset: 15 },
    { label: '+30 min', offset: 30 },
    { label: '+45 min', offset: 45 },
    { label: '+60 min', offset: 60 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Time Offset Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <div>
            <h3 className="font-extrabold text-black text-sm">Forecast Time Horizon Filter</h3>
            <p className="text-xs text-gray-500">Select future timeframe to render predicted corridor heat intensity</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
          {timeOptions.map((opt) => (
            <button
              key={opt.offset}
              onClick={() => setSelectedTimeOffset(opt.offset)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedTimeOffset === opt.offset
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-gray-700 hover:text-black hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Heatmap Corridor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {baseZones.map((zone) => {
          const score = getZoneScore(zone.baseScore, selectedTimeOffset);
          const status = getStatusObj(score);

          return (
            <div key={zone.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              
              {/* Heat Status Top Bar Accent */}
              <div className={`h-1.5 absolute top-0 left-0 right-0 ${status.bg}`} />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">{zone.coords}</span>
                  <h4 className="font-extrabold text-gray-900 text-sm leading-snug">{zone.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-black">{score}</span>
                  <span className="text-[10px] text-gray-400 block">/ 100</span>
                </div>
              </div>

              {/* Progress Heat Bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full ${status.bg} transition-all duration-500`}
                  style={{ width: `${score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[11px] border ${status.badge}`}>
                  {status.level}
                </span>

                <span className="text-gray-500 text-[11px]">
                  {selectedTimeOffset === 0 ? 'Live feeds' : `Forecasted ${selectedTimeOffset}m out`}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
