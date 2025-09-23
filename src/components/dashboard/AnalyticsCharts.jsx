import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsCharts = ({ analytics }) => {
  const [departmentComplaints, setDepartmentComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    monthlyTrends: [],
    categoryBreakdown: [],
    statusBreakdown: []
  });

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Load department complaints from localStorage
  useEffect(() => {
    const loadDepartmentData = () => {
      try {
        setIsLoading(true);
        const departmentInfo = localStorage.getItem('departmentInfo');
        
        if (departmentInfo) {
          const parsedDepartmentInfo = JSON.parse(departmentInfo);
          const complaints = parsedDepartmentInfo.complaints || [];
          setDepartmentComplaints(complaints);
        } else {
          setDepartmentComplaints([]);
        }
      } catch (error) {
        console.error('Error loading department data from localStorage:', error);
        setDepartmentComplaints([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartmentData();
  }, []);

  // Calculate chart data from department complaints
  useEffect(() => {
    if (departmentComplaints && departmentComplaints.length > 0) {
      const calculateChartData = () => {
        // Monthly trends calculation
        const monthlyData = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Initialize months with zero values
        months.forEach(month => {
          monthlyData[month] = { month, complaints: 0, resolved: 0 };
        });

        // Process complaints for monthly data
        departmentComplaints.forEach(complaint => {
          const date = new Date(complaint.createdAt);
          const month = months[date.getMonth()];
          
          if (monthlyData[month]) {
            monthlyData[month].complaints += 1;
            if (complaint.status === 'resolved') {
              monthlyData[month].resolved += 1;
            }
          }
        });

        const monthlyTrends = Object.values(monthlyData);

        // Category breakdown calculation
        const categoryCount = {};
        departmentComplaints.forEach(complaint => {
          // Extract category from subject/description or use department type
          let category = 'General';
          
          const subject = complaint.subject?.toLowerCase() || '';
          const description = complaint.description?.toLowerCase() || '';
          
          if (subject.includes('water') || description.includes('water')) {
            category = 'Water Supply';
          } else if (subject.includes('road') || description.includes('road') || subject.includes('pothole')) {
            category = 'Roads';
          } else if (subject.includes('electric') || description.includes('electric') || subject.includes('power')) {
            category = 'Electricity';
          } else if (subject.includes('waste') || description.includes('garbage') || subject.includes('trash')) {
            category = 'Waste Management';
          } else if (subject.includes('park') || description.includes('park') || subject.includes('garden')) {
            category = 'Parks';
          } else if (subject.includes('street') || subject.includes('light') || description.includes('street light')) {
            category = 'Street Lighting';
          }

          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        const categoryBreakdown = Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count
        }));

        // Status breakdown calculation
        const statusCount = {};
        departmentComplaints.forEach(complaint => {
          const status = complaint.status || 'pending';
          statusCount[status] = (statusCount[status] || 0) + 1;
        });

        const statusBreakdown = Object.entries(statusCount).map(([status, count]) => ({
          status: status.charAt(0).toUpperCase() + status.slice(1),
          count
        }));

        return {
          monthlyTrends,
          categoryBreakdown,
          statusBreakdown
        };
      };

      setChartData(calculateChartData());
    } else {
      // Set empty chart data if no complaints
      setChartData({
        monthlyTrends: [],
        categoryBreakdown: [],
        statusBreakdown: []
      });
    }
  }, [departmentComplaints]);

  // Use calculated chart data if available, otherwise fall back to props
  const displayData = departmentComplaints.length > 0 ? chartData : (analytics || {
    monthlyTrends: [],
    categoryBreakdown: [],
    statusBreakdown: []
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Monthly Trends */}
      <div className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          Monthly Complaint Trends
          <div className="ml-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          {departmentComplaints.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({departmentComplaints.length} total complaints)
            </span>
          )}
        </h3>
        {isLoading ? (
          <div className="h-280 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : displayData.monthlyTrends.length === 0 ? (
          <div className="h-280 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">📊</p>
              <p>No data available for monthly trends</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={displayData.monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.6} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="complaints" fill="url(#totalGradient)" name="Total" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="url(#resolvedGradient)" name="Resolved" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Category Distribution */}
      <div className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          Complaints by Category
          <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </h3>
        {isLoading ? (
          <div className="h-280 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : displayData.categoryBreakdown.length === 0 ? (
          <div className="h-280 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">📈</p>
              <p>No data available for category breakdown</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={displayData.categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                innerRadius={30}
                fill="#8884d8"
                dataKey="count"
                animationDuration={800}
                animationBegin={0}
              >
                {displayData.categoryBreakdown.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient${index % COLORS.length})`}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-medium text-gray-900">{data.category}</p>
                        <p className="text-sm text-gray-600">Count: {data.count}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Status Distribution */}
      <div className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          Complaints by Status
          <div className="ml-3 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        </h3>
        {isLoading ? (
          <div className="h-280 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : displayData.statusBreakdown.length === 0 ? (
          <div className="h-280 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">📋</p>
              <p>No data available for status breakdown</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={index} id={`statusGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={displayData.statusBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                innerRadius={30}
                fill="#8884d8"
                dataKey="count"
                animationDuration={800}
                animationBegin={200}
              >
                {displayData.statusBreakdown.map((entry, index) => (
                  <Cell 
                    key={`status-cell-${index}`} 
                    fill={`url(#statusGradient${index % COLORS.length})`}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-medium text-gray-900">{data.status}</p>
                        <p className="text-sm text-gray-600">Count: {data.count}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};