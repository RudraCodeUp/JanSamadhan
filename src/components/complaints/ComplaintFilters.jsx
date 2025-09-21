import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
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

  const getFilterCount = () => {
    return Object.values(filters).flat().filter(Boolean).length;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm p-6 space-y-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <Filter className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Filter Complaints</h3>
            {getFilterCount() > 0 && (
              <p className="text-sm text-gray-600">{getFilterCount()} filters applied</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div className="group space-y-3">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            Category
            <div className="ml-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          </label>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="group/item flex items-center cursor-pointer hover:bg-blue-50/50 p-2 -m-2 rounded-lg transition-all duration-200">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.category?.includes(category) || false}
                    onChange={() => handleArrayToggle('category', category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                <span className="ml-3 text-sm text-gray-700 capitalize font-medium group-hover/item:text-gray-900 transition-colors duration-200">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="group space-y-3">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            Priority
            <div className="ml-2 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
          </label>
          <div className="space-y-3">
            {priorities.map((priority) => (
              <label key={priority} className="group/item flex items-center cursor-pointer hover:bg-orange-50/50 p-2 -m-2 rounded-lg transition-all duration-200">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.priority?.includes(priority) || false}
                    onChange={() => handleArrayToggle('priority', priority)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                <span className="ml-3 text-sm text-gray-700 capitalize font-medium group-hover/item:text-gray-900 transition-colors duration-200">
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="group space-y-3">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            Status
            <div className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </label>
          <div className="space-y-3">
            {statuses.map((status) => (
              <label key={status} className="group/item flex items-center cursor-pointer hover:bg-green-50/50 p-2 -m-2 rounded-lg transition-all duration-200">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.status?.includes(status) || false}
                    onChange={() => handleArrayToggle('status', status)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                <span className="ml-3 text-sm text-gray-700 capitalize font-medium group-hover/item:text-gray-900 transition-colors duration-200">
                  {status.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div className="group space-y-3">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            Department
            <div className="ml-2 w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
          </label>
          <div className="space-y-3">
            {departments.map((department) => (
              <label key={department} className="group/item flex items-center cursor-pointer hover:bg-purple-50/50 p-2 -m-2 rounded-lg transition-all duration-200">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.department?.includes(department) || false}
                    onChange={() => handleArrayToggle('department', department)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                <span className="ml-3 text-sm text-gray-700 capitalize font-medium group-hover/item:text-gray-900 transition-colors duration-200">
                  {department}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};