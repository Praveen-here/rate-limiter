import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ActivityFeed({ requests }) {
  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4 shrink-0">
        <Shield className="w-5 h-5 text-neon-purple" />
        Activity Feed
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        <AnimatePresence>
          {requests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "p-3 rounded-lg border text-sm flex items-center justify-between",
                req.status === 'allowed' 
                  ? "bg-green-950/20 border-green-900/40" 
                  : "bg-red-950/20 border-red-900/40"
              )}
            >
              <div className="flex items-center gap-3">
                {req.status === 'allowed' ? (
                  <Check className="w-4 h-4 text-neon-green" />
                ) : (
                  <X className="w-4 h-4 text-neon-red" />
                )}
                <div>
                  <p className={cn("font-medium", req.status === 'allowed' ? "text-green-400" : "text-red-400")}>
                    {req.status === 'allowed' ? 'Approved' : 'Blocked'}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    ID: {req.id.split('-')[0]}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400">
                {new Date(req.timestamp).toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {requests.length === 0 && (
          <div className="text-center text-slate-500 mt-10 text-sm">
            Waiting for transactions...
          </div>
        )}
      </div>
    </div>
  );
}
