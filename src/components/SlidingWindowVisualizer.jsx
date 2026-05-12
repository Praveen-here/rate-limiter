import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function SlidingWindowVisualizer({ requests, windowSize, limit }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    // Update every 100ms to keep the sliding window moving smoothly
    const interval = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  const now = Date.now();
  const windowMs = windowSize * 1000;
  const cutoff = now - windowMs;

  // We only show requests that are within the window or slightly older so they animate out smoothly
  const visibleRequests = requests.filter(req => req.timestamp > cutoff - 2000);

  return (
    <div className="glass-panel p-6 flex flex-col w-full relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-neon-purple" />
          Live Sliding Window
        </h2>
        <div className="flex gap-4 text-sm font-mono">
          <span className="text-slate-400">Window: <span className="text-neon-purple">{windowSize}s</span></span>
          <span className="text-slate-400">Limit: <span className="text-neon-blue">{limit} reqs</span></span>
        </div>
      </div>

      <div className="relative h-24 w-full bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_100%]" />
        
        {/* The active window overlay - since it's sliding window, the whole box IS the window, but let's highlight the valid region */}
        <div className="absolute top-0 bottom-0 right-0 bg-purple-900/10 border-l border-purple-500/30" style={{ width: '100%' }}>
          <div className="absolute top-2 left-2 text-xs text-purple-400/50 font-mono">Active Window</div>
        </div>

        {/* Requests Timeline */}
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-8">
          <AnimatePresence>
            {visibleRequests.map((req) => {
              const age = now - req.timestamp;
              // position percentage: 0% is right edge (now), 100% is left edge (now - windowMs)
              // We'll calculate left position based on age.
              const percent = 100 - (age / windowMs) * 100;
              const isExpired = age > windowMs;

              return (
                <motion.div
                  key={req.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isExpired ? 0.2 : 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{ left: `${Math.max(-10, percent)}%` }}
                  className="absolute w-6 h-6 -mt-3 -ml-3 rounded-full flex items-center justify-center border-2 transition-all duration-100 ease-linear"
                >
                  <div 
                    className={`w-full h-full rounded-full ${
                      req.status === 'allowed' 
                        ? 'bg-neon-green shadow-[0_0_10px_rgba(74,222,128,0.5)] border-green-200/50' 
                        : 'bg-neon-red shadow-[0_0_10px_rgba(248,113,113,0.5)] border-red-200/50'
                    } ${isExpired ? 'grayscale' : ''}`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Playhead at right edge representing NOW */}
        <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-neon-blue shadow-[0_0_10px_#38bdf8] z-10" />
      </div>
    </div>
  );
}
