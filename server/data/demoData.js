/**
 * Demo / Prototype Data Store
 * Includes realistic Mumbai city routes, live monitoring endpoints, incidents, weather, and prediction history.
 */

export const DEMO_ROUTES_DATABASE = [
  {
    id: 'andheri-bandra',
    source: 'Andheri',
    destination: 'Bandra',
    routes: [
      {
        id: 'r1-weh',
        name: 'Western Express Highway',
        via: 'WEH Main Arterial',
        distanceKm: 12.5,
        baseSpeedKmh: 42,
        roadCapacity: 'high',
        scoreModifier: 5,
        waypoints: [
          [19.1197, 72.8464], // Andheri
          [19.0980, 72.8540], // Vile Parle
          [19.0750, 72.8480], // Santacruz
          [19.0596, 72.8295]  // Bandra
        ],
        description: 'Main highway route. High speed limit but prone to choke points at peak hours.'
      },
      {
        id: 'r2-svroad',
        name: 'S.V. Road Alternative',
        via: 'SV Road & Khar Signal',
        distanceKm: 14.2,
        baseSpeedKmh: 35,
        roadCapacity: 'medium',
        scoreModifier: -5,
        waypoints: [
          [19.1197, 72.8464], // Andheri
          [19.1020, 72.8390], // Vile Parle West
          [19.0800, 72.8350], // Khar West
          [19.0596, 72.8295]  // Bandra
        ],
        description: 'Urban arterial corridor. Lower speed cap but bypasses highway flyover bottlenecks.'
      },
      {
        id: 'r3-linkroad',
        name: 'New Link Road Bypass',
        via: 'Juhu Coastal Connector',
        distanceKm: 11.8,
        baseSpeedKmh: 38,
        roadCapacity: 'high',
        scoreModifier: -10,
        waypoints: [
          [19.1197, 72.8464], // Andheri
          [19.1070, 72.8260], // Juhu Beach
          [19.0730, 72.8250], // Bandra Bandstand Outer
          [19.0596, 72.8295]  // Bandra
        ],
        description: 'Coastal bypass line. Smooth traffic flow with signal-synchronized signals.'
      }
    ]
  },
  {
    id: 'powai-bkc',
    source: 'Powai',
    destination: 'BKC',
    routes: [
      {
        id: 'r-powai-bkc-1',
        name: 'JVLR to Eastern Express',
        via: 'JVLR Highway',
        distanceKm: 15.1,
        baseSpeedKmh: 45,
        roadCapacity: 'high',
        scoreModifier: 8,
        waypoints: [
          [19.1176, 72.9060], // Powai
          [19.1150, 72.8850], // Kanjurmarg
          [19.0700, 72.8750], // Kurla
          [19.0650, 72.8680]  // BKC
        ]
      },
      {
        id: 'r-powai-bkc-2',
        name: 'LBS Marg Connector',
        via: 'Ghatkopar West',
        distanceKm: 13.6,
        baseSpeedKmh: 36,
        roadCapacity: 'medium',
        scoreModifier: -2,
        waypoints: [
          [19.1176, 72.9060], // Powai
          [19.0900, 72.8900], // Ghatkopar
          [19.0650, 72.8680]  // BKC
        ]
      }
    ]
  },
  {
    id: 'bandra-juhu',
    source: 'Bandra',
    destination: 'Juhu',
    routes: [
      {
        id: 'r-bj-1',
        name: 'Carter Road Coastal Corridor',
        via: 'Carter Road',
        distanceKm: 7.2,
        baseSpeedKmh: 35,
        roadCapacity: 'medium',
        scoreModifier: 0,
        waypoints: [
          [19.0596, 72.8295], // Bandra
          [19.0700, 72.8220], // Khar Seafront
          [19.1070, 72.8260]  // Juhu
        ]
      }
    ]
  },
  {
    id: 'dadar-lowerparel',
    source: 'Dadar',
    destination: 'Lower Parel',
    routes: [
      {
        id: 'r-dlp-1',
        name: 'Senapati Bapat Marg',
        via: 'Currey Road Bridge',
        distanceKm: 4.8,
        baseSpeedKmh: 28,
        roadCapacity: 'medium',
        scoreModifier: 5,
        waypoints: [
          [19.0178, 72.8478], // Dadar
          [19.0000, 72.8300]  // Lower Parel
        ]
      }
    ]
  },
  {
    id: 'thane-bkc',
    source: 'Thane',
    destination: 'BKC',
    routes: [
      {
        id: 'r-tb-1',
        name: 'Eastern Express Highway Direct',
        via: 'EEH & Chembur Flyover',
        distanceKm: 24.5,
        baseSpeedKmh: 50,
        roadCapacity: 'high',
        scoreModifier: 12,
        waypoints: [
          [19.2183, 72.9781], // Thane
          [19.1300, 72.9300], // Vikhroli
          [19.0650, 72.8680]  // BKC
        ]
      }
    ]
  },
  {
    id: 'borivali-andheri',
    source: 'Borivali',
    destination: 'Andheri',
    routes: [
      {
        id: 'r-ba-1',
        name: 'WEH Express Corridor',
        via: 'Malad Flyover',
        distanceKm: 16.2,
        baseSpeedKmh: 44,
        roadCapacity: 'high',
        scoreModifier: 10,
        waypoints: [
          [19.2307, 72.8567], // Borivali
          [19.1800, 72.8500], // Goregaon
          [19.1197, 72.8464]  // Andheri
        ]
      }
    ]
  }
];

export let DEMO_INCIDENTS = [
  {
    id: 'inc-101',
    type: 'Accident',
    title: 'Major Multi-Vehicle Collision',
    location: 'Western Express Highway (Vile Parle Southbound)',
    severity: 'Major',
    expectedImpact: '+18 min delay',
    timestamp: '15 mins ago',
    coordinates: [19.0980, 72.8540]
  },
  {
    id: 'inc-102',
    type: 'Road Work',
    title: 'Metro Line Bridge Maintenance',
    location: 'Link Road (Khar Section)',
    severity: 'Moderate',
    expectedImpact: '+9 min delay',
    timestamp: '1 hour ago',
    coordinates: [19.0800, 72.8350]
  },
  {
    id: 'inc-103',
    type: 'Event',
    title: 'Public Concert & Exhibition',
    location: 'Bandra Kurla Complex (BKC Grounds)',
    severity: 'Major',
    expectedImpact: '+15 min delay',
    timestamp: 'Started 2 hours ago',
    coordinates: [19.0650, 72.8680]
  }
];

export const CURRENT_WEATHER_DATA = {
  temperature: '28°C',
  condition: 'Rain',
  humidity: '82%',
  windSpeed: '18 km/h',
  visibility: '4.2 km',
  impactPoints: 12,
  description: 'Moderate rain reduced overall road speeds across major corridors by ~18%.'
};

export const MONITORED_ROUTES_FEED = [
  { id: 'feed-1', route: 'Andheri → Bandra', traffic: 'High', avgSpeed: '21 km/h', eta: '42 min', status: 'LIVE', change: '+3 min' },
  { id: 'feed-2', route: 'Bandra → Juhu', traffic: 'Moderate', avgSpeed: '34 km/h', eta: '26 min', status: 'LIVE', change: '-1 min' },
  { id: 'feed-3', route: 'Powai → BKC', traffic: 'Low', avgSpeed: '46 km/h', eta: '22 min', status: 'LIVE', change: '0 min' },
  { id: 'feed-4', route: 'Dadar → Lower Parel', traffic: 'Severe', avgSpeed: '14 km/h', eta: '35 min', status: 'LIVE', change: '+7 min' },
  { id: 'feed-5', route: 'Thane → BKC', traffic: 'High', avgSpeed: '28 km/h', eta: '58 min', status: 'LIVE', change: '+4 min' },
  { id: 'feed-6', route: 'Borivali → Andheri', traffic: 'Moderate', avgSpeed: '36 km/h', eta: '31 min', status: 'LIVE', change: '-2 min' },
  { id: 'feed-7', route: 'Worli → Nariman Point', traffic: 'Low', avgSpeed: '48 km/h', eta: '18 min', status: 'LIVE', change: '0 min' },
  { id: 'feed-8', route: 'Chembur → BKC Connector', traffic: 'High', avgSpeed: '22 km/h', eta: '29 min', status: 'LIVE', change: '+2 min' }
];

export let PREDICTION_HISTORY = [
  {
    id: 'hist-1',
    date: '05 Oct 2026',
    time: '18:30',
    source: 'Andheri',
    destination: 'Bandra',
    predictedEta: '31 min',
    normalEta: '28 min',
    delay: '+3 min',
    congestion: 'Low',
    congestionScore: 24,
    recommendedRoute: 'New Link Road Bypass',
    weather: 'Rain'
  },
  {
    id: 'hist-2',
    date: '04 Oct 2026',
    time: '09:15',
    source: 'Powai',
    destination: 'BKC',
    predictedEta: '45 min',
    normalEta: '30 min',
    delay: '+15 min',
    congestion: 'High',
    congestionScore: 68,
    recommendedRoute: 'LBS Marg Connector',
    weather: 'Clear'
  },
  {
    id: 'hist-3',
    date: '03 Oct 2026',
    time: '17:45',
    source: 'Borivali',
    destination: 'Andheri',
    predictedEta: '52 min',
    normalEta: '32 min',
    delay: '+20 min',
    congestion: 'Severe',
    congestionScore: 84,
    recommendedRoute: 'WEH Express Corridor',
    weather: 'Heavy Rain'
  },
  {
    id: 'hist-4',
    date: '02 Oct 2026',
    time: '14:00',
    source: 'Dadar',
    destination: 'Lower Parel',
    predictedEta: '16 min',
    normalEta: '14 min',
    delay: '+2 min',
    congestion: 'Low',
    congestionScore: 18,
    recommendedRoute: 'Senapati Bapat Marg',
    weather: 'Clear'
  }
];
