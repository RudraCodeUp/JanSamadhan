import React from 'react';

export const DemographicAnalysis = ({ complaints }) => {
  // Calculate location-based data
  const locationData = complaints.reduce((acc, complaint) => {
    const area = complaint.location?.area || "Unknown";
    if (!acc[area]) {
      acc[area] = { total: 0, resolved: 0, pending: 0 };
    }
    
    acc[area].total += 1;
    if (complaint.status === "Resolved") {
      acc[area].resolved += 1;
    } else if (complaint.status === "Pending") {
      acc[area].pending += 1;
    }
    
    return acc;
  }, {});
  
  // Convert to array and sort by total complaints
  const sortedLocations = Object.entries(locationData)
    .map(([area, data]) => ({ area, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5); // Top 5 locations

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Demographic Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location-based Analysis */}
        <div>
          <h3 className="text-md font-medium mb-3">Top Areas by Complaint Volume</h3>
          <div className="space-y-4">
            {sortedLocations.map(location => (
              <div key={location.area}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{location.area}</span>
                  <span className="text-sm text-gray-500">{location.total} complaints</span>
                </div>
                <div className="mt-1 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full" 
                    style={{ 
                      width: `${(location.resolved / location.total) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{location.resolved} resolved</span>
                  <span>{location.pending} pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* User Type Analysis */}
        <div>
          <h3 className="text-md font-medium mb-3">User Demographics</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Age Group Distribution */}
            <div className="border rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Age Groups</h4>
              <div className="space-y-2">
                {['18-24', '25-34', '35-44', '45-54', '55+'].map((age, i) => {
                  // Mock data - replace with actual data when available
                  const percent = [15, 35, 25, 15, 10][i];
                  return (
                    <div key={age}>
                      <div className="flex justify-between text-xs">
                        <span>{age}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-gray-200 rounded-full">
                        <div 
                          className="h-1.5 bg-indigo-500 rounded-full" 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Gender Distribution */}
            <div className="border rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Gender</h4>
              <div className="flex flex-col items-center justify-center h-32">
                <div className="w-32 h-32 rounded-full border-8 border-blue-400 relative">
                  <div 
                    className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-pink-400"
                    style={{ 
                      clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' 
                    }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="text-xs text-center">
                      <div>Male: 52%</div>
                      <div>Female: 48%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};