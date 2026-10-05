import React from 'react';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

interface AnalyticsStat {
  label: string;
  value: string | number;
  change?: number;
  iconType: 'users' | 'earnings' | 'trending' | 'clock';
}

interface AnalyticsPanelProps {
  stats: AnalyticsStat[];
}

const renderIcon = (iconType: string) => {
  switch (iconType) {
    case 'users':
      return <Users className="w-6 h-6" />;
    case 'earnings':
      return <DollarSign className="w-6 h-6" />;
    case 'trending':
      return <TrendingUp className="w-6 h-6" />;
    case 'clock':
      return <Clock className="w-6 h-6" />;
    default:
      return null;
  }
};

export default function AnalyticsPanel({ stats }: AnalyticsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-dark-900 border border-dark-700 rounded-lg p-6 hover:border-dark-600 transition"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
            <div className="text-primary-500">{renderIcon(stat.iconType)}</div>
          </div>

          {stat.change !== undefined && (
            <div
              className={`text-sm font-semibold ${
                stat.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Default stats component for easy use
export function DefaultAnalytics() {
  const stats: AnalyticsStat[] = [
    {
      label: 'Total Viewers',
      value: 1234,
      change: 12,
      iconType: 'users',
    },
    {
      label: 'Total Earnings',
      value: '$542.50',
      change: 8,
      iconType: 'earnings',
    },
    {
      label: 'Active Streams',
      value: 3,
      change: 0,
      iconType: 'trending',
    },
    {
      label: 'Avg Watch Time',
      value: '2h 15m',
      change: 5,
      iconType: 'clock',
    },
  ];

  return <AnalyticsPanel stats={stats} />;
}
