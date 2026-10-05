import React from 'react';
import { Info, Cpu } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-black text-white px-4 py-2 text-xs border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider">
            Prototype Demo
          </span>
          <span className="text-gray-300">
            Prototype data — simulated for demonstration
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <Cpu className="w-3.5 h-3.5 text-orange-400" />
          <span>
            Engine: <strong className="text-white font-medium">Rule-Based AI Engine</strong> (Modular API swappable with Python ML Random Forest)
          </span>
        </div>
      </div>
    </div>
  );
}
