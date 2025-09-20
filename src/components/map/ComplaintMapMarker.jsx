import React from 'react';
import { getCategoryIcon } from '../../utils';
import { PRIORITIES } from '../../types';

export const ComplaintMapMarker = ({
  complaint,
  zoom,
  center,
  isSelected,
  onSelect
}) => {
  // Calculate position based on lat/lng (simplified for demo)
  const x = ((complaint.location.lng - center.lng) * 100 * zoom) + 300;
  const y = ((center.lat - complaint.location.lat) * 100 * zoom) + 300;

  const getPriorityColor = () => {
    const colors = {
      [PRIORITIES.LOW]: 'bg-blue-500',
      [PRIORITIES.MEDIUM]: 'bg-yellow-500',
      [PRIORITIES.HIGH]: 'bg-orange-500',
      [PRIORITIES.CRITICAL]: 'bg-red-500'
    };
    return colors[complaint.priority];
  };

  const getStatusOpacity = () => {
    return complaint.status === 'resolved' || complaint.status === 'closed' ? 'opacity-60' : 'opacity-100';
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${getStatusOpacity()} ${
        isSelected ? 'z-20 scale-125' : 'z-10'
      }`}
      style={{ left: x, top: y }}
      onClick={onSelect}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getPriorityColor()} ${
          isSelected ? 'ring-2 ring-blue-400' : ''
        }`}
      />
      
      {/* Tooltip on hover/select */}
      {isSelected && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-30">
          <div className="flex items-center space-x-1">
            <span>{getCategoryIcon(complaint.category)}</span>
            <span>{complaint.title.substring(0, 30)}...</span>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="border-4 border-transparent border-t-black"></div>
          </div>
        </div>
      )}
    </div>
  );
};