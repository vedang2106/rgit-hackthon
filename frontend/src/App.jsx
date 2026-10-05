import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoBanner from './components/DemoBanner';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PredictorPage from './pages/PredictorPage';
import RouteComparisonPage from './pages/RouteComparisonPage';
import PredictionDetailsPage from './pages/PredictionDetailsPage';
import LiveTrafficPage from './pages/LiveTrafficPage';
import HeatmapPage from './pages/HeatmapPage';
import HistoryPage from './pages/HistoryPage';
import HowItWorksPage from './pages/HowItWorksPage';

function AppContent() {
  const navigate = useNavigate();

  const handleGlobalDemo = () => {
    navigate('/predict?demo=true');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-orange-500 selection:text-white">
      <DemoBanner />
      <Navbar onRunDemo={handleGlobalDemo} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage onRunDemo={handleGlobalDemo} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/predict" element={<PredictorPage />} />
          <Route path="/routes" element={<RouteComparisonPage />} />
          <Route path="/prediction-details" element={<PredictionDetailsPage />} />
          <Route path="/live-traffic" element={<LiveTrafficPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
