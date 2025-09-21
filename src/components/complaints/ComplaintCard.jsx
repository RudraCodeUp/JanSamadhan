import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, UserIcon, ChatBubbleLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
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
      className={`group bg-white/80 backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out cursor-pointer transform ${
        isSelected ? 'border-blue-500 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 shadow-md' : 'border-gray-100'
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
            className="w-4 h-4 text-blue-600 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-200">
            <span className="text-lg">{getCategoryIcon(complaint.category)}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm transition-all duration-200 ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority}
          </span>
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm transition-all duration-200 ${getStatusColor(complaint.status)}`}>
            {complaint.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg leading-tight group-hover:text-blue-900 transition-colors duration-200">
          {complaint.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {complaint.description}
        </p>
      </div>

      {/* Images preview */}
      {complaint.images.length > 0 && (
        <div className="flex items-center space-x-2 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
          <PhotoIcon className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {complaint.images.length} image{complaint.images.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <MapPinIcon className="w-4 h-4 text-gray-500" />
          </div>
          <span className="truncate font-medium">{complaint.location.address}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-gray-500" />
          </div>
          <span className="font-medium">{complaint.citizenName}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
          </div>
          <span className="font-medium">{formatRelativeTime(complaint.createdAt)}</span>
        </div>
      </div>

      {/* Department and Comments */}
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
          {getDepartmentName(complaint.assignedDepartment)}
        </span>
        
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
          <ChatBubbleLeftIcon className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-gray-700">{complaint.comments.length}</span>
        </div>
      </div>

      {/* Urgency Score */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Urgency Score</span>
          <div className="flex items-center space-x-3">
            <div className="w-20 bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${complaint.urgencyScore}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gray-900 min-w-[2rem] text-right">
              {complaint.urgencyScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};