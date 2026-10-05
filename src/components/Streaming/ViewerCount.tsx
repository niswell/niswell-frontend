import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ViewerCountProps {
  current: number;
  peak: number;
}

export default function ViewerCount({ current, peak }: ViewerCountProps) {
  const [displayCount, setDisplayCount] = useState(current);

  useEffect(() => {
    // Animate count changes
    if (displayCount !== current) {
      const diff = current - displayCount;
      const step = Math.max(1, Math.ceil(Math.abs(diff) / 10));
      const timer = setInterval(() => {
        setDisplayCount(prev => {
          if (diff > 0) {
            return Math.min(prev + step, current);
          } else {
            return Math.max(prev - step, current);
          }
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [current, displayCount]);

  return (
    <div className="flex items-center gap-4 bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-3 w-full">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-75"></div>
          <Eye className="relative text-red-400" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-400">Watching Now</p>
          <p className="text-2xl font-bold text-white">
            {displayCount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="border-l border-dark-700 pl-4 flex-1">
        <p className="text-sm text-gray-400">Peak Viewers</p>
        <p className="text-lg font-semibold text-primary-400">
          {peak.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
