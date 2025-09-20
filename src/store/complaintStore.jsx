import { create } from 'zustand';
import { mockComplaints, generateMockAnalytics } from '../data/mockData';
import { STATUSES } from '../types';

export const useComplaintStore = create((set, get) => ({
  complaints: [],
  filteredComplaints: [],
  selectedComplaints: [],
  filters: {},
  analytics: {
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    avgResolutionTime: 0,
    categoryBreakdown: [],
    monthlyTrends: [],
    departmentPerformance: [],
    priorityDistribution: []
  },
  isLoading: false,

  fetchComplaints: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const complaints = mockComplaints;
      const analytics = generateMockAnalytics(complaints);
      
      set({
        complaints,
        filteredComplaints: complaints,
        analytics,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
      set({ isLoading: false });
    }
  },

  filterComplaints: (filters) => {
    const { complaints } = get();
    
    let filtered = complaints;

    if (filters.category?.length) {
      filtered = filtered.filter(c => filters.category.includes(c.category));
    }

    if (filters.priority?.length) {
      filtered = filtered.filter(c => filters.priority.includes(c.priority));
    }

    if (filters.status?.length) {
      filtered = filtered.filter(c => filters.status.includes(c.status));
    }

    if (filters.department?.length) {
      filtered = filtered.filter(c => filters.department.includes(c.assignedDepartment));
    }

    if (filters.dateRange) {
      filtered = filtered.filter(c => 
        c.createdAt >= filters.dateRange.start && 
        c.createdAt <= filters.dateRange.end
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.location.address.toLowerCase().includes(query) ||
        c.citizenName.toLowerCase().includes(query)
      );
    }

    set({ 
      filteredComplaints: filtered,
      filters
    });
  },

  selectComplaint: (id) => {
    const { selectedComplaints } = get();
    const newSelection = selectedComplaints.includes(id)
      ? selectedComplaints.filter(selectedId => selectedId !== id)
      : [...selectedComplaints, id];
    
    set({ selectedComplaints: newSelection });
  },

  selectMultipleComplaints: (ids) => {
    set({ selectedComplaints: ids });
  },

  clearSelection: () => {
    set({ selectedComplaints: [] });
  },

  updateComplaint: (id, updates) => {
    const { complaints } = get();
    const updatedComplaints = complaints.map(complaint =>
      complaint.id === id
        ? { ...complaint, ...updates, updatedAt: new Date() }
        : complaint
    );
    
    set({
      complaints: updatedComplaints,
      filteredComplaints: updatedComplaints.filter(c => 
        get().filteredComplaints.some(fc => fc.id === c.id)
      )
    });
  },

  bulkUpdateComplaints: (ids, updates) => {
    const { complaints } = get();
    const updatedComplaints = complaints.map(complaint =>
      ids.includes(complaint.id)
        ? { ...complaint, ...updates, updatedAt: new Date() }
        : complaint
    );
    
    set({
      complaints: updatedComplaints,
      filteredComplaints: updatedComplaints.filter(c => 
        get().filteredComplaints.some(fc => fc.id === c.id)
      )
    });
  },

  addComment: (complaintId, comment, isInternal) => {
    const { complaints } = get();
    const updatedComplaints = complaints.map(complaint =>
      complaint.id === complaintId
        ? {
            ...complaint,
            comments: [...complaint.comments, {
              id: Date.now().toString(),
              text: comment,
              authorId: '1', // Would come from auth store
              authorName: 'Current User',
              authorRole: 'admin',
              createdAt: new Date(),
              isInternal
            }],
            updatedAt: new Date()
          }
        : complaint
    );
    
    set({ complaints: updatedComplaints });
  }
}));