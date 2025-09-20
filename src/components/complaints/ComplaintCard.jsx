import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { useComplaintStore } from '../../store/complaintStore';
import { formatRelativeTime, getPriorityColor, getStatusColor, getCategoryIcon, getDepartmentName } from '../../utils';

export const ComplaintCard = ({ complaint }) => {
  const navigate = useNavigate();
  const { selectedComplaints, selectComplaint } = useComplaintStore();
  
  const isSelected = selectedComplaints.includes(complaint.id);

  const handleCardClick = (e) => {
    if (e.target.type === 'checkbox') {
      return; // Let checkbox handle its own click
    }
    navigate(`/complaints/${complaint.id}`);
  };

  const handleCheckboxChange = () => {
    selectComplaint(complaint.id);
  };

  return (
    <div 
      className={`bg-white border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={handleCardClick}
    >
      {/* Header with checkbox and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-2xl">{getCategoryIcon(complaint.category)}</span>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(complaint.status)}`}>
            {complaint.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {complaint.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {complaint.description}
        </p>
      </div>

      {/* Images preview */}
      {complaint.images.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <ImageIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {complaint.images.length} image{complaint.images.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{complaint.location.address}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{complaint.citizenName}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatRelativeTime(complaint.createdAt)}</span>
        </div>
      </div>

      {/* Department and Comments */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {getDepartmentName(complaint.assignedDepartment)}
        </span>
        
        <div className="flex items-center space-x-1 text-gray-500">
          <MessageCircle className="w-4 h-4" />
          <span>{complaint.comments.length}</span>
        </div>
      </div>

      {/* Urgency Score */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Urgency Score</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-red-500 h-2 rounded-full transition-all"
                style={{ width: `${complaint.urgencyScore}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">
              {complaint.urgencyScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};