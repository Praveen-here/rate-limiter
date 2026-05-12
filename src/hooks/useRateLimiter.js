import { useState, useCallback, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useRateLimiter() {
  const [limit, setLimit] = useState(5);
  const [windowSize, setWindowSize] = useState(10); // in seconds
  const [requests, setRequests] = useState([]); // { id, timestamp, status }
  const [stats, setStats] = useState({ total: 0, allowed: 0, blocked: 0 });

  // Use a ref to always get the latest state in timeouts/intervals if needed
  const stateRef = useRef({ limit, windowSize, requests });
  useEffect(() => {
    stateRef.current = { limit, windowSize, requests };
  }, [limit, windowSize, requests]);

  const addRequest = useCallback(() => {
    const now = Date.now();
    const windowMs = stateRef.current.windowSize * 1000;
    const cutoff = now - windowMs;

    // Filter valid requests in current window (only allowed ones count towards limit, usually. Or do all requests count? Rate limiters usually only count ALLOWED requests to limit throughput, but some count all attempts. Let's count only allowed requests for the limit.)
    // Actually, standard sliding window log counts all attempts that were allowed in the window.
    const activeRequests = stateRef.current.requests.filter(
      (req) => req.timestamp > cutoff && req.status === 'allowed'
    );

    const isAllowed = activeRequests.length < stateRef.current.limit;
    const status = isAllowed ? 'allowed' : 'blocked';

    const newRequest = {
      id: uuidv4(),
      timestamp: now,
      status,
    };

    setRequests((prev) => [newRequest, ...prev].slice(0, 100)); // keep last 100 for feed
    setStats((prev) => ({
      total: prev.total + 1,
      allowed: prev.allowed + (isAllowed ? 1 : 0),
      blocked: prev.blocked + (isAllowed ? 0 : 1),
    }));

    return newRequest;
  }, []);

  const simulateNormalTraffic = useCallback(() => {
    // Send 1 request every 2 seconds for 10 seconds
    let count = 0;
    const interval = setInterval(() => {
      addRequest();
      count++;
      if (count >= 5) clearInterval(interval);
    }, 2000);
  }, [addRequest]);

  const simulateFraudAttack = useCallback(() => {
    // Send a burst of 10 requests rapidly
    let count = 0;
    const interval = setInterval(() => {
      addRequest();
      count++;
      if (count >= 10) clearInterval(interval);
    }, 200);
  }, [addRequest]);

  const clearData = useCallback(() => {
    setRequests([]);
    setStats({ total: 0, allowed: 0, blocked: 0 });
  }, []);

  return {
    limit,
    setLimit,
    windowSize,
    setWindowSize,
    requests,
    stats,
    addRequest,
    simulateNormalTraffic,
    simulateFraudAttack,
    clearData,
  };
}
