/**
 * Traffic Intelligence Engine (Rule-Based AI Engine)
 * 
 * Modular architecture designed to easily swap out RuleBasedEngine with an ML Engine (FastAPI/Python Random Forest) in production.
 */

// Helper to parse departure time string (HH:MM or standard time formats) into hour of day
export function parseHourFromDeparture(departureTime) {
  if (!departureTime) return new Date().getHours();
  
  // Handle "Now" or ISO date strings or "HH:MM"
  if (departureTime.toLowerCase() === 'now') {
    return new Date().getHours();
  }

  const timeMatch = departureTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3];
    if (ampm) {
      if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
    }
    return hours + (minutes / 60);
  }

  const dateObj = new Date(departureTime);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.getHours() + (dateObj.getMinutes() / 60);
  }

  return new Date().getHours();
}

export function calculateTimeFactor(departureTime, dateString) {
  const hour = parseHourFromDeparture(departureTime);
  
  let dateObj = new Date();
  if (dateString && dateString !== 'Today') {
    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) dateObj = parsed;
  }
  const dayOfWeek = dateObj.getDay();
  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

  let points = 0;
  let label = 'Normal Hours';

  // Peak Hours check
  if (hour >= 7 && hour < 10) {
    points = 25;
    label = 'Morning Peak (7 AM - 10 AM)';
  } else if (hour >= 17 && hour < 21) {
    points = 30;
    label = 'Evening Peak (5 PM - 9 PM)';
  } else if (hour >= 10 && hour < 17) {
    points = 10;
    label = 'Midday Transit';
  } else if (hour >= 21 || hour < 5) {
    points = 0;
    label = 'Late Night / Early Morning';
  } else {
    points = 5;
    label = 'Off-Peak Hours';
  }

  let weekendAdjustment = 0;
  if (isWeekend) {
    weekendAdjustment = -10;
  }

  return {
    points: points + weekendAdjustment,
    basePoints: points,
    weekendAdjustment,
    label: isWeekend ? `${label} (Weekend)` : label,
    hour
  };
}

export function calculateWeatherFactor(weather) {
  const w = (weather || 'clear').toLowerCase();
  if (w.includes('heavy rain')) {
    return { points: 20, label: 'Heavy Rain' };
  } else if (w.includes('rain')) {
    return { points: 12, label: 'Rain' };
  } else if (w.includes('fog')) {
    return { points: 15, label: 'Dense Fog' };
  } else if (w.includes('cloud')) {
    return { points: 3, label: 'Cloudy' };
  } else {
    return { points: 0, label: 'Clear / Sunny' };
  }
}

export function calculateTrafficFactor(trafficCondition) {
  const t = (trafficCondition || 'moderate').toLowerCase();
  if (t === 'severe') {
    return { points: 35, label: 'Severe Baseline Traffic' };
  } else if (t === 'heavy') {
    return { points: 25, label: 'Heavy Baseline Traffic' };
  } else if (t === 'moderate') {
    return { points: 15, label: 'Moderate Baseline Traffic' };
  } else {
    return { points: 5, label: 'Low Baseline Traffic' };
  }
}

export function calculateIncidentFactor(incident) {
  const inc = (incident || 'none').toLowerCase();
  if (inc.includes('road closure') || inc.includes('closure')) {
    return { points: 30, label: 'Road Closure Reported' };
  } else if (inc.includes('major accident') || inc.includes('major')) {
    return { points: 25, label: 'Major Traffic Accident' };
  } else if (inc.includes('minor accident') || inc.includes('accident')) {
    return { points: 10, label: 'Minor Accident' };
  } else if (inc.includes('road work') || inc.includes('construction')) {
    return { points: 15, label: 'Active Road Work' };
  } else {
    return { points: 0, label: 'No Active Incidents' };
  }
}

export function calculateEventFactor(event) {
  const ev = (event || 'none').toLowerCase();
  if (ev.includes('festival') || ev.includes('public event') || ev.includes('large')) {
    return { points: 20, label: 'Large Public Event / Festival' };
  } else if (ev.includes('concert') || ev.includes('match') || ev.includes('small') || ev !== 'none') {
    return { points: 8, label: 'Localized Event / Concert / Match' };
  } else {
    return { points: 0, label: 'No Major Events' };
  }
}

export function calculateRoadFactor(roadCapacity = 'medium') {
  const r = (roadCapacity || 'medium').toLowerCase();
  if (r === 'high') {
    return { points: -5, label: 'High Capacity Highway (-5 pts)' };
  } else if (r === 'low') {
    return { points: 15, label: 'Narrow Arterial Road (+15 pts)' };
  } else {
    return { points: 5, label: 'Standard Urban Road (+5 pts)' };
  }
}

export function getCongestionLevel(score) {
  if (score <= 25) return { level: 'LOW', color: '#16A34A', bgClass: 'bg-green-100 text-green-800 border-green-300', multiplier: 1.0 };
  if (score <= 50) return { level: 'MODERATE', color: '#EAB308', bgClass: 'bg-amber-100 text-amber-800 border-amber-300', multiplier: 1.2 };
  if (score <= 75) return { level: 'HIGH', color: '#F97316', bgClass: 'bg-orange-100 text-orange-800 border-orange-300', multiplier: 1.5 };
  return { level: 'SEVERE', color: '#DC2626', bgClass: 'bg-red-100 text-red-800 border-red-300', multiplier: 1.9 };
}

export function calculateCongestionScore(inputs) {
  const BASE_SCORE = 20;

  const timeFactor = calculateTimeFactor(inputs.departureTime, inputs.date);
  const weatherFactor = calculateWeatherFactor(inputs.weather);
  const trafficFactor = calculateTrafficFactor(inputs.trafficCondition);
  const incidentFactor = calculateIncidentFactor(inputs.incident);
  const eventFactor = calculateEventFactor(inputs.event);
  const roadFactor = calculateRoadFactor(inputs.roadCapacity || 'medium');

  const rawScore = BASE_SCORE +
    timeFactor.points +
    weatherFactor.points +
    trafficFactor.points +
    incidentFactor.points +
    eventFactor.points +
    roadFactor.points;

  const clampedScore = Math.min(100, Math.max(0, rawScore));
  const levelInfo = getCongestionLevel(clampedScore);

  const breakdown = [
    { factor: 'Base Traffic Baseline', points: BASE_SCORE, note: 'Standard base city congestion index' },
    { factor: 'Time of Day', points: timeFactor.points, note: timeFactor.label },
    { factor: 'Weather Condition', points: weatherFactor.points, note: weatherFactor.label },
    { factor: 'Live Traffic Feeds', points: trafficFactor.points, note: trafficFactor.label },
    { factor: 'Road Incidents', points: incidentFactor.points, note: incidentFactor.label },
    { factor: 'Nearby Events', points: eventFactor.points, note: eventFactor.label },
    { factor: 'Road Capacity Class', points: roadFactor.points, note: roadFactor.label }
  ];

  return {
    score: clampedScore,
    rawScore,
    level: levelInfo.level,
    color: levelInfo.color,
    multiplier: levelInfo.multiplier,
    bgClass: levelInfo.bgClass,
    breakdown
  };
}

export function predictTravelTime(distanceKm, baseSpeedKmh, congestionScore) {
  const levelInfo = getCongestionLevel(congestionScore);
  const multiplier = levelInfo.multiplier;
  
  // Base travel time in minutes
  const normalTravelTime = Math.round((distanceKm / baseSpeedKmh) * 60);
  const predictedTravelTime = Math.round(normalTravelTime * multiplier);
  const delay = Math.max(0, predictedTravelTime - normalTravelTime);

  return {
    distanceKm: parseFloat(distanceKm.toFixed(1)),
    baseSpeedKmh,
    normalTravelTime,
    predictedTravelTime,
    delay,
    multiplier
  };
}

export function calculateConfidence(inputs) {
  let score = 92; // default high confidence for prototype demo

  if (!inputs.weather || inputs.weather === 'Clear') score -= 2;
  if (inputs.incident && inputs.incident !== 'None') score += 3; // active incident data increases precision
  if (inputs.event && inputs.event !== 'None') score += 2;

  // Clamp 75% to 96%
  score = Math.min(96, Math.max(72, score));
  return score;
}

export function generateForecast(baseScore, departureTime) {
  const hour = parseHourFromDeparture(departureTime);
  
  // Predict trends for +15m, +30m, +45m, +60m
  const intervals = [0, 15, 30, 45, 60];
  
  // If approaching peak hours (e.g. 7-8 AM or 5-6 PM), score tends to rise
  // If leaving peak hours (e.g. 9-10 AM or 8-9 PM), score tends to fall
  let rateOfChange = 0;
  if ((hour >= 6.5 && hour < 8.5) || (hour >= 16.5 && hour < 18.5)) {
    rateOfChange = 0.4; // Increasing congestion
  } else if ((hour >= 9 && hour < 11) || (hour >= 20 && hour < 22)) {
    rateOfChange = -0.3; // Easing congestion
  } else {
    rateOfChange = 0.1; // Slight variation
  }

  const forecast = intervals.map((mins) => {
    // Add minor realistic non-linear curve
    const delta = Math.round(mins * rateOfChange + Math.sin(mins / 10) * 2);
    const forecastedScore = Math.min(100, Math.max(10, baseScore + delta));
    const levelObj = getCongestionLevel(forecastedScore);

    const timeLabel = mins === 0 ? 'Now' : `+${mins} min`;
    
    return {
      minutes: mins,
      timeLabel,
      score: forecastedScore,
      level: levelObj.level,
      color: levelObj.color
    };
  });

  const trendText = rateOfChange > 0.2
    ? 'Traffic is expected to INCREASE over the next 60 minutes due to peak commute progression.'
    : rateOfChange < -0.1
    ? 'Traffic is expected to IMPROVE over the next 60 minutes as peak period dissipates.'
    : 'Traffic conditions are forecasted to remain STABLE over the next hour.';

  return { forecast, trendText };
}

/**
 * Score and Rank Multi-routes
 * Route Score = 40% predicted travel time + 30% congestion + 15% delay + 10% distance + 5% incident risk
 */
export function rankRoutes(routeList, globalInputs) {
  const scoredRoutes = routeList.map((route, idx) => {
    // Individual route specific adjustments
    const routeRoadCapacity = route.roadCapacity || 'medium';
    const routeIncident = route.incident || globalInputs.incident || 'None';
    
    const routeInputs = {
      ...globalInputs,
      roadCapacity: routeRoadCapacity,
      incident: routeIncident
    };

    const congestionRes = calculateCongestionScore(routeInputs);
    // Apply route specific factor adjustment to score
    const finalScore = Math.min(100, Math.max(0, congestionRes.score + (route.scoreModifier || 0)));
    const levelInfo = getCongestionLevel(finalScore);

    const timeRes = predictTravelTime(route.distanceKm, route.baseSpeedKmh || 40, finalScore);

    // Calculate composite score (lower is better)
    const compositeScore = 
      (timeRes.predictedTravelTime * 0.40) +
      (finalScore * 0.30) +
      (timeRes.delay * 0.15) +
      (route.distanceKm * 0.10) +
      ((routeIncident !== 'None' ? 25 : 0) * 0.05);

    return {
      id: route.id || `route-${idx + 1}`,
      name: route.name,
      via: route.via,
      distanceKm: timeRes.distanceKm,
      baseTimeMin: timeRes.normalTravelTime,
      predictedTimeMin: timeRes.predictedTravelTime,
      delayMin: timeRes.delay,
      congestionScore: finalScore,
      congestionLevel: levelInfo.level,
      color: levelInfo.color,
      bgClass: levelInfo.bgClass,
      multiplier: timeRes.multiplier,
      compositeScore: parseFloat(compositeScore.toFixed(2)),
      waypoints: route.waypoints || [],
      incidents: routeIncident !== 'None' ? [routeIncident] : [],
      description: route.description || ''
    };
  });

  // Sort by composite score ascending (lowest score is best)
  scoredRoutes.sort((a, b) => a.compositeScore - b.compositeScore);

  // Mark best route as recommended
  scoredRoutes.forEach((r, idx) => {
    r.rank = idx + 1;
    r.isRecommended = (idx === 0);
  });

  const bestRoute = scoredRoutes[0];
  const recommendationRationale = `Route "${bestRoute.name}" (via ${bestRoute.via}) is recommended because it offers the fastest predicted travel time (${bestRoute.predictedTimeMin} min) with ${bestRoute.congestionLevel.toLowerCase()} congestion score (${bestRoute.congestionScore}/100) and minimal delay (+${bestRoute.delayMin} min).`;

  return {
    routes: scoredRoutes,
    recommendedRouteId: bestRoute.id,
    recommendationRationale
  };
}
