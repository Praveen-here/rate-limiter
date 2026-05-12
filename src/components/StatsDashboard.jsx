import React from 'react';
import { Activity, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StatsDashboard({ stats, requests, windowSize }) {
  const now = Date.now();
  const windowMs = windowSize * 1000;
  const cutoff = now - windowMs;
  
  const activeRequests = requests.filter(req => req.timestamp > cutoff && req.status === 'allowed').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <StatCard 
        icon={<Activity className="text-neon-blue w-6 h-6" />}
        title="Total Requests"
        value={stats.total}
        className="border-blue-900/50 bg-blue-950/20"
      />
      <StatCard 
        icon={<CheckCircle className="text-neon-green w-6 h-6" />}
        title="Allowed"
        value={stats.allowed}
        className="border-green-900/50 bg-green-950/20"
      />
      <StatCard 
        icon={<XCircle className="text-neon-red w-6 h-6" />}
        title="Blocked"
        value={stats.blocked}
        className="border-red-900/50 bg-red-950/20"
      />
      <StatCard 
        icon={<BarChart3 className="text-neon-purple w-6 h-6" />}
        title="Active in Window"
        value={activeRequests}
        className="border-purple-900/50 bg-purple-950/20"
      />
    </div>
  );
}

function StatCard({ icon, title, value, className }) {
  return (
    <div className={cn("glass-panel p-4 flex items-center gap-4 border", className)}>
      <div className="p-3 bg-slate-900/80 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </div>
    </div>
  );
}
