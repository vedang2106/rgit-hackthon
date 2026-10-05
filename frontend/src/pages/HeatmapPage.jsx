import React from 'react';
import { Flame, Layers } from 'lucide-react';
import HeatmapView from '../components/HeatmapView';

export default function HeatmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h1 className="text-2xl font-black text-black">Traffic Congestion Heatmap</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Visual congestion density map and 60-minute future predictive corridor heat.
          </p>
        </div>
      </div>

      <HeatmapView />

    </div>
  );
}
