import React, { useEffect, useState } from 'react';
import { PlusIcon, FunnelIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ComplaintCard } from './ComplaintCard';
import { ComplaintFilters } from './ComplaintFilters';
import { BulkActions } from './BulkActions';

export const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      // Get department info from localStorage
      const departmentInfo = JSON.parse(localStorage.getItem('departmentInfo'));
      
      if (departmentInfo && departmentInfo.complaints) {
        // Use complaints from localStorage
        const complaintsArray = departmentInfo.complaints;
        setComplaints(complaintsArray);
        setFilteredComplaints(complaintsArray);
      }
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setComplaints([]);
      setFilteredComplaints([]);
    }
    setIsLoading(false);
  };
  
  fetchComplaints();
}, []);


  // Simple search filter
  useEffect(() => {
    if (!searchQuery) {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(
        complaints.filter(c =>
        (c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    }
  }, [searchQuery, complaints]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSelection = () => setSelectedComplaints([]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            Complaints Management
            <div className="ml-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </h1>
          <p className="text-gray-600 mt-1 font-medium">
            {filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out backdrop-blur-sm ${showFilters
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
              : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2.5 px-4 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border border-green-200 hover:border-green-300 rounded-xl font-medium text-sm transition-all duration-300 ease-out backdrop-blur-sm">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative group">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by title, description, location, or citizen name..."
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 ease-out placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>
        {selectedComplaints.length > 0 && (
          <div className="animate-in slide-in-from-right duration-300">
            <BulkActions
              selectedCount={selectedComplaints.length}
              onClear={clearSelection}
            />
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="animate-in slide-in-from-top duration-300">
          <ComplaintFilters
            onFilterChange={() => { }} // Implement if needed
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}

      {/* Complaints Grid */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 group  transition-transform duration-300">
            <MagnifyingGlassIcon className="w-8 h-8 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No complaints found</h3>
          <p className="text-gray-600 font-medium">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredComplaints.map((complaint, index) => (
            <div
              key={complaint._id}
              className="animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ComplaintCard complaint={complaint} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};