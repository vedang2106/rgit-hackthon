const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://trafficflow-backend-g80f.onrender.com/api';

export async function fetchDashboardData() {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard`);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend API offline, using fallback client data', err);
    return getFallbackDashboardData();
  }
}

export async function predictTraffic(params) {
  try {
    const res = await fetch(`${API_BASE_URL}/traffic/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Prediction request failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend API offline, generating local prediction mock', err);
    return getFallbackPrediction(params);
  }
}

export async function compareRoutes(params) {
  try {
    const res = await fetch(`${API_BASE_URL}/route/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Route comparison request failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend API offline', err);
    return null;
  }
}

export async function fetchIncidents() {
  try {
    const res = await fetch(`${API_BASE_URL}/incidents`);
    if (!res.ok) throw new Error('Incidents fetch failed');
    return await res.json();
  } catch (err) {
    return { count: 3, incidents: getFallbackIncidents() };
  }
}

export async function createIncident(incidentData) {
  try {
    const res = await fetch(`${API_BASE_URL}/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incidentData)
    });
    if (!res.ok) throw new Error('Create incident failed');
    return await res.json();
  } catch (err) {
    return {
      message: 'Incident added (Local fallback).',
      incident: { id: `inc-${Date.now()}`, ...incidentData, timestamp: 'Just now', expectedImpact: '+12 min' }
    };
  }
}

export async function fetchWeatherData() {
  try {
    const res = await fetch(`${API_BASE_URL}/weather`);
    if (!res.ok) throw new Error('Weather fetch failed');
    return await res.json();
  } catch (err) {
    return getFallbackWeather();
  }
}

export async function fetchPredictionHistory() {
  try {
    const res = await fetch(`${API_BASE_URL}/history`);
    if (!res.ok) throw new Error('History fetch failed');
    return await res.json();
  } catch (err) {
    return { count: 4, history: getFallbackHistory() };
  }
}

export async function fetchLiveTrafficFeed() {
  try {
    const res = await fetch(`${API_BASE_URL}/traffic/current`);
    if (!res.ok) throw new Error('Live traffic fetch failed');
    return await res.json();
  } catch (err) {
    return { liveFeed: getFallbackLiveFeed() };
  }
}

/* Fallback Mock Generators if Backend is unavailable */
function getFallbackDashboardData() {
  return {
    greeting: 'Good evening',
    subtitle: "Here's your traffic intelligence overview.",
    stats: {
      currentCongestion: 'Moderate',
      avgDelay: '+12 min',
      routesMonitored: 24,
      predictedHighTrafficRoutes: 7
    },
    weather: getFallbackWeather(),
    incidents: getFallbackIncidents(),
    liveFeed: getFallbackLiveFeed()
  };
}

function getFallbackIncidents() {
  return [
    { id: 'inc-1', type: 'Accident', title: 'Western Express Highway Collision', location: 'WEH Vile Parle', severity: 'Major', expectedImpact: '+18 min delay', timestamp: '15 min ago' },
    { id: 'inc-2', type: 'Road Work', title: 'Bridge Repair Works', location: 'Link Road Khar', severity: 'Moderate', expectedImpact: '+9 min delay', timestamp: '1 hour ago' },
    { id: 'inc-3', type: 'Event', title: 'BKC Concert Event', location: 'BKC Grounds', severity: 'Major', expectedImpact: '+15 min delay', timestamp: 'Started 2 hours ago' }
  ];
}

function getFallbackWeather() {
  return {
    temperature: '28°C',
    condition: 'Rain',
    humidity: '82%',
    windSpeed: '18 km/h',
    impactPoints: 12,
    description: 'Rain may reduce average road speed and increase travel time.'
  };
}

function getFallbackLiveFeed() {
  return [
    { id: '1', route: 'Andheri → Bandra', traffic: 'High', avgSpeed: '21 km/h', eta: '42 min', status: 'LIVE' },
    { id: '2', route: 'Bandra → Juhu', traffic: 'Moderate', avgSpeed: '34 km/h', eta: '26 min', status: 'LIVE' },
    { id: '3', route: 'Powai → BKC', traffic: 'Low', avgSpeed: '46 km/h', eta: '22 min', status: 'LIVE' },
    { id: '4', route: 'Dadar → Lower Parel', traffic: 'Severe', avgSpeed: '14 km/h', eta: '35 min', status: 'LIVE' }
  ];
}

function getFallbackHistory() {
  return [
    { id: 'h1', date: '05 Oct 2026', time: '18:30', source: 'Andheri', destination: 'Bandra', predictedEta: '31 min', normalEta: '28 min', delay: '+3 min', congestion: 'Low', recommendedRoute: 'New Link Road Bypass', weather: 'Rain' },
    { id: 'h2', date: '04 Oct 2026', time: '09:15', source: 'Powai', destination: 'BKC', predictedEta: '45 min', normalEta: '30 min', delay: '+15 min', congestion: 'High', recommendedRoute: 'LBS Marg Connector', weather: 'Clear' }
  ];
}

function getFallbackPrediction(params) {
  const isRain = (params.weather || '').includes('Rain');
  const isHeavy = (params.trafficCondition || '').includes('Heavy') || (params.trafficCondition || '').includes('Severe');
  
  const baseTime = 28;
  const delay = isRain ? (isHeavy ? 14 : 8) : 4;
  const predicted = baseTime + delay;

  return {
    isDemo: true,
    disclaimer: 'Prototype data — simulated for demonstration',
    timestamp: new Date().toISOString(),
    source: params.source || 'Andheri',
    destination: params.destination || 'Bandra',
    congestionScore: isHeavy ? 68 : 34,
    congestionLevel: isHeavy ? 'HIGH' : 'MODERATE',
    predictedTravelTime: predicted,
    normalTravelTime: baseTime,
    delay,
    confidence: '87%',
    recommendedRoute: {
      id: 'r3-link',
      name: 'New Link Road Bypass',
      via: 'Juhu Coastal Connector',
      distanceKm: 11.8,
      baseTimeMin: 26,
      predictedTimeMin: predicted,
      delayMin: delay,
      congestionScore: isHeavy ? 68 : 34,
      congestionLevel: isHeavy ? 'HIGH' : 'MODERATE',
      color: isHeavy ? '#F97316' : '#EAB308',
      isRecommended: true
    },
    routes: [
      { id: 'r1', name: 'Western Express Highway', via: 'WEH Arterial', distanceKm: 12.5, baseTimeMin: 28, predictedTimeMin: predicted + 12, delayMin: delay + 12, congestionScore: 82, congestionLevel: 'SEVERE', color: '#DC2626' },
      { id: 'r2', name: 'S.V. Road Alternative', via: 'SV Road Corridor', distanceKm: 14.2, baseTimeMin: 31, predictedTimeMin: predicted + 5, delayMin: delay + 5, congestionScore: 54, congestionLevel: 'HIGH', color: '#F97316' },
      { id: 'r3-link', name: 'New Link Road Bypass', via: 'Juhu Coastal Connector', distanceKm: 11.8, baseTimeMin: 26, predictedTimeMin: predicted, delayMin: delay, congestionScore: 34, congestionLevel: 'MODERATE', color: '#EAB308', isRecommended: true }
    ],
    forecast: [
      { minutes: 0, timeLabel: 'Now', score: 42, level: 'MODERATE', color: '#EAB308' },
      { minutes: 15, timeLabel: '+15 min', score: 55, level: 'HIGH', color: '#F97316' },
      { minutes: 30, timeLabel: '+30 min', score: 68, level: 'HIGH', color: '#F97316' },
      { minutes: 45, timeLabel: '+45 min', score: 74, level: 'HIGH', color: '#F97316' },
      { minutes: 60, timeLabel: '+60 min', score: 81, level: 'SEVERE', color: '#DC2626' }
    ],
    forecastTrendText: 'Traffic is expected to increase over the next 60 minutes.',
    whyPrediction: [
      { factor: 'Base Traffic Baseline', points: 20, note: 'Standard base city congestion index' },
      { factor: 'Time of Day', points: 30, note: 'Evening Peak (5 PM - 9 PM)' },
      { factor: 'Weather Condition', points: 12, note: 'Rain' },
      { factor: 'Live Traffic Feeds', points: 25, note: 'Heavy Baseline Traffic' },
      { factor: 'Nearby Events', points: 20, note: 'Large Public Event' }
    ]
  };
}
