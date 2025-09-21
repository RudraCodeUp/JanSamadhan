import React from 'react';

export const ComplaintTrends = ({ complaints }) => {
  // Process data to get complaints by month
  const getMonthlyData = () => {
    const monthlyData = {};
    
    complaints.forEach(complaint => {
      const date = new Date(complaint.createdAt || Date.now());
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          total: 0,
          resolved: 0
        };
      }
      
      monthlyData[monthYear].total += 1;
      if (complaint.status === "Resolved") {
        monthlyData[monthYear].resolved += 1;
      }
    });
    
    // Convert to array and sort by date
    return Object.entries(monthlyData)
      .map(([key, data]) => ({ month: key, ...data }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split('/').map(Number);
        const [bMonth, bYear] = b.month.split('/').map(Number);
        return (aYear - bYear) || (aMonth - bMonth);
      })
      .slice(-6); // Last 6 months
  };
  
  const monthlyData = getMonthlyData();
  const maxValue = Math.max(...monthlyData.map(d => d.total));

  return (
    <div className="bg-white/60 w-full backdrop-blur-sm rounded-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-0.5 h-6 bg-gradient-to-b from-violet-400 to-purple-600 rounded-full"></div>
        <h2 className="text-xl font-light text-slate-700">Monthly Trends</h2>
      </div>
      
      <div className="h-72 flex items-end justify-center space-x-4 mb-8 px-4">
        {monthlyData.map((data, index) => (
          <div key={data.month} className="flex flex-col items-center flex-1 max-w-16 group">
            <div className="w-full flex flex-col items-center relative">
              {/* Resolved complaints bar */}
              <div 
                className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg shadow-sm transition-all duration-500 hover:shadow-md group-"
                style={{ 
                  height: `${Math.max((data.resolved / maxValue) * 200, 4)}px`
                }}
              ></div>
              
              {/* Pending complaints bar (stacked) */}
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 shadow-sm transition-all duration-500 hover:shadow-md group-"
                style={{ 
                  height: `${Math.max(((data.total - data.resolved) / maxValue) * 200, 4)}px`
                }}
              ></div>
              
              {/* Hover tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                Total: {data.total}
              </div>
            </div>
            <div className="text-xs font-medium text-slate-600 mt-3">{data.month}</div>
            <div className="text-xs text-slate-400 font-light">{data.total}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-sm"></div>
          <span className="text-sm font-medium text-slate-600">Open</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-sm"></div>
          <span className="text-sm font-medium text-slate-600">Resolved</span>
        </div>
      </div>
    </div>
  );
};