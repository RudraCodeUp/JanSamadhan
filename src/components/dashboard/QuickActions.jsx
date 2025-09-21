import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'View Map',
      icon: MapIcon,
      action: () => navigate('/map'),
      color: 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 border-blue-200 hover:border-blue-300'
    },
    {
      label: 'Filter Complaints',
      icon: FunnelIcon,
      action: () => navigate('/complaints'),
      color: 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border-green-200 hover:border-green-300'
    },
    {
      label: 'Export Report',
      icon: ArrowDownTrayIcon,
      action: () => console.log('Export report'),
      color: 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 border-purple-200 hover:border-purple-300'
    }
  ];

  return (
    <div className="flex space-x-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className={`${action.color} px-4 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2.5 transition-all duration-300 ease-out backdrop-blur-sm`}
        >
          <action.icon className="w-4 h-4 stroke-[1.5]" />
          <span className="hidden sm:block">{action.label}</span>
        </button>
      ))}
    </div>
  );
};