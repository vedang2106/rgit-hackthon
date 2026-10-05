import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, MapPin, Layers, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

// Custom Leaflet Markers using HTML DivIcon for maximum reliability and styling
const createCustomIcon = (bgColor, borderColor, text = '') => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${bgColor};
        border: 3px solid ${borderColor};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 11px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      ">
        ${text}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const sourceIcon = createCustomIcon('#000000', '#F97316');
const destIcon = createCustomIcon('#F97316', '#FFFFFF');
const incidentIcon = createCustomIcon('#DC2626', '#FFFFFF', '🚨');

// Helper to auto-recenter and fit bounds when route or location changes
function MapRecenter({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [bounds, map]);
  return null;
}

export default function MapView({
  source = 'Andheri',
  destination = 'Bandra',
  routes = [],
  selectedRouteId = null,
  onSelectRoute = null,
  incidents = [],
  height = '500px'
}) {
  const [activeRouteId, setActiveRouteId] = useState(selectedRouteId);
  const [mapTileMode, setMapTileMode] = useState('street'); // 'street' (OpenStreetMap) or 'dark' (CartoDB)
  const [cardMinimized, setCardMinimized] = useState(false);

  useEffect(() => {
    if (selectedRouteId) {
      setActiveRouteId(selectedRouteId);
    } else if (routes.length > 0) {
      setActiveRouteId(routes[0].id);
    }
  }, [selectedRouteId, routes]);

  const activeRoute = routes.find(r => r.id === activeRouteId) || routes[0];

  const getColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'LOW': return '#16A34A';
      case 'MODERATE': return '#EAB308';
      case 'HIGH': return '#F97316';
      case 'SEVERE': return '#DC2626';
      default: return '#F97316';
    }
  };

  // Known Lat/Lng mapping for locations
  const locationCoordinates = {
    'andheri': [19.1197, 72.8464],
    'bandra': [19.0596, 72.8295],
    'powai': [19.1176, 72.9060],
    'bkc': [19.0650, 72.8680],
    'dadar': [19.0178, 72.8478],
    'lower parel': [19.0000, 72.8300],
    'thane': [19.2183, 72.9781],
    'borivali': [19.2307, 72.8567],
    'juhu': [19.1070, 72.8260]
  };

  const srcKey = (source || 'Andheri').toLowerCase();
  const destKey = (destination || 'Bandra').toLowerCase();

  const srcPos = locationCoordinates[srcKey] || [19.1197, 72.8464];
  const destPos = locationCoordinates[destKey] || [19.0596, 72.8295];

  // Default routes fallback if waypoints not provided
  const parsedRoutes = routes.map((r, idx) => {
    let waypoints = r.waypoints;
    if (!waypoints || waypoints.length < 2) {
      const midLat = (srcPos[0] + destPos[0]) / 2;
      const midLng = (srcPos[1] + destPos[1]) / 2;
      const offset = (idx - 1) * 0.015;
      waypoints = [
        srcPos,
        [midLat + offset, midLng - offset],
        destPos
      ];
    }
    return {
      ...r,
      waypoints
    };
  });

  const allPoints = [srcPos, destPos, ...parsedRoutes.flatMap(r => r.waypoints)];

  const tileUrls = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  };

  const tileAttributions = {
    street: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    dark: '&copy; <a href="https://carto.com/">CARTO</a>'
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-900 text-white" style={{ height }}>
      
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gray-700/60 flex items-center gap-2 shadow-lg text-xs">
          <Navigation className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="font-bold text-white">Live OpenStreetMap</span>
          <span className="text-gray-400">|</span>
          <span className="text-orange-400 font-bold">{source} → {destination}</span>
        </div>

        {/* Legend & Map Style Switch */}
        <div className="pointer-events-auto bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-700/60 flex items-center gap-3 shadow-lg text-xs">
          <button
            onClick={() => setMapTileMode(mapTileMode === 'street' ? 'dark' : 'street')}
            className="px-2 py-0.5 bg-orange-500 text-white font-bold text-[10px] rounded hover:bg-orange-600 cursor-pointer transition-colors"
          >
            {mapTileMode === 'street' ? '🗺️ Carto View' : '🛣️ Street Map'}
          </button>
          
          <div className="h-3 w-px bg-gray-600" />

          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-gray-300">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-gray-300">Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-gray-300">High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="text-gray-300">Severe</span>
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        center={srcPos}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution={tileAttributions[mapTileMode]}
          url={tileUrls[mapTileMode]}
        />

        <MapRecenter bounds={allPoints} />

        {/* Route Corridor Polylines */}
        {parsedRoutes.map((r) => {
          const isSelected = activeRouteId === r.id;
          const routeColor = getColor(r.congestionLevel);

          return (
            <Polyline
              key={r.id}
              positions={r.waypoints}
              pathOptions={{
                color: routeColor,
                weight: isSelected ? 7 : 4,
                opacity: isSelected ? 0.95 : 0.5,
                dashArray: isSelected ? null : '6, 8'
              }}
              eventHandlers={{
                click: () => {
                  setActiveRouteId(r.id);
                  if (onSelectRoute) onSelectRoute(r);
                }
              }}
            >
              <Popup>
                <div className="text-xs space-y-1 p-1">
                  <strong className="font-extrabold text-sm block text-gray-900">{r.name}</strong>
                  <p className="text-gray-600">via {r.via}</p>
                  <p className="font-bold text-orange-600">ETA: {r.predictedTimeMin || r.predictedTravelTime} min</p>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Source Pin Marker with Permanent Visible Label Tooltip */}
        <Marker position={srcPos} icon={sourceIcon}>
          <Tooltip permanent direction="top" offset={[0, -14]} className="font-extrabold text-xs bg-black text-white px-2 py-1 rounded-md shadow-md border border-gray-700">
            📍 Source: {source}
          </Tooltip>
        </Marker>

        {/* Destination Pin Marker with Permanent Visible Label Tooltip */}
        <Marker position={destPos} icon={destIcon}>
          <Tooltip permanent direction="top" offset={[0, -14]} className="font-extrabold text-xs bg-orange-600 text-white px-2 py-1 rounded-md shadow-md border border-orange-400">
            🏁 Destination: {destination}
          </Tooltip>
        </Marker>

        {/* Active Incident Pin */}
        <Marker position={[(srcPos[0] + destPos[0]) / 2, (srcPos[1] + destPos[1]) / 2]} icon={incidentIcon}>
          <Popup>
            <div className="text-xs text-red-900 p-1">
              <strong className="font-extrabold block">🚨 Road Work / Accident Bottleneck</strong>
              <span>Impact: +18 min delay</span>
            </div>
          </Popup>
        </Marker>

      </MapContainer>

      {/* Map Interactive Route Selector Pills (Top-Left) */}
      <div className="absolute top-14 left-3 z-30 flex flex-col gap-1.5 max-w-xs">
        {routes.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setActiveRouteId(r.id);
              if (onSelectRoute) onSelectRoute(r);
            }}
            className={`px-3 py-1.5 rounded-lg text-left text-xs transition-all shadow-md flex items-center justify-between cursor-pointer ${
              activeRouteId === r.id
                ? 'bg-orange-500 text-white font-bold ring-2 ring-orange-300'
                : 'bg-black/85 hover:bg-black/95 text-gray-200 border border-gray-700'
            }`}
          >
            <span className="truncate pr-2">{r.name}</span>
            <span className="font-mono text-[11px]">{r.predictedTimeMin || r.predictedTravelTime}m</span>
          </button>
        ))}
      </div>

      {/* Repositioned Sleek Overlay Card (Bottom-Right, Compact & Minimizable) */}
      {activeRoute && (
        <div className="absolute bottom-3 right-3 z-30 bg-white/95 backdrop-blur-md text-black rounded-2xl border border-gray-200 shadow-2xl w-80 transition-all">
          
          {/* Card Header with Minimize Button */}
          <div
            onClick={() => setCardMinimized(!cardMinimized)}
            className="p-3 border-b border-gray-100 flex items-center justify-between cursor-pointer bg-gray-50/80 rounded-t-2xl"
          >
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-gray-900 truncate max-w-[170px]">{activeRoute.name}</span>
              {activeRoute.isRecommended && (
                <span className="px-1.5 py-0.5 bg-orange-500 text-white font-bold text-[9px] rounded-md uppercase">
                  ⭐ Best
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-orange-600">
                {activeRoute.predictedTimeMin || activeRoute.predictedTravelTime} m
              </span>
              <button className="text-gray-500 hover:text-black">
                {cardMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable Details Body */}
          {!cardMinimized && (
            <div className="p-3.5 space-y-2 text-xs">
              <p className="text-[11px] text-gray-500">via {activeRoute.via}</p>

              <div className="flex items-center justify-between border-t border-b border-gray-100 py-2">
                <div>
                  <span className="text-gray-400 text-[10px] block">Distance</span>
                  <strong className="text-gray-900 font-bold">{activeRoute.distanceKm} km</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Expected Delay</span>
                  <strong className="text-red-600 font-bold">+{activeRoute.delayMin || activeRoute.delay || 0} min</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Baseline</span>
                  <span className="text-gray-600 font-medium">{activeRoute.baseTimeMin || activeRoute.normalTravelTime} min</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-gray-400">Status</span>
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase"
                  style={{ backgroundColor: getColor(activeRoute.congestionLevel) }}
                >
                  {activeRoute.congestionLevel} CONGESTION
                </span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
