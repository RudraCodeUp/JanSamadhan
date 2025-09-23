import React, { useEffect, useState } from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

export const MetricsCards = ({ analytics }) => {
  const [calculatedMetrics, setCalculatedMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentComplaints, setDepartmentComplaints] = useState([]);

  // Load department info and complaints from localStorage
  useEffect(() => {
    const loadDepartmentData = () => {
      try {
        setIsLoading(true);
        const departmentInfo = localStorage.getItem('departmentInfo');
        
        if (departmentInfo) {
          const parsedDepartmentInfo = JSON.parse(departmentInfo);
          const complaints = parsedDepartmentInfo.complaints || [];
          setDepartmentComplaints(complaints);
        } else {
          setDepartmentComplaints([]);
        }
      } catch (error) {
        console.error('Error loading department data from localStorage:', error);
        setDepartmentComplaints([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartmentData();
  }, []);

  // Calculate real-time metrics from department complaints data
  useEffect(() => {
    if (departmentComplaints && departmentComplaints.length > 0) {
      const calculateRealTimeMetrics = () => {
        const total = departmentComplaints.length;
        const pending = departmentComplaints.filter(c => c.status === 'pending').length;
        const inProgress = departmentComplaints.filter(c => c.status === 'in-progress').length;
        const resolved = departmentComplaints.filter(c => c.status === 'resolved').length;
        const escalated = departmentComplaints.filter(c => c.status === 'escalated').length;

        // Calculate resolution rate
        const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

        // Calculate average resolution time
        const resolvedComplaints = departmentComplaints.filter(c => c.status === 'resolved' && c.resolvedOn);
        let avgResolutionTime = 0;
        if (resolvedComplaints.length > 0) {
          const totalResolutionTime = resolvedComplaints.reduce((sum, complaint) => {
            const created = new Date(complaint.createdAt);
            const resolved = new Date(complaint.resolvedOn);
            return sum + (resolved - created) / (1000 * 60 * 60 * 24); // in days
          }, 0);
          avgResolutionTime = totalResolutionTime / resolvedComplaints.length;
        }

        // Calculate trends (comparing with previous period - mock calculation)
        const recentComplaints = departmentComplaints.filter(c => {
          const complaintDate = new Date(c.createdAt);
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return complaintDate >= sevenDaysAgo;
        });

        const oldComplaints = departmentComplaints.filter(c => {
          const complaintDate = new Date(c.createdAt);
          const fourteenDaysAgo = new Date();
          fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return complaintDate >= fourteenDaysAgo && complaintDate < sevenDaysAgo;
        });

        const totalChange = oldComplaints.length > 0 
          ? ((recentComplaints.length - oldComplaints.length) / oldComplaints.length * 100).toFixed(1)
          : '+100';

        const pendingChange = oldComplaints.filter(c => c.status === 'pending').length > 0
          ? ((recentComplaints.filter(c => c.status === 'pending').length - oldComplaints.filter(c => c.status === 'pending').length) / oldComplaints.filter(c => c.status === 'pending').length * 100).toFixed(1)
          : '+0';

        const resolvedChange = oldComplaints.filter(c => c.status === 'resolved').length > 0
          ? ((recentComplaints.filter(c => c.status === 'resolved').length - oldComplaints.filter(c => c.status === 'resolved').length) / oldComplaints.filter(c => c.status === 'resolved').length * 100).toFixed(1)
          : '+0';

        return {
          totalComplaints: total,
          pendingComplaints: pending,
          inProgressComplaints: inProgress,
          resolvedComplaints: resolved,
          escalatedComplaints: escalated,
          avgResolutionTime,
          resolutionRate,
          trends: {
            total: totalChange,
            pending: pendingChange,
            resolved: resolvedChange
          }
        };
      };

      setCalculatedMetrics(calculateRealTimeMetrics());
    } else {
      // Set empty metrics if no complaints
      setCalculatedMetrics({
        totalComplaints: 0,
        pendingComplaints: 0,
        inProgressComplaints: 0,
        resolvedComplaints: 0,
        escalatedComplaints: 0,
        avgResolutionTime: 0,
        resolutionRate: 0,
        trends: {
          total: '0',
          pending: '0',
          resolved: '0'
        }
      });
    }
  }, [departmentComplaints]);

  // Use calculated metrics if available, otherwise fall back to props
  const displayAnalytics = calculatedMetrics || analytics || {
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    avgResolutionTime: 0
  };

  const metrics = [
    {
      title: 'Total Complaints',
      value: displayAnalytics.totalComplaints || 0,
      change: calculatedMetrics ? `${calculatedMetrics.trends.total > 0 ? '+' : ''}${calculatedMetrics.trends.total}%` : '+12%',
      trend: calculatedMetrics ? (calculatedMetrics.trends.total >= 0 ? 'up' : 'down') : 'up',
      icon: ExclamationTriangleIcon,
      color: 'blue',
      subtitle: 'All submitted complaints'
    },
    {
      title: 'Pending Issues',
      value: displayAnalytics.pendingComplaints || 0,
      change: calculatedMetrics ? `${calculatedMetrics.trends.pending > 0 ? '+' : ''}${calculatedMetrics.trends.pending}%` : '-8%',
      trend: calculatedMetrics ? (calculatedMetrics.trends.pending <= 0 ? 'down' : 'up') : 'down',
      icon: ClockIcon,
      color: 'yellow',
      subtitle: 'Awaiting action'
    },
    {
      title: 'Resolved Cases',
      value: displayAnalytics.resolvedComplaints || 0,
      change: calculatedMetrics ? `${calculatedMetrics.trends.resolved > 0 ? '+' : ''}${calculatedMetrics.trends.resolved}%` : '+15%',
      trend: calculatedMetrics ? (calculatedMetrics.trends.resolved >= 0 ? 'up' : 'down') : 'up',
      icon: CheckCircleIcon,
      color: 'green',
      subtitle: 'Successfully completed'
    },
    // {
    //   title: 'Avg Resolution Time',
    //   value: calculatedMetrics 
    //     ? `${calculatedMetrics.avgResolutionTime.toFixed(1)} days`
    //     : `${displayAnalytics.avgResolutionTime?.toFixed(1) || '0.0'} days`,
    //   change: calculatedMetrics ? `-${(calculatedMetrics.avgResolutionTime * 0.1).toFixed(1)} days` : '-2.3 days',
    //   trend: 'down',
    //   icon: ArrowTrendingDownIcon,
    //   color: 'purple',
    //   subtitle: 'Time to resolve'
    // }
  ];

  // Add in-progress and escalated complaints if we have calculated metrics
  if (calculatedMetrics && calculatedMetrics.inProgressComplaints > 0) {
    metrics.splice(2, 0, {
      title: 'In Progress',
      value: calculatedMetrics.inProgressComplaints,
      change: '+5%',
      trend: 'up',
      icon: ArrowTrendingUpIcon,
      color: 'orange',
      subtitle: 'Currently being handled'
    });
  }

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 ring-blue-200',
      yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 ring-yellow-200',
      green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600 ring-green-200',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 ring-purple-200',
      orange: 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 ring-orange-200'
    };
    return colorMap[color];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="mt-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{metric.value}</p>
              {metric.subtitle && (
                <p className="text-xs text-gray-400 mt-1">{metric.subtitle}</p>
              )}
            </div>
            <div className={`w-12 h-12 rounded-xl ${getColorClasses(metric.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
              metric.trend === 'up' ? 'bg-green-50' : 'bg-green-50'
            }`}>
              {metric.trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <ArrowTrendingDownIcon className="w-3.5 h-3.5 text-green-600" />
              )}
              <span className="text-sm font-semibold text-green-700">
                {metric.change}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-medium">vs last week</span>
          </div>
        </div>
      ))}
    </div>
  );
};