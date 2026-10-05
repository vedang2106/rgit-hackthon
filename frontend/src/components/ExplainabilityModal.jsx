import React from 'react';
import { X, HelpCircle, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

export default function ExplainabilityModal({ isOpen, onClose, whyData = [], totalScore = 0, level = 'MODERATE' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-black text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">Why This Prediction?</h3>
              <p className="text-xs text-gray-400">Transparent Rule-Based AI Engine Factor Audit</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-orange-800 uppercase tracking-wider block">Calculated Congestion Index</span>
              <span className="text-3xl font-black text-black">{totalScore} <span className="text-xs font-normal text-gray-500">/ 100</span></span>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-orange-500 text-white font-extrabold text-xs rounded-lg uppercase tracking-wider block">
                {level} CONGESTION
              </span>
              <span className="text-[11px] text-gray-500 mt-1 block">Deterministic Scoring Model</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div>
            <h4 className="font-extrabold text-sm text-black mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-orange-500" />
              Itemized Factor Contributions
            </h4>

            <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden text-xs">
              {whyData.map((item, idx) => (
                <div key={idx} className="p-3 bg-white hover:bg-gray-50 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-bold text-gray-900 block text-sm">{item.factor}</span>
                    <span className="text-gray-500 text-[11px]">{item.note}</span>
                  </div>

                  <span className={`font-mono text-sm font-extrabold px-2.5 py-1 rounded-md ${
                    item.points >= 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.points >= 0 ? `+${item.points}` : item.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formula info */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-2">
            <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-gray-600" />
              Calculation Formula & Clamping
            </h5>
            <p className="text-gray-600 leading-relaxed">
              <code className="bg-gray-200 text-black px-1.5 py-0.5 rounded font-mono font-bold">
                Score = Base(20) + Time + Weather + Traffic + Incident + Event + RoadFactor
              </code>
            </p>
            <p className="text-gray-500 text-[11px]">
              Final score is clamped between 0 and 100. Travel time is computed by applying the congestion multiplier to the free-flow baseline speed.
            </p>
          </div>

        </div>

        {/* Footer button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Close Explanation
          </button>
        </div>

      </div>
    </div>
  );
}
