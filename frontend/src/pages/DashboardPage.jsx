import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CloudRain,
  Plus,
  Navigation,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import ForecastChart from '../components/ForecastChart';
import IncidentModal from '../components/IncidentModal';
import { fetchDashboardData } from '../services/api';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const res = await fetchDashboardData();
      setData(res);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleIncidentAdded = (newInc) => {
    if (data) {
      setData({
        ...data,
        incidents: [newInc, ...(data.incidents || [])]
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm font-semibold">Loading Traffic Intelligence Dashboard...</p>
      </div>
    );
  }

  const { greeting, subtitle, stats, weather, incidents, liveFeed } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-black flex items-center gap-2">
            {greeting}, <span className="text-orange-500">Traffic Architect</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIncidentModalOpen(true)}
            className="px-4 py-2.5 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-orange-400" />
            <span>Report Incident</span>
          </button>

          <button
            onClick={() => navigate('/predict')}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>New Prediction</span>
          </button>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Current Congestion</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-black">{stats.currentCongestion}</div>
          <span className="text-[11px] text-amber-600 font-semibold block mt-1">Overall City Index</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Average Travel Delay</span>
            <Clock className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600">{stats.avgDelay}</div>
          <span className="text-[11px] text-gray-500 block mt-1">Peak hour baseline shift</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Monitored Corridors</span>
            <MapPin className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-black">{stats.routesMonitored}</div>
          <span className="text-[11px] text-gray-500 block mt-1">Active sensor feeds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Predicted High Traffic</span>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-orange-600">{stats.predictedHighTrafficRoutes} routes</div>
          <span className="text-[11px] text-gray-500 block mt-1">High/Severe congestion</span>
        </div>

      </div>

      {/* Main Section: Forecast Chart */}
      <ForecastChart trendText="Traffic is expected to remain heavy across Western Express Highway and BKC Connector over the next 60 minutes." />

      {/* Grid: Recommended Routes & Active Incidents & Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Live Corridor Status (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-extrabold text-black text-base">Live Route Corridors</h3>
              <p className="text-xs text-gray-500">Real-time monitored travel times and congestion levels</p>
            </div>
            <button
              onClick={() => navigate('/live-traffic')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 24 Corridors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {liveFeed.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors">
                <div>
                  <span className="font-extrabold text-sm text-gray-900 block">{item.route}</span>
                  <span className="text-gray-500 text-[11px]">Avg Speed: {item.avgSpeed}</span>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <strong className="text-black font-black text-sm block">{item.eta}</strong>
                    <span className="text-gray-400 text-[10px]">ETA</span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] uppercase ${
                    item.traffic === 'High' ? 'bg-orange-100 text-orange-800' :
                    item.traffic === 'Severe' ? 'bg-red-100 text-red-800' :
                    item.traffic === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.traffic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Active Incidents & Weather (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Weather Impact Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-orange-500" />
                <h4 className="font-extrabold text-black text-sm">Weather Impact</h4>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                +{weather.impactPoints} pts
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <span className="text-2xl font-black text-black block">{weather.temperature}</span>
                <span className="text-gray-500 font-medium">{weather.condition} • Humidity: {weather.humidity}</span>
              </div>
              <div className="text-right text-gray-500">
                <span>Wind: {weather.windSpeed}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
              "{weather.description}"
            </p>
          </div>

          {/* Active Incidents Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="font-extrabold text-black text-sm">Active Incidents</h4>
              </div>
              <span className="text-xs font-bold text-gray-500">
                {incidents.length} active
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-3 bg-red-50/60 rounded-xl border border-red-200/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-900 text-xs flex items-center gap-1">
                      {inc.type === 'Accident' ? '🚨' : inc.type === 'Road Work' ? '🚧' : '🎉'}
                      {inc.title}
                    </span>
                    <span className="text-[10px] text-red-700 font-bold bg-white px-1.5 py-0.5 rounded border border-red-200">
                      {inc.severity}
                    </span>
                  </div>
                  <p className="text-red-900/80 text-[11px]">{inc.location}</p>
                  <p className="text-[10px] font-bold text-red-700 pt-0.5">Impact: {inc.expectedImpact}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <IncidentModal
        isOpen={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        onIncidentAdded={handleIncidentAdded}
      />
    </div>
  );
}
