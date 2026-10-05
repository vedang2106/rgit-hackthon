import express from 'express';
import {
  calculateCongestionScore,
  calculateConfidence,
  generateForecast,
  rankRoutes
} from '../ai/trafficEngine.js';

import {
  DEMO_ROUTES_DATABASE,
  DEMO_INCIDENTS,
  CURRENT_WEATHER_DATA,
  MONITORED_ROUTES_FEED,
  PREDICTION_HISTORY
} from '../data/demoData.js';

const router = express.Router();

// Helper to look up or generate route candidates for source -> destination
function resolveRouteCandidates(source, destination) {
  const src = (source || 'Andheri').toLowerCase();
  const dest = (destination || 'Bandra').toLowerCase();

  const matchedGroup = DEMO_ROUTES_DATABASE.find(group => 
    group.source.toLowerCase() === src && group.destination.toLowerCase() === dest
  ) || DEMO_ROUTES_DATABASE.find(group =>
    group.source.toLowerCase().includes(src) || group.destination.toLowerCase().includes(dest)
  ) || DEMO_ROUTES_DATABASE[0]; // fallback to default Andheri -> Bandra

  return matchedGroup;
}

/**
 * GET /api/traffic/current
 */
router.get('/traffic/current', (req, res) => {
  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    monitoredRoutesCount: 24,
    congestionBreakdown: {
      high: 7,
      moderate: 10,
      low: 7
    },
    avgDelay: '+11 min',
    liveFeed: MONITORED_ROUTES_FEED
  });
});

/**
 * POST /api/traffic/predict
 */
router.post('/traffic/predict', (req, res) => {
  const {
    source = 'Andheri',
    destination = 'Bandra',
    departureTime = '6:30 PM',
    date = 'Today',
    weather = 'Rain',
    trafficCondition = 'Heavy',
    incident = 'None',
    event = 'Large Event',
    roadCapacity = 'medium'
  } = req.body || {};

  const inputParams = {
    source,
    destination,
    departureTime,
    date,
    weather,
    trafficCondition,
    incident,
    event,
    roadCapacity
  };

  const matchedGroup = resolveRouteCandidates(source, destination);

  // Score and rank all route options using AI Engine
  const rankingResult = rankRoutes(matchedGroup.routes, inputParams);

  // Primary prediction is based on the top ranked/recommended route
  const topRoute = rankingResult.routes[0];
  const confidence = calculateConfidence(inputParams);
  const forecastData = generateForecast(topRoute.congestionScore, departureTime);

  // Overall city congestion score for inputs
  const overallCongestion = calculateCongestionScore(inputParams);

  const predictionResult = {
    isDemo: true,
    disclaimer: 'Prototype data — simulated for demonstration',
    timestamp: new Date().toISOString(),
    inputSummary: inputParams,
    source: matchedGroup.source,
    destination: matchedGroup.destination,
    congestionScore: topRoute.congestionScore,
    congestionLevel: topRoute.congestionLevel,
    predictedTravelTime: topRoute.predictedTimeMin,
    normalTravelTime: topRoute.baseTimeMin,
    delay: topRoute.delayMin,
    confidence: `${confidence}%`,
    recommendedRoute: topRoute,
    routes: rankingResult.routes,
    recommendationRationale: rankingResult.recommendationRationale,
    forecast: forecastData.forecast,
    forecastTrendText: forecastData.trendText,
    whyPrediction: overallCongestion.breakdown
  };

  // Add to in-memory history log
  PREDICTION_HISTORY.unshift({
    id: `hist-${Date.now()}`,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: departureTime,
    source: matchedGroup.source,
    destination: matchedGroup.destination,
    predictedEta: `${topRoute.predictedTimeMin} min`,
    normalEta: `${topRoute.baseTimeMin} min`,
    delay: `+${topRoute.delayMin} min`,
    congestion: topRoute.congestionLevel,
    congestionScore: topRoute.congestionScore,
    recommendedRoute: topRoute.name,
    weather: weather
  });

  res.json(predictionResult);
});

/**
 * POST /api/route/compare
 */
router.post('/route/compare', (req, res) => {
  const { source, destination, ...inputs } = req.body || {};
  const matchedGroup = resolveRouteCandidates(source, destination);
  const rankingResult = rankRoutes(matchedGroup.routes, inputs);

  res.json({
    source: matchedGroup.source,
    destination: matchedGroup.destination,
    routes: rankingResult.routes,
    recommendationRationale: rankingResult.recommendationRationale
  });
});

/**
 * GET /api/routes
 */
router.get('/routes', (req, res) => {
  const locations = Array.from(new Set(
    DEMO_ROUTES_DATABASE.flatMap(g => [g.source, g.destination])
  ));

  res.json({
    availableLocations: locations,
    routeGroups: DEMO_ROUTES_DATABASE
  });
});

/**
 * GET /api/incidents
 */
router.get('/incidents', (req, res) => {
  res.json({
    count: DEMO_INCIDENTS.length,
    incidents: DEMO_INCIDENTS
  });
});

/**
 * POST /api/incidents
 */
router.post('/incidents', (req, res) => {
  const { type, location, severity, expectedDuration, title } = req.body || {};

  if (!location) {
    return res.status(400).json({ error: 'Location is required.' });
  }

  const newIncident = {
    id: `inc-${Date.now()}`,
    type: type || 'Road Work',
    title: title || `${type || 'Incident'} near ${location}`,
    location,
    severity: severity || 'Moderate',
    expectedImpact: `+${severity === 'Major' ? '18' : '9'} min delay`,
    timestamp: 'Just now',
    coordinates: [19.0760, 72.8777] // Default centroid
  };

  DEMO_INCIDENTS.unshift(newIncident);

  res.status(201).json({
    message: 'Incident added. Predictions updated.',
    incident: newIncident
  });
});

/**
 * GET /api/weather
 */
router.get('/weather', (req, res) => {
  res.json(CURRENT_WEATHER_DATA);
});

/**
 * GET /api/history
 */
router.get('/history', (req, res) => {
  res.json({
    count: PREDICTION_HISTORY.length,
    history: PREDICTION_HISTORY
  });
});

/**
 * GET /api/dashboard
 */
router.get('/dashboard', (req, res) => {
  res.json({
    greeting: 'Good evening',
    subtitle: "Here's your traffic intelligence overview.",
    stats: {
      currentCongestion: 'Moderate',
      avgDelay: '+12 min',
      routesMonitored: 24,
      predictedHighTrafficRoutes: 7
    },
    weather: CURRENT_WEATHER_DATA,
    incidents: DEMO_INCIDENTS.slice(0, 3),
    liveFeed: MONITORED_ROUTES_FEED.slice(0, 5)
  });
});

export default router;
