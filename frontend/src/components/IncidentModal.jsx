import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { createIncident } from '../services/api';

export default function IncidentModal({ isOpen, onClose, onIncidentAdded }) {
  const [type, setType] = useState('Accident');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Major');
  const [expectedDuration, setExpectedDuration] = useState('45 min');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    try {
      const res = await createIncident({
        type,
        location,
        severity,
        expectedDuration,
        title: title || `${severity} ${type} at ${location}`
      });

      if (onIncidentAdded) onIncidentAdded(res.incident);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden">
        
        <div className="bg-black text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Report Road Incident</h3>
              <p className="text-xs text-gray-400">Updates live AI scoring engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-gray-900 block mb-1">Incident Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="Accident">🚨 Traffic Accident</option>
              <option value="Road Work">🚧 Active Road Work</option>
              <option value="Event">🎉 Public Event / Concert</option>
              <option value="Road Closure">⛔ Road Closure</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-900 block mb-1">Location / Road Corridor</label>
            <input
              type="text"
              required
              placeholder="e.g. Western Express Highway near Bandra Flyover"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-900 block mb-1">Severity Impact</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Minor">Minor (+9 min delay)</option>
                <option value="Moderate">Moderate (+12 min delay)</option>
                <option value="Major">Major (+18 min delay)</option>
                <option value="Severe">Severe (+25 min delay)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-900 block mb-1">Expected Duration</label>
              <input
                type="text"
                placeholder="e.g. 45 min"
                value={expectedDuration}
                onChange={(e) => setExpectedDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Submit Incident'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
