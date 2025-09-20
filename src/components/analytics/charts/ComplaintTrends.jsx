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
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Complaint Trends</h2>
      
      <div className="h-64 flex items-end space-x-2">
        {monthlyData.map((data) => (
          <div key={data.month} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center">
              {/* Resolved complaints bar */}
              <div 
                className="w-4/5 bg-green-500 rounded-t"
                style={{ 
                  height: `${(data.resolved / maxValue) * 160}px`
                }}
              ></div>
              
              {/* Total complaints bar (stacked) */}
              <div 
                className="w-4/5 bg-blue-500"
                style={{ 
                  height: `${((data.total - data.resolved) / maxValue) * 160}px`
                }}
              ></div>
            </div>
            <div className="text-xs mt-2">{data.month}</div>
            <div className="text-xs text-gray-500">{data.total}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm">Open</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">Resolved</span>
        </div>
      </div>
    </div>
  );
};