import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map, Filter, Download } from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'View Map',
      icon: Map,
      action: () => navigate('/map'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'Filter Complaints',
      icon: Filter,
      action: () => navigate('/complaints'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Export Report',
      icon: Download,
      action: () => console.log('Export report'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="flex space-x-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className={`${action.color} text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-colors shadow-sm`}
        >
          <action.icon className="w-4 h-4" />
          <span className="hidden sm:block">{action.label}</span>
        </button>
      ))}
    </div>
  );
};