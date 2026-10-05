import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { fetchPredictionHistory } from '../services/api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCongestion, setFilterCongestion] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetchPredictionHistory();
      setHistory(res.history || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recommendedRoute.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterCongestion === 'ALL' || item.congestion.toUpperCase() === filterCongestion;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-orange-500" />
            <h1 className="text-2xl font-black text-black">Prediction History</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Historical record of previous AI congestion predictions and recommended routes.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search source, destination, or route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 w-full sm:w-auto">
          <span>Congestion Filter:</span>
          <select
            value={filterCongestion}
            onChange={(e) => setFilterCongestion(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-black font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="ALL">All Levels</option>
            <option value="LOW">Low</option>
            <option value="MODERATE">Moderate</option>
            <option value="HIGH">High</option>
            <option value="SEVERE">Severe</option>
          </select>
        </div>

      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Source</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Predicted ETA</th>
                <th className="p-4">Delay Shift</th>
                <th className="p-4">Congestion</th>
                <th className="p-4">Recommended Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-900">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.date}</span>
                        <span className="text-gray-400">({item.time})</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-900">{item.source}</td>
                    <td className="p-4 font-bold text-gray-900">{item.destination}</td>
                    <td className="p-4 font-black text-black text-sm">{item.predictedEta}</td>
                    <td className="p-4 font-extrabold text-red-600">{item.delay}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] uppercase ${
                        item.congestion === 'High' ? 'bg-orange-100 text-orange-800' :
                        item.congestion === 'Severe' ? 'bg-red-100 text-red-800' :
                        item.congestion === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.congestion}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-orange-600">
                      {item.recommendedRoute}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400 font-semibold">
                    No prediction history matches your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
