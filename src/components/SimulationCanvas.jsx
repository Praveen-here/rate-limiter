import React, { useMemo, useEffect, useState } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ATMNode, RateLimiterNode, BankServerNode } from './CustomNodes';
import { PacketEdge } from './CustomEdge';

const nodeTypes = {
  atm: ATMNode,
  limiter: RateLimiterNode,
  bank: BankServerNode,
};

const edgeTypes = {
  packet: PacketEdge,
};

export default function SimulationCanvas({ requests }) {
  // Use a local state to force re-evaluation of active packets
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  const now = Date.now();

  const activeAtmToLimiter = requests.filter(req => now - req.timestamp < 500).map(req => ({
    id: req.id + '-atm',
    color: '#38bdf8', // blue
    duration: 0.5
  }));

  const activeLimiterToBank = requests.filter(req => req.status === 'allowed' && now - req.timestamp >= 500 && now - req.timestamp < 1200).map(req => ({
    id: req.id + '-bank',
    color: '#4ade80', // green
    duration: 0.5
  }));

  const activeLimiterToReject = requests.filter(req => req.status === 'blocked' && now - req.timestamp >= 500 && now - req.timestamp < 1200).map(req => ({
    id: req.id + '-reject',
    color: '#f87171', // red
    duration: 0.5
  }));

  const isPulsing = activeAtmToLimiter.length > 0 || activeLimiterToBank.length > 0 || activeLimiterToReject.length > 0;

  const nodes = useMemo(() => [
    {
      id: 'atm',
      type: 'atm',
      position: { x: 50, y: 150 },
      data: { label: 'ATM' },
    },
    {
      id: 'limiter',
      type: 'limiter',
      position: { x: 350, y: 150 },
      data: { isPulsing },
    },
    {
      id: 'bank',
      type: 'bank',
      position: { x: 700, y: 50 },
      data: { label: 'Bank' },
    },
    {
      id: 'reject',
      type: 'default',
      position: { x: 700, y: 250 },
      data: { label: 'Blocked' },
      style: {
        background: 'rgba(30, 41, 59, 0.7)',
        color: '#f87171',
        border: '1px solid rgba(248, 113, 113, 0.5)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(248, 113, 113, 0.2)'
      }
    }
  ], [isPulsing]);

  const edges = useMemo(() => [
    {
      id: 'e-atm-limiter',
      source: 'atm',
      target: 'limiter',
      type: 'packet',
      data: { packets: activeAtmToLimiter },
      animated: true,
    },
    {
      id: 'e-limiter-bank',
      source: 'limiter',
      sourceHandle: 'approved',
      target: 'bank',
      type: 'packet',
      data: { packets: activeLimiterToBank },
      animated: true,
    },
    {
      id: 'e-limiter-reject',
      source: 'limiter',
      sourceHandle: 'blocked',
      target: 'reject',
      type: 'packet',
      data: { packets: activeLimiterToReject },
      animated: true,
    }
  ], [activeAtmToLimiter, activeLimiterToBank, activeLimiterToReject]);

  return (
    <div className="w-full h-full glass-panel overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-slate-950/50"
        colorMode="dark"
      >
        <Background gap={20} color="rgba(255,255,255,0.05)" />
        <Controls className="fill-slate-400" />
      </ReactFlow>
    </div>
  );
}
