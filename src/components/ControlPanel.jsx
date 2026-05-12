import React from 'react';
import { Play, ShieldAlert, RotateCcw } from 'lucide-react';

export default function ControlPanel({
  limit, setLimit,
  windowSize, setWindowSize,
  addRequest, simulateNormalTraffic, simulateFraudAttack, clearData
}) {
  return (
    <div className="glass-panel p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-neon-blue" />
          System Controls
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-slate-400">Request Limit</label>
              <span className="text-sm font-bold text-neon-blue">{limit} reqs</span>
            </div>
            <input
              type="range"
              min="1" max="20"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full accent-neon-blue"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-slate-400">Time Window</label>
              <span className="text-sm font-bold text-neon-purple">{windowSize}s</span>
            </div>
            <input
              type="range"
              min="1" max="60"
              value={windowSize}
              onChange={(e) => setWindowSize(Number(e.target.value))}
              className="w-full accent-neon-purple"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700/50 space-y-3">
        <button
          onClick={addRequest}
          className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-600"
        >
          <Play className="w-4 h-4" /> Single Request
        </button>

        <button
          onClick={simulateNormalTraffic}
          className="w-full py-2 px-4 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 rounded-lg flex items-center justify-center gap-2 transition-colors border border-blue-700/50"
        >
          Simulate Normal Traffic
        </button>

        <button
          onClick={simulateFraudAttack}
          className="w-full py-2 px-4 bg-red-900/40 hover:bg-red-800/60 text-red-300 rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-700/50"
        >
          Simulate Fraud Attack
        </button>

        <button
          onClick={clearData}
          className="w-full mt-2 py-2 px-4 bg-transparent hover:bg-slate-800 text-slate-400 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset Data
        </button>
      </div>
    </div>
  );
}
