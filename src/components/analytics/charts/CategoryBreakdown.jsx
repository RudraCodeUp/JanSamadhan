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
  
  // Modern color palette
  const getColor = (index) => {
    const colors = [
      "#3b82f6", "#10b981", "#f59e0b", "#ef4444", 
      "#8b5cf6", "#06b6d4", "#f97316", "#475569"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full"></div>
        <h2 className="text-xl font-light text-slate-700">Category Breakdown</h2>
      </div>
      
      <div className="space-y-6">
        {sortedCategories.map(([category, count], index) => (
          <div key={category} className="group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-700">{category}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500 font-light">{count}</span>
                <span className="text-xs text-slate-400 font-light">
                  ({((count / complaints.length) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-3 rounded-full transition-all duration-700 ease-out shadow-sm group-hover:shadow-md" 
                  style={{ 
                    width: `${(count / complaints.length) * 100}%`,
                    backgroundColor: getColor(index)
                  }}
                ></div>
              </div>
              {/* Subtle glow effect on hover */}
              <div 
                className="absolute top-0 h-3 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
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