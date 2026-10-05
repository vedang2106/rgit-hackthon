# TrafficFlow AI 🚦
> **Predict traffic. Plan smarter.**

TrafficFlow AI is a complete, polished AI-powered traffic congestion prediction and multi-route optimization platform. It combines historical traffic patterns, time of day, day of week, weather conditions, active incidents, events, and road capacities to predict future travel times and recommend the fastest, lowest-risk routes.

---

## 🌟 Key Features

1. **Deterministic Rule-Based AI Engine**:
   - Scores congestion on a scale of `0–100` using weighted environmental and situational factors.
   - Calculates realistic travel times using congestion multipliers (`1.0x` Low, `1.2x` Moderate, `1.5x` High, `1.9x` Severe).
2. **60-Minute Future Congestion Forecast**:
   - Generates interactive Recharts trend curves for `+15m`, `+30m`, `+45m`, and `+60m` time horizons.
3. **Multi-Route Scoring & Recommendation**:
   - Evaluates up to 3 parallel corridors simultaneously using a weighted composite score (40% travel time, 30% congestion, 15% delay, 10% distance, 5% incident risk).
   - Recommends the optimal route with complete rationale breakdown.
4. **Transparent Explainability ("Why this prediction?")**:
   - Provides itemized factor score audits showing exact point additions (+25 for Evening Peak, +12 for Rain, etc.).
5. **Interactive City Corridor Map**:
   - Custom SVG vector map view with route polylines, start/destination pins, incident markers, and interactive route pills.
6. **Dynamic Heatmap Forecast**:
   - City corridor heat density map with time horizon filters (`Now`, `+15m`, `+30m`, `+45m`, `+60m`).
7. **Live Traffic Corridor Feed**:
   - Simulated 12-second live polling telemetry updating speeds, ETAs, and status.
8. **Incident Management System**:
   - Allows users to report new road accidents, construction, closures, or events which immediately feed back into the AI scoring engine.
9. **Hackathon Demo Mode**:
   - Dedicated "Hackathon Demo Mode" quick-fill button that auto-runs the complete Andheri → Bandra rainy peak-hour demonstration.

---

## 🎨 Theme & Aesthetic Guidelines

- **Background**: Clean White (`#FFFFFF`)
- **Primary Accent**: Vibrant Orange (`#F97316` / `#EA580C`)
- **Secondary**: Deep Black (`#111111`) / Dark Gray (`#374151`)
- **Congestion Indicators**: Green (`Low`), Yellow (`Moderate`), Orange (`High`), Red (`Severe`)
- **Design Philosophy**: Modern SaaS dashboard with Google Maps usability and state-of-the-art transportation intelligence styling.

---

## 🏗️ Tech Stack

### Frontend
- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **Lucide React Icons**
- **Recharts** (Time-series data visualization)
- **React Router v7**

### Backend
- **Node.js** + **Express.js**
- **RESTful API Services**
- **MongoDB-ready architecture**

---

## 🧠 AI Rule Engine Formula

The AI Engine (`/server/ai/trafficEngine.js`) calculates a clamped score `0–100`:

$$\text{Congestion Score} = \text{Base}(20) + \text{Time} + \text{Weather} + \text{Traffic} + \text{Incident} + \text{Event} + \text{RoadFactor}$$

| Factor | Condition | Points |
| :--- | :--- | :--- |
| **Time of Day** | Morning Peak (7-10 AM) / Evening Peak (5-9 PM) | `+25` / `+30` |
| **Weekend** | Saturday / Sunday | `-10` |
| **Weather** | Rain / Heavy Rain / Fog | `+12` / `+20` / `+15` |
| **Live Traffic** | Low / Moderate / Heavy / Severe | `+5` / `+15` / `+25` / `+35` |
| **Incidents** | Minor Accident / Major Accident / Road Closure | `+10` / `+25` / `+30` |
| **Events** | Local Match / Large Public Event | `+8` / `+20` |
| **Road Capacity** | High / Medium / Low Capacity | `-5` / `+5` / `+15` |

---

## 📁 Project Structure

```
trafficflow-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DemoBanner.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── ForecastChart.jsx
│   │   │   ├── HeatmapView.jsx
│   │   │   ├── ExplainabilityModal.jsx
│   │   │   └── IncidentModal.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── PredictorPage.jsx
│   │   │   ├── RouteComparisonPage.jsx
│   │   │   ├── PredictionDetailsPage.jsx
│   │   │   ├── LiveTrafficPage.jsx
│   │   │   ├── HeatmapPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── HowItWorksPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── ai/
│   │   └── trafficEngine.js       # Rule-Based Traffic Intelligence Engine
│   ├── routes/
│   │   └── apiRoutes.js           # REST API endpoints
│   ├── data/
│   │   └── demoData.js            # Mumbai routes, incidents, weather data
│   ├── index.js                   # Express server setup (Port 5000)
│   └── package.json
│
├── .env.example
├── README.md
└── package.json
```

---

## 🚀 Quick Start & Installation

### 1. Start Express Backend
```bash
cd server
npm install
npm start
```
*Backend will run at http://localhost:5000*

### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run at http://localhost:5173*

---

## 🔮 Future ML Integration Architecture

The application is structured to decouple frontend UI from backend prediction logic. To upgrade from the Rule-Based AI Engine to a Machine Learning Model:

```
[ React Dashboard ]
       ↓
[ Express Backend Proxy ]
       ↓
[ Python FastAPI Service ]
       ↓
[ Trained Random Forest Model (.joblib) ]
       ↓
[ Inference Response ]
```

Simply swap the handler in `/server/ai/trafficEngine.js` to dispatch an HTTP POST request to the Python FastAPI endpoint.

---

## 🏆 Hackathon Demo Flow

1. Open http://localhost:5173.
2. Click **"Hackathon Demo Mode"** in the top navigation bar.
3. Observe auto-filled parameters: **Andheri → Bandra**, **6:30 PM**, **Rain**, **Heavy Traffic**, **Large Event**.
4. Click **"Predict Traffic"**.
5. Watch the step-by-step loading animation.
6. Inspect the recommended route (**New Link Road Bypass**), the 60-minute forecast curve, and click **"Why this prediction?"** for the itemized factor audit.
