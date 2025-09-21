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
    <div className="bg-white/60 w-full backdrop-blur-sm rounded-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full"></div>
        <h2 className="text-xl font-light text-slate-700">Demographic Analysis</h2>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Location-based Analysis */}
        {/* <div className="space-y-6">
          <h3 className="text-lg font-medium text-slate-700 flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Top Areas by Volume</span>
          </h3>
          <div className="space-y-5">
            {sortedLocations.map((location, index) => (
              <div key={location.area} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{location.area}</span>
                  <span className="text-sm text-slate-500 font-light">{location.total} complaints</span>
                </div>
                <div className="relative">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out shadow-sm group-hover:shadow-md" 
                      style={{ 
                        width: `${(location.resolved / location.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div 
                    className="absolute top-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                    style={{ 
                      width: `${(location.resolved / location.total) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-emerald-600 font-medium">{location.resolved} resolved</span>
                  <span className="text-amber-600 font-medium">{location.pending} pending</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* User Type Analysis */}
        <div className="space-y-6 w-full">
          <h3 className="text-lg font-medium text-slate-700 flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>User Demographics</span>
          </h3>
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-6">
            {/* Age Group Distribution */}
            <div className="bg-slate-50/50 rounded-xl p-5 transition-colors duration-300 hover:bg-slate-100/50">
              <h4 className="text-sm font-medium text-slate-700 mb-4">Age Groups</h4>
              <div className="space-y-3">
                {['18-24', '25-34', '35-44', '45-54', '55+'].map((age, i) => {
                  const percent = [15, 35, 25, 15, 10][i];
                  const colors = ['from-violet-400 to-purple-500', 'from-blue-400 to-indigo-500', 'from-emerald-400 to-green-500', 'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500'];
                  return (
                    <div key={age} className="group">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">{age}</span>
                        <span className="text-slate-500">{percent}%</span>
                      </div>
                      <div className="relative">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-2 bg-gradient-to-r ${colors[i]} rounded-full transition-all duration-500 ease-out`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Gender Distribution */}
            <div className="bg-slate-50/50 rounded-xl p-5 transition-colors duration-300 hover:bg-slate-100/50">
              <h4 className="text-sm font-medium text-slate-700 mb-4">Gender Distribution</h4>
              <div className="flex flex-col items-center justify-center h-32">
                <div className="relative w-24 h-24">
                  {/* Modern circular chart */}
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray="130 251"
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="8"
                      strokeDasharray="121 251"
                      strokeDashoffset="-130"
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs font-medium text-slate-700">52% / 48%</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-slate-600">Male</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-xs text-slate-600">Female</span>
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