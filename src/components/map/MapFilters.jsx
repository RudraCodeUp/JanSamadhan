import React from 'react';
import { X } from 'lucide-react';
import { ComplaintFilters } from '../complaints/ComplaintFilters';
import { useComplaintStore } from '../../store/complaintStore';

export const MapFilters = ({ onClose }) => {
  const { filterComplaints } = useComplaintStore();

  const handleFilterChange = (filters) => {
    filterComplaints(filters);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <ComplaintFilters 
        onFilterChange={handleFilterChange}
        onClose={onClose}
      />
    </div>
  );
};