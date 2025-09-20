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
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Resolved",
      value: resolvedComplaints,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Pending",
      value: pendingComplaints,
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "In Progress",
      value: inProgressComplaints,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      title: "Avg. Resolution Time",
      value: calculateAvgResolutionTime(),
      color: "bg-pink-100 text-pink-800"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">{metric.title}</div>
          <div className={`text-xl font-bold mt-1 px-2 py-1 rounded-md inline-block ${metric.color}`}>
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
};