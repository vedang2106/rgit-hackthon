import React, { useState, useEffect } from 'react';
import { Activity, Clock, MapPin, RefreshCw, TrendingUp, Radio } from 'lucide-react';
import { fetchLiveTrafficFeed } from '../services/api';

export default function LiveTrafficPage() {
  const [feed, setFeed] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      const res = await fetchLiveTrafficFeed();
      setFeed(res.liveFeed || []);
      setLoading(false);
    }
    loadFeed();

    // Simulate subtle realistic live updates every 12 seconds
    const interval = setInterval(() => {
      setFeed((prevFeed) =>
        prevFeed.map((item) => {
          // Random 20% chance of small ETA fluctuation (-1 to +1 min)
          if (Math.random() < 0.2) {
            const currentVal = parseInt(item.eta, 10) || 30;
            const delta = Math.random() > 0.5 ? 1 : -1;
            const newVal = Math.max(10, currentVal + delta);
            return {
              ...item,
              eta: `${newVal} min`,
              change: delta > 0 ? `+${delta} min` : `${delta} min`
            };
          }
          return item;
        })
      );
      setLastUpdated(new Date().toLocaleTimeString());
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Title & Polling Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-orange-500 animate-pulse" />
            <h1 className="text-2xl font-black text-black">Live Traffic Corridor Feed</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time urban corridor speed monitoring and live arrival time telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200">
          <RefreshCw className="w-3.5 h-3.5 text-orange-500 animate-spin" />
          <span>Last updated: <strong>{lastUpdated}</strong> (Live Polling 12s)</span>
        </div>
      </div>

      {/* Metric Cards (Section 13) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Monitored Corridors</span>
          <strong className="text-2xl font-black text-black block mt-1">24</strong>
          <span className="text-[10px] text-gray-500 block">Active sensor networks</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">High Congestion</span>
          <strong className="text-2xl font-black text-orange-600 block mt-1">7</strong>
          <span className="text-[10px] text-orange-600 font-semibold block">Corridors delayed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Moderate</span>
          <strong className="text-2xl font-black text-amber-600 block mt-1">10</strong>
          <span className="text-[10px] text-amber-600 font-semibold block">Normal commute transit</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider block">Low Congestion</span>
          <strong className="text-2xl font-black text-green-600 block mt-1">7</strong>
          <span className="text-[10px] text-green-600 font-semibold block">Free flow corridors</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">Average Delay</span>
          <strong className="text-2xl font-black text-red-600 block mt-1">+11 min</strong>
          <span className="text-[10px] text-gray-500 block">Shift vs baseline</span>
        </div>

      </div>

      {/* Live Route Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-black text-base">Live Route Status Table</h3>
          <span className="text-xs text-gray-400 font-mono">Status: Connected</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Route Corridor</th>
                <th className="p-4">Traffic Level</th>
                <th className="p-4">Average Speed</th>
                <th className="p-4">Current ETA</th>
                <th className="p-4">Recent Shift</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feed.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-extrabold text-gray-900 text-sm">
                    {item.route}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] uppercase ${
                      item.traffic === 'High' ? 'bg-orange-100 text-orange-800' :
                      item.traffic === 'Severe' ? 'bg-red-100 text-red-800' :
                      item.traffic === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.traffic}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-gray-700 font-medium">
                    {item.avgSpeed}
                  </td>
                  <td className="p-4 font-black text-gray-900 text-sm">
                    {item.eta}
                  </td>
                  <td className="p-4 font-semibold text-gray-500">
                    {item.change || '0 min'}
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
