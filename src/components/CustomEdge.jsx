import React from 'react';
import { getBezierPath } from '@xyflow/react';

import { motion } from 'framer-motion';

export function PacketEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // data.packets = [{ id, color, duration }]
  const packets = data?.packets || [];

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, strokeWidth: 2, stroke: 'rgba(51, 65, 85, 0.5)' }}
      />
      {packets.map((pkt) => (
        <motion.circle
          key={pkt.id}
          r="5"
          fill={pkt.color}
          style={{ 
            filter: `drop-shadow(0 0 5px ${pkt.color})`,
            offsetPath: `path('${edgePath}')`
          }}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: pkt.duration || 1, ease: 'linear' }}
        />
      ))}
    </>
  );
}
