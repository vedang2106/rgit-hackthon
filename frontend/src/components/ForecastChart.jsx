import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { Clock, TrendingUp, Info } from 'lucide-react';

export default function ForecastChart({ forecast = [], trendText = '' }) {
  const chartData = forecast.length > 0 ? forecast : [
    { timeLabel: 'Now', score: 42, level: 'MODERATE' },
    { timeLabel: '+15 min', score: 55, level: 'HIGH' },
    { timeLabel: '+30 min', score: 68, level: 'HIGH' },
    { timeLabel: '+45 min', score: 74, level: 'HIGH' },
    { timeLabel: '+60 min', score: 81, level: 'SEVERE' }
  ];

  const getCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black text-white p-3 rounded-xl shadow-xl border border-gray-800 text-xs">
          <p className="font-bold text-orange-400 text-sm mb-1">{data.timeLabel}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4 text-gray-300">
              <span>Congestion Score:</span>
              <strong className="text-white font-bold">{data.score} / 100</strong>
            </p>
            <p className="flex justify-between gap-4 text-gray-300">
              <span>Status Level:</span>
              <strong style={{ color: data.color || '#F97316' }}>{data.level}</strong>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-extrabold text-black">Traffic Congestion Forecast</h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Predictive congestion curve over the next 60 minutes
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 font-semibold rounded-md border border-green-200">
            0-25 Low
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 font-semibold rounded-md border border-amber-200">
            26-50 Mod
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-700 font-semibold rounded-md border border-orange-200">
            51-75 High
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 font-semibold rounded-md border border-red-200">
            76-100 Severe
          </span>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="timeLabel" stroke="#6B7280" fontSize={12} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#6B7280" fontSize={12} tickLine={false} />
            <Tooltip content={getCustomTooltip} />
            <ReferenceLine y={50} stroke="#EAB308" strokeDasharray="3 3" label={{ value: 'Moderate Threshold', fill: '#CA8A04', fontSize: 10 }} />
            <ReferenceLine y={75} stroke="#DC2626" strokeDasharray="3 3" label={{ value: 'Severe Threshold', fill: '#DC2626', fontSize: 10 }} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#F97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
              dot={{ fill: '#F97316', r: 5, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, fill: '#EA580C' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Rationale Trend Banner */}
      {trendText && (
        <div className="mt-4 p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl flex items-start gap-3 text-xs text-orange-950">
          <TrendingUp className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
          <div>
            <strong className="font-bold text-orange-900 block">Forecast Intelligence Insight:</strong>
            <p className="mt-0.5 leading-relaxed text-orange-800">{trendText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
