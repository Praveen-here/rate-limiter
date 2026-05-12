import React from 'react';
import { useRateLimiter } from './hooks/useRateLimiter';
import SimulationCanvas from './components/SimulationCanvas';
import ControlPanel from './components/ControlPanel';
import ActivityFeed from './components/ActivityFeed';
import StatsDashboard from './components/StatsDashboard';
import SlidingWindowVisualizer from './components/SlidingWindowVisualizer';
import { ShieldCheck } from 'lucide-react';

function App() {
  const {
    limit, setLimit,
    windowSize, setWindowSize,
    requests, stats,
    addRequest, simulateNormalTraffic, simulateFraudAttack, clearData
  } = useRateLimiter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-6 lg:p-8 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/40 rounded-lg border border-blue-500/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <ShieldCheck className="w-8 h-8 text-neon-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-neon-blue">Sentinel</span> System
            </h1>
            <p className="text-sm text-slate-400 font-medium">ATM Transaction Rate Limiter</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-950/30 border border-green-900/50 rounded-full">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-green-400 uppercase tracking-widest">System Active</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        {/* Left Column: Controls & Feed */}
        <div className="lg:col-span-3 flex flex-col gap-6 max-h-[85vh]">
          <ControlPanel 
            limit={limit} setLimit={setLimit}
            windowSize={windowSize} setWindowSize={setWindowSize}
            addRequest={addRequest}
            simulateNormalTraffic={simulateNormalTraffic}
            simulateFraudAttack={simulateFraudAttack}
            clearData={clearData}
          />
          <ActivityFeed requests={requests} />
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <StatsDashboard stats={stats} requests={requests} windowSize={windowSize} />
          
          <div className="flex-1 min-h-[400px] relative rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl">
            {/* The React Flow Canvas */}
            <SimulationCanvas requests={requests} />
            
            {/* Decorative Overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur border border-slate-700 rounded text-xs font-mono text-slate-400">
              NETWORK TOPOLOGY
            </div>
          </div>

          <SlidingWindowVisualizer 
            requests={requests} 
            windowSize={windowSize} 
            limit={limit}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
