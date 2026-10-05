import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Navigation,
  Activity,
  MapPin,
  TrendingUp,
  Flame,
  History,
  Info,
  Bell,
  User,
  Menu,
  X,
  Zap
} from 'lucide-react';

export default function Navbar({ onRunDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Activity },
    { label: 'Predict Traffic', path: '/predict', icon: Navigation },
    { label: 'Routes', path: '/routes', icon: MapPin },
    { label: 'Live Traffic', path: '/live-traffic', icon: TrendingUp },
    { label: 'Heatmap', path: '/heatmap', icon: Flame },
    { label: 'History', path: '/history', icon: History },
    { label: 'How It Works', path: '/how-it-works', icon: Info }
  ];

  const handleDemoClick = () => {
    if (onRunDemo) {
      onRunDemo();
    } else {
      navigate('/predict?demo=true');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-orange-600 transition-colors">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-black flex items-center gap-1">
                  TrafficFlow <span className="text-orange-500">AI</span>
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
                  Predict traffic. Plan smarter.
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Icons & Demo Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleDemoClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-sm transition-all transform active:scale-95 cursor-pointer"
              title="Auto-fill Andheri -> Bandra demo parameters"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Hackathon Demo Mode</span>
            </button>

            <div className="h-6 w-px bg-gray-200" />

            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg relative cursor-pointer" title="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </button>

            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                AI
              </div>
            </div>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleDemoClick}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-md"
            >
              <Zap className="w-3 h-3" />
              Demo
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <span className="text-sm font-medium text-gray-900">Traffic Architect</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md">
              Rule-Based AI Engine
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
