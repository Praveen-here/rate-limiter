import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CreditCard, Server, Shield } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function ATMNode({ data }) {
  return (
    <div className="glass-panel p-4 flex flex-col items-center justify-center min-w-[150px] border-blue-500/30">
      <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 border border-blue-500/50">
        <CreditCard className="w-6 h-6 text-neon-blue" />
      </div>
      <h3 className="text-sm font-bold text-slate-200">ATM Endpoint</h3>
      <p className="text-xs text-slate-400">User Requests</p>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-neon-blue border-none" />
    </div>
  );
}

export function RateLimiterNode({ data }) {
  // data.isPulsing can be passed to trigger a glow effect
  return (
    <motion.div 
      className={cn(
        "glass-panel p-4 flex flex-col items-center justify-center min-w-[180px] border-purple-500/30 transition-all duration-300",
        data?.isPulsing ? "shadow-[0_0_30px_rgba(192,132,252,0.6)] border-purple-400 scale-105" : ""
      )}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-neon-purple border-none" />
      <div className="w-14 h-14 rounded-xl bg-purple-900/50 flex items-center justify-center mb-3 border border-purple-500/50">
        <Shield className="w-7 h-7 text-neon-purple" />
      </div>
      <h3 className="text-sm font-bold text-slate-200">Rate Limiter</h3>
      <p className="text-xs text-slate-400">Sliding Window</p>
      
      <div className="flex w-full justify-between mt-4 text-xs font-mono">
        <div className="flex flex-col items-center">
          <span className="text-slate-500">Allowed</span>
          <Handle type="source" position={Position.Right} id="approved" style={{ top: '65%' }} className="w-3 h-3 bg-neon-green border-none" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-slate-500">Blocked</span>
          <Handle type="source" position={Position.Bottom} id="blocked" className="w-3 h-3 bg-neon-red border-none" />
        </div>
      </div>
    </motion.div>
  );
}

export function BankServerNode({ data }) {
  return (
    <div className="glass-panel p-4 flex flex-col items-center justify-center min-w-[150px] border-green-500/30">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-neon-green border-none" />
      <div className="w-12 h-12 rounded-lg bg-green-900/50 flex items-center justify-center mb-3 border border-green-500/50">
        <Server className="w-6 h-6 text-neon-green" />
      </div>
      <h3 className="text-sm font-bold text-slate-200">Bank Server</h3>
      <p className="text-xs text-slate-400">Transaction Core</p>
    </div>
  );
}
