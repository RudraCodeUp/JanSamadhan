import React from 'react';

export const CategoryBreakdown = ({ complaints }) => {
  // Calculate category counts
  const categoryCounts = complaints.reduce((acc, complaint) => {
    const category = complaint.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Sort categories by count
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6); // Show top 6 categories
  
  // Generate random colors for categories
  const getColor = (index) => {
    const colors = [
      "#3498db", "#2ecc71", "#f1c40f", "#e74c3c", 
      "#9b59b6", "#1abc9c", "#d35400", "#34495e"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Complaint Categories</h2>
      
      <div className="space-y-3">
        {sortedCategories.map(([category, count], index) => (
          <div key={category} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{category}</span>
              <span className="text-sm text-gray-500">{count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2.5">
              <div 
                className="h-2.5 rounded" 
                style={{ 
                  width: `${(count / complaints.length) * 100}%`,
                  backgroundColor: getColor(index)
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};