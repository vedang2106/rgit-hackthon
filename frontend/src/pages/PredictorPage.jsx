import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Navigation,
  Clock,
  Calendar,
  CloudRain,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle2,
  HelpCircle,
  Award,
  Layers,
  MapPin,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import MapView from '../components/MapView';
import ForecastChart from '../components/ForecastChart';
import ExplainabilityModal from '../components/ExplainabilityModal';
import { predictTraffic } from '../services/api';

export default function PredictorPage() {
  const [searchParams] = useSearchParams();
  
  // Form State
  const [source, setSource] = useState('Andheri');
  const [destination, setDestination] = useState('Bandra');
  const [departureTime, setDepartureTime] = useState('6:30 PM');
  const [date, setDate] = useState('Today');
  const [weather, setWeather] = useState('Rain');
  const [trafficCondition, setTrafficCondition] = useState('Heavy');
  const [incident, setIncident] = useState('None');
  const [event, setEvent] = useState('Large Event');

  // Async & UI State
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [predictionResult, setPredictionResult] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [explainModalOpen, setExplainModalOpen] = useState(false);

  // Auto fill and trigger prediction if demo URL flag present
  useEffect(() => {
    if (searchParams.get('demo') === 'true') {
      fillDemoParameters();
      // Execute prediction automatically for hackathon demo
      triggerPredictionWithParams('Andheri', 'Bandra', '6:30 PM', 'Today', 'Rain', 'Heavy', 'None', 'Large Event');
    }
  }, [searchParams]);

  const fillDemoParameters = () => {
    setSource('Andheri');
    setDestination('Bandra');
    setDepartureTime('6:30 PM');
    setDate('Today');
    setWeather('Rain');
    setTrafficCondition('Heavy');
    setIncident('None');
    setEvent('Large Event');
  };

  const triggerPredictionWithParams = async (
    pSource, pDest, pTime, pDate, pWeather, pTraffic, pIncident, pEvent
  ) => {
    setLoading(true);
    setLoadingStep(0);

    const steps = [
      'Analyzing traffic conditions...',
      'Processing route data...',
      'Forecasting congestion...',
      'Comparing routes...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    try {
      const res = await predictTraffic({
        source: pSource || source,
        destination: pDest || destination,
        departureTime: pTime || departureTime,
        date: pDate || date,
        weather: pWeather || weather,
        trafficCondition: pTraffic || trafficCondition,
        incident: pIncident || incident,
        event: pEvent || event
      });

      setPredictionResult(res);
      if (res?.recommendedRoute?.id) {
        setSelectedRouteId(res.recommendedRoute.id);
      }
    } catch (err) {
      console.error('Prediction failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    const steps = [
      'Analyzing traffic conditions...',
      'Processing route data...',
      'Forecasting congestion...',
      'Comparing routes...'
    ];

    // Step animations
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    try {
      const res = await predictTraffic({
        source,
        destination,
        departureTime,
        date,
        weather,
        trafficCondition,
        incident,
        event
      });

      setPredictionResult(res);
      if (res?.recommendedRoute?.id) {
        setSelectedRouteId(res.recommendedRoute.id);
      }
    } catch (err) {
      console.error('Prediction failed', err);
    } finally {
      setLoading(false);
    }
  };

  const loadingMessages = [
    'Analyzing traffic conditions...',
    'Processing route data...',
    'Forecasting congestion...',
    'Comparing routes...'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Quick Demo Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
              <Navigation className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-black">Predict Your Route</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Input travel parameters to calculate deterministic congestion scores and multi-route ETAs.
          </p>
        </div>

        <button
          onClick={() => {
            fillDemoParameters();
            handlePredict();
          }}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Quick Demo Auto-Fill</span>
        </button>
      </div>

      {/* Prediction Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <form onSubmit={handlePredict} className="space-y-6">
          
          {/* Primary Route Locations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div>
              <label className="font-bold text-xs text-gray-900 block mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Source Location
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Andheri">Andheri</option>
                <option value="Bandra">Bandra</option>
                <option value="Powai">Powai</option>
                <option value="Dadar">Dadar</option>
                <option value="Thane">Thane</option>
                <option value="Borivali">Borivali</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-xs text-gray-900 block mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-black" />
                Destination Location
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Bandra">Bandra</option>
                <option value="BKC">BKC</option>
                <option value="Juhu">Juhu</option>
                <option value="Lower Parel">Lower Parel</option>
                <option value="Andheri">Andheri</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-xs text-gray-900 block mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                Departure Time
              </label>
              <select
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Now">Now</option>
                <option value="08:30 AM">08:30 AM (Morning Peak)</option>
                <option value="01:30 PM">01:30 PM (Midday)</option>
                <option value="6:30 PM">6:30 PM (Evening Peak)</option>
                <option value="10:00 PM">10:00 PM (Late Night)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-xs text-gray-900 block mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-600" />
                Travel Date
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Today">Today (Weekday)</option>
                <option value="Weekend">Weekend</option>
              </select>
            </div>

          </div>

          {/* Optional Factor Controls */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block">
              Environmental & Contextual Factors
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Weather</label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium"
                >
                  <option value="Clear">Clear / Sunny (+0 pts)</option>
                  <option value="Cloudy">Cloudy (+3 pts)</option>
                  <option value="Rain">Rain (+12 pts)</option>
                  <option value="Heavy Rain">Heavy Rain (+20 pts)</option>
                  <option value="Fog">Dense Fog (+15 pts)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Baseline Traffic</label>
                <select
                  value={trafficCondition}
                  onChange={(e) => setTrafficCondition(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium"
                >
                  <option value="Low">Low (+5 pts)</option>
                  <option value="Moderate">Moderate (+15 pts)</option>
                  <option value="Heavy">Heavy (+25 pts)</option>
                  <option value="Severe">Severe (+35 pts)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Incidents</label>
                <select
                  value={incident}
                  onChange={(e) => setIncident(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium"
                >
                  <option value="None">None (+0 pts)</option>
                  <option value="Minor Accident">Minor Accident (+10 pts)</option>
                  <option value="Major Accident">Major Accident (+25 pts)</option>
                  <option value="Road Work">Road Work (+15 pts)</option>
                  <option value="Road Closure">Road Closure (+30 pts)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Events</label>
                <select
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium"
                >
                  <option value="None">None (+0 pts)</option>
                  <option value="Concert / Match">Concert / Match (+8 pts)</option>
                  <option value="Large Event">Large Event / Festival (+20 pts)</option>
                </select>
              </div>

            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto sm:mr-0 disabled:opacity-50"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>Predict Traffic</span>
            </button>
          </div>

        </form>
      </div>

      {/* Loading Animation Overlay */}
      {loading && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md text-center space-y-4 max-w-md mx-auto animate-pulse">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="font-extrabold text-base text-black">{loadingMessages[loadingStep]}</h3>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full transition-all duration-300"
              style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Results View */}
      {predictionResult && !loading && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Top Prediction Summary Banner */}
          <div className="bg-black text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-orange-500 text-white font-extrabold text-[11px] rounded-md uppercase">
                  Prediction Complete
                </span>
                <span className="text-gray-400 text-xs font-mono">
                  Confidence: {predictionResult.confidence}
                </span>
              </div>
              
              <h2 className="text-2xl font-black text-white pt-1">
                {predictionResult.source} → {predictionResult.destination}
              </h2>
              
              <p className="text-xs text-gray-300">
                Recommended via <strong className="text-orange-400">{predictionResult.recommendedRoute?.name}</strong>
              </p>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Predicted Travel Time</span>
                <span className="text-3xl font-black text-orange-400">{predictionResult.predictedTravelTime} min</span>
                <span className="text-[11px] text-gray-400 block">(Normal: {predictionResult.normalTravelTime} min)</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Expected Delay</span>
                <span className="text-3xl font-black text-red-500">+{predictionResult.delay} min</span>
                <span className="text-[11px] text-gray-400 block">{predictionResult.congestionLevel} Congestion</span>
              </div>

              <button
                onClick={() => setExplainModalOpen(true)}
                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl transition-all border border-gray-700 cursor-pointer"
              >
                Why this prediction?
              </button>
            </div>
          </div>

          {/* Rationale Explanation Box */}
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex items-start gap-3 text-xs text-orange-950">
            <Award className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-orange-900 block">AI Recommendation Rationale:</strong>
              <p className="mt-0.5 text-orange-900/90 leading-relaxed">
                {predictionResult.recommendationRationale}
              </p>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <h3 className="font-extrabold text-black text-base px-2">Route Corridor Map</h3>
            <MapView
              source={predictionResult.source}
              destination={predictionResult.destination}
              routes={predictionResult.routes}
              selectedRouteId={selectedRouteId}
              onSelectRoute={(r) => setSelectedRouteId(r.id)}
              height="450px"
            />
          </div>

          {/* Multi-Route Cards Comparison */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-black text-lg">Multi-Route Evaluation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {predictionResult.routes.map((route) => (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                    route.isRecommended
                      ? 'border-2 border-orange-500 shadow-lg ring-2 ring-orange-200'
                      : 'border-gray-200 hover:border-gray-300 shadow-xs'
                  }`}
                >
                  {route.isRecommended && (
                    <span className="absolute -top-3 left-4 px-3 py-1 bg-orange-500 text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-xs">
                      ⭐ Recommended Route
                    </span>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-extrabold text-base text-gray-900">{route.name}</h4>
                      <p className="text-xs text-gray-500">via {route.via}</p>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-b border-gray-100 py-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-bold uppercase">Distance</span>
                        <span className="text-sm font-extrabold text-gray-900">{route.distanceKm} km</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block font-bold uppercase">ETA</span>
                        <span className="text-2xl font-black text-black">{route.predictedTimeMin} min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-600">
                        Delay: <strong className="text-red-600">+{route.delayMin} min</strong>
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase"
                        style={{ color: route.color, backgroundColor: `${route.color}15` }}
                      >
                        {route.congestionLevel}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-400 text-[11px]">Score: {route.congestionScore}/100</span>
                    <span className="font-bold text-orange-600 hover:underline flex items-center gap-1">
                      <span>Select Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Forecast Chart */}
          <ForecastChart
            forecast={predictionResult.forecast}
            trendText={predictionResult.forecastTrendText}
          />

        </div>
      )}

      {/* Explainability Audit Modal */}
      {predictionResult && (
        <ExplainabilityModal
          isOpen={explainModalOpen}
          onClose={() => setExplainModalOpen(false)}
          whyData={predictionResult.whyPrediction}
          totalScore={predictionResult.congestionScore}
          level={predictionResult.congestionLevel}
        />
      )}

    </div>
  );
}
