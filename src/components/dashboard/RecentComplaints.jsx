import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { useComplaintStore } from '../../store/complaintStore';
import { formatRelativeTime, getPriorityColor, getStatusColor, getCategoryIcon } from '../../utils';

export const RecentComplaints = () => {
  const navigate = useNavigate();
  const { filteredComplaints } = useComplaintStore();
  
  // Get the 5 most recent complaints
  const recentComplaints = filteredComplaints
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out ">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          Recent Complaints
          <div className="ml-3 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        </h3>
        <button 
          onClick={() => navigate('/complaints')}
          className="group/btn text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
        >
          <span>View all</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
      
      <div className="space-y-3">
        {recentComplaints.map((complaint, index) => (
          <div 
            key={complaint.id} 
            className="group/item p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white transition-all duration-300 ease-out hover:shadow-sm hover:border-gray-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover/item:scale-110 transition-transform duration-200">
                    <span className="text-sm">{getCategoryIcon(complaint.category)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 truncate leading-relaxed">
                    {complaint.title}
                  </h4>
                </div>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {complaint.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium">{complaint.location.district}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-full">
                    <MessageCircle className="w-3 h-3" />
                    <span className="font-medium">{complaint.comments.length}</span>
                  </div>
                  <span className="text-gray-400 font-medium">{formatRelativeTime(complaint.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-3 ml-4">
                <div className="flex space-x-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                
                <button 
                  onClick={() => navigate(`/complaints/${complaint.id}`)}
                  className="group/eye p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <Eye className="w-4 h-4 group-hover/eye:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};