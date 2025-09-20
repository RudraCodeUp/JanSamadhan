import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const MetricsCards = ({ analytics }) => {
  const metrics = [
    {
      title: 'Total Complaints',
      value: analytics.totalComplaints,
      change: '+12%',
      trend: 'up',
      icon: AlertCircle,
      color: 'blue'
    },
    {
      title: 'Pending Issues',
      value: analytics.pendingComplaints,
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Resolved Cases',
      value: analytics.resolvedComplaints,
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg Resolution Time',
      value: `${analytics.avgResolutionTime.toFixed(1)} days`,
      change: '-2.3 days',
      trend: 'down',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colorMap[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${getColorClasses(metric.color)} flex items-center justify-center`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            {metric.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-500" />
            )}
            <span className={`text-sm font-medium ml-1 ${
              metric.trend === 'up' ? 'text-green-600' : 'text-green-600'
            }`}>
              {metric.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};