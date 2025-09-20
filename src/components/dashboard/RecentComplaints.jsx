import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, MapPin } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
        <button 
          onClick={() => navigate('/complaints')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {recentComplaints.map((complaint) => (
          <div key={complaint.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getCategoryIcon(complaint.category)}</span>
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {complaint.title}
                  </h4>
                </div>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {complaint.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{complaint.location.district}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{complaint.comments.length} comments</span>
                  </div>
                  <span>{formatRelativeTime(complaint.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                
                <button 
                  onClick={() => navigate(`/complaints/${complaint.id}`)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};