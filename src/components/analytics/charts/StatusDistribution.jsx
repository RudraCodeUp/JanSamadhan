export const StatusDistribution = ({ complaints }) => {
  // Calculate status counts
  const statusCounts = complaints.reduce((acc, complaint) => {
    const status = complaint.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  // Subtle colors for different statuses
  const statusColors = {
    "pending": "#fef3c7",
    "in-progress": "#dbeafe", 
    "escalated": "#fff7ed",
    "resolved": "#d1fae5",
    "closed": "#f3f4f6",
    "rejected": "#fee2e2",
    "unknown": "#f3f4f6"
  };

  const statusBorderColors = {
    "pending": "#f59e0b",
    "in-progress": "#3b82f6",
    "escalated": "#ea580c", 
    "resolved": "#10b981",
    "closed": "#9ca3af",
    "rejected": "#ef4444",
    "unknown": "#9ca3af"
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></div>
        <h2 className="text-xl font-light text-slate-700">Status Distribution</h2>
      </div>
      
      <div className="flex items-center justify-center h-64 mb-8">
        {/* Modern bar chart with smooth animations */}
        <div className="flex items-end h-full w-full space-x-6 px-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex flex-col items-center group flex-1">
              <div 
                className="w-full max-w-16 rounded-t-xl transition-all duration-500 ease-out shadow-sm border-2" 
                style={{ 
                  height: `${Math.max((count / complaints.length) * 200, 8)}px`,
                  backgroundColor: statusColors[status] || "#f3f4f6",
                  borderColor: statusBorderColors[status] || "#9ca3af"
                }}
              ></div>
              <div className="text-sm font-medium text-slate-700 mt-3 text-center">{status}</div>
              <div className="text-xs text-slate-500 font-light">{count}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50/50 transition-colors duration-300 hover:bg-slate-100/50">
            <div 
              className="w-3 h-3 rounded-full shadow-sm border" 
              style={{ 
                backgroundColor: statusColors[status] || "#f3f4f6",
                borderColor: statusBorderColors[status] || "#9ca3af"
              }}
            ></div>
            <span className="text-sm font-medium text-slate-700 flex-1">
              {status}
            </span>
            <span className="text-sm text-slate-500 font-light">
              {((count / complaints.length) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};