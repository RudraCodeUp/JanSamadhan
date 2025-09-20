import React, { useState } from 'react';
import { X } from 'lucide-react';
import { COMPLAINT_CATEGORIES, PRIORITIES, STATUSES, DEPARTMENTS } from '../../types';

export const ComplaintFilters = ({ onFilterChange, onClose }) => {
  const [filters, setFilters] = useState({});

  const categories = Object.values(COMPLAINT_CATEGORIES);
  const priorities = Object.values(PRIORITIES);
  const statuses = Object.values(STATUSES);
  const departments = Object.values(DEPARTMENTS);

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleArrayToggle = (key, value) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterUpdate(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filter Complaints</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category?.includes(category) || false}
                  onChange={() => handleArrayToggle('category', category)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Priority</label>
          <div className="space-y-2">
            {priorities.map((priority) => (
              <label key={priority} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.priority?.includes(priority) || false}
                  onChange={() => handleArrayToggle('priority', priority)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
          <div className="space-y-2">
            {statuses.map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status?.includes(status) || false}
                  onChange={() => handleArrayToggle('status', status)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{status.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Department</label>
          <div className="space-y-2">
            {departments.map((department) => (
              <label key={department} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.department?.includes(department) || false}
                  onChange={() => handleArrayToggle('department', department)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{department}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};