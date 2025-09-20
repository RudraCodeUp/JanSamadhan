import React from 'react';
import { PRIORITIES } from '../../types';

export const ComplaintCluster = ({
  cluster,
  zoom,
  center,
  onSelect
}) => {
  // Calculate position based on lat/lng (simplified for demo)
  const x = ((cluster.lng - center.lng) * 100 * zoom) + 300;
  const y = ((center.lat - cluster.lat) * 100 * zoom) + 300;

  const getClusterSize = () => {
    const count = cluster.complaints.length;
    if (count < 5) return 'w-8 h-8 text-xs';
    if (count < 10) return 'w-10 h-10 text-sm';
    if (count < 20) return 'w-12 h-12 text-base';
    return 'w-14 h-14 text-lg';
  };

  const getClusterColor = () => {
    // Color based on highest priority in cluster
    const hasCritical = cluster.complaints.some(c => c.priority === PRIORITIES.CRITICAL);
    const hasHigh = cluster.complaints.some(c => c.priority === PRIORITIES.HIGH);
    
    if (hasCritical) return 'bg-red-500';
    if (hasHigh) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{ left: x, top: y }}
      onClick={onSelect}
    >
      <div
        className={`${getClusterSize()} ${getClusterColor()} text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold hover:scale-110 transition-transform`}
      >
        {cluster.complaints.length}
      </div>
    </div>
  );
};