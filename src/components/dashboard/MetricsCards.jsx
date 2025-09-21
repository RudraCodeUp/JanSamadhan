import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

export const MetricsCards = ({ analytics }) => {
  const metrics = [
    {
      title: 'Total Complaints',
      value: analytics.totalComplaints,
      change: '+12%',
      trend: 'up',
      icon: ExclamationTriangleIcon,
      color: 'blue'
    },
    {
      title: 'Pending Issues',
      value: analytics.pendingComplaints,
      change: '-8%',
      trend: 'down',
      icon: ClockIcon,
      color: 'yellow'
    },
    {
      title: 'Resolved Cases',
      value: analytics.resolvedComplaints,
      change: '+15%',
      trend: 'up',
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      title: 'Avg Resolution Time',
      value: `${analytics.avgResolutionTime.toFixed(1)} days`,
      change: '-2.3 days',
      trend: 'down',
      icon: ArrowTrendingDownIcon,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 ring-blue-200',
      yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 ring-yellow-200',
      green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600 ring-green-200',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 ring-purple-200'
    };
    return colorMap[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out "
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{metric.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${getColorClasses(metric.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-1">
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
            <span className="text-xs text-gray-400 font-medium">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};