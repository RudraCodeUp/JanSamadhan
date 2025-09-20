import React from 'react';

export const StatusDistribution = ({ complaints }) => {
  // Calculate status counts
  const statusCounts = complaints.reduce((acc, complaint) => {
    const status = complaint.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  // Colors for different statuses
  const statusColors = {
    "Pending": "#FFA500",
    "In Progress": "#3498db",
    "Resolved": "#2ecc71",
    "Rejected": "#e74c3c",
    "Unknown": "#95a5a6"
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Complaint Status Distribution</h2>
      
      <div className="flex items-center justify-center h-64">
        {/* Simple visual representation using colored bars */}
        <div className="flex items-end h-full w-full space-x-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex flex-col items-center">
              <div 
                className="rounded-t w-16" 
                style={{ 
                  height: `${(count / complaints.length) * 100}%`,
                  backgroundColor: statusColors[status] || "#999" 
                }}
              ></div>
              <div className="text-sm mt-2 font-medium">{status}</div>
              <div className="text-sm text-gray-500">{count}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: statusColors[status] || "#999" }}
            ></div>
            <span className="text-sm">
              {status}: {((count / complaints.length) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};