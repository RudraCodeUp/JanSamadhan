import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, MapPin, ArrowUpRight, Clock } from 'lucide-react';
import { formatRelativeTime, getPriorityColor, getStatusColor, getCategoryIcon } from '../../utils';

export const RecentComplaints = () => {
  const navigate = useNavigate();
  const [departmentComplaints, setDepartmentComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load department complaints from localStorage
  useEffect(() => {
    const loadDepartmentComplaints = () => {
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
        console.error('Error loading department complaints from localStorage:', error);
        setDepartmentComplaints([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartmentComplaints();
  }, []);
  
  // Get the 5 most recent complaints sorted by creation time (newest first)
  const recentComplaints = departmentComplaints
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out ">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          Recent Complaints
          <div className="ml-3 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({departmentComplaints.length} total)
          </span>
        </h3>
        <button 
          onClick={() => navigate('/complaints')}
          className="group/btn text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
        >
          <span>View all</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="p-4 border border-gray-100 rounded-xl animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : recentComplaints.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-gray-500 font-medium mb-2">No complaints yet</h4>
          <p className="text-gray-400 text-sm">Recent complaints will appear here once submitted</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentComplaints.map((complaint, index) => (
            <div 
              key={complaint._id} 
              className="group/item p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white transition-all duration-300 ease-out hover:shadow-sm hover:border-gray-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover/item:scale-110 transition-transform duration-200">
                      <span className="text-sm">{getCategoryIcon(complaint.category) || '📋'}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 truncate leading-relaxed">
                      {complaint.subject}
                    </h4>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {complaint.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-full">
                      <MapPin className="w-3 h-3" />
                      <span className="font-medium">{complaint.location?.name || complaint.location?.city || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-full">
                      <MessageCircle className="w-3 h-3" />
                      <span className="font-medium">{complaint.comments?.length || 0}</span>
                    </div>
                    <span className="text-gray-400 font-medium">{formatRelativeTime(new Date(complaint.createdAt))}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-3 ml-4">
                  <div className="flex space-x-2">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getPriorityColor(complaint.priority)}`}>
                      Priority {complaint.priority}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/complaints/${complaint._id}`)}
                    className="group/eye p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Eye className="w-4 h-4 group-hover/eye:scale-110 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};