import React from 'react';
import { Check, X, User, Building2, ChevronDown } from 'lucide-react';
import { useComplaintStore } from '../../store/complaintStore';
import { STATUSES, DEPARTMENTS } from '../../types';

export const BulkActions = ({ selectedCount, onClear }) => {
  const { selectedComplaints, bulkUpdateComplaints } = useComplaintStore();

  const handleStatusUpdate = (status) => {
    bulkUpdateComplaints(selectedComplaints, { status });
    onClear();
  };

  const handleDepartmentUpdate = (department) => {
    bulkUpdateComplaints(selectedComplaints, { assignedDepartment: department });
    onClear();
  };

  return (
    <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-blue-900">
          {selectedCount} complaint{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClear}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Status Actions */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Status:</span>
          <button
            onClick={() => handleStatusUpdate(STATUSES.IN_PROGRESS)}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusUpdate(STATUSES.RESOLVED)}
            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
          >
            <Check className="w-3 h-3 inline mr-1" />
            Resolve
          </button>
        </div>

        {/* Department Actions */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Assign to:</span>
          <select
            onChange={(e) => e.target.value && handleDepartmentUpdate(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="">Select Department</option>
            <option value={DEPARTMENTS.ROADS}>Roads & Transportation</option>
            <option value={DEPARTMENTS.WATER}>Water & Utilities</option>
            <option value={DEPARTMENTS.ELECTRICAL}>Electrical Services</option>
            <option value={DEPARTMENTS.SANITATION}>Sanitation & Waste</option>
            <option value={DEPARTMENTS.PARKS}>Parks & Recreation</option>
            <option value={DEPARTMENTS.BUILDING}>Building Services</option>
          </select>
        </div>
      </div>
    </div>
  );
};