import React from 'react';

export const PerformanceMetrics = ({ complaints }) => {
  // Calculate key metrics
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
  const inProgressComplaints = complaints.filter(c => c.status === "In Progress").length;
  
  const resolutionRate = totalComplaints ? 
    ((resolvedComplaints / totalComplaints) * 100).toFixed(1) : 0;
    
  // Calculate average resolution time (assuming complaints have createdAt and resolvedAt timestamps)
  const calculateAvgResolutionTime = () => {
    const resolvedWithDates = complaints.filter(c => 
      c.status === "Resolved" && c.createdAt && c.resolvedAt
    );
    
    if (resolvedWithDates.length === 0) return "N/A";
    
    const totalHours = resolvedWithDates.reduce((sum, complaint) => {
      const created = new Date(complaint.createdAt);
      const resolved = new Date(complaint.resolvedAt);
      const hours = (resolved - created) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);
    
    const avgHours = totalHours / resolvedWithDates.length;
    return avgHours < 24 ? 
      `${avgHours.toFixed(1)} hours` : 
      `${(avgHours / 24).toFixed(1)} days`;
  };

  const metrics = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      color: "from-blue-50 to-indigo-50",
      textColor: "text-blue-700",
      accent: "bg-blue-500"
    },
    {
      title: "Resolved",
      value: resolvedComplaints,
      color: "from-emerald-50 to-green-50",
      textColor: "text-emerald-700",
      accent: "bg-emerald-500"
    },
    {
      title: "Pending",
      value: pendingComplaints,
      color: "from-amber-50 to-yellow-50",
      textColor: "text-amber-700",
      accent: "bg-amber-500"
    },
    {
      title: "In Progress",
      value: inProgressComplaints,
      color: "from-violet-50 to-purple-50",
      textColor: "text-violet-700",
      accent: "bg-violet-500"
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      color: "from-indigo-50 to-blue-50",
      textColor: "text-indigo-700",
      accent: "bg-indigo-500"
    },
    {
      title: "Avg. Resolution Time",
      value: calculateAvgResolutionTime(),
      color: "from-rose-50 to-pink-50",
      textColor: "text-rose-700",
      accent: "bg-rose-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {metrics.map((metric) => (
        <div 
          key={metric.title} 
          className="group relative bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:shadow-lg hover:bg-white/80 hover:-translate-y-1"
        >
          {/* Accent line */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 ${metric.accent} rounded-t-2xl`}></div>
          
          {/* Content */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-600 tracking-wide">
              {metric.title}
            </div>
            <div className={`text-2xl font-light ${metric.textColor} transition-colors duration-300`}>
              {metric.value}
            </div>
          </div>

          {/* Subtle background gradient on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>
        </div>
      ))}
    </div>
  );
};