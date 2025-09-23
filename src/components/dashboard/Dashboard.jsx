import React, { useEffect } from 'react';
import { MetricsCards } from './MetricsCards';
import { RecentComplaints } from './RecentComplaints';
import { AnalyticsCharts } from './AnalyticsCharts';
import { QuickActions } from './QuickActions';
import { useComplaintStore } from '../../store/complaintStore';

export const Dashboard = () => {
  const { fetchComplaints, analytics, isLoading } = useComplaintStore();

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparen  t rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Municipal Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage citizen complaints in real-time</p>
        </div>
        <QuickActions />
      </div>

      <MetricsCards analytics={analytics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCharts analytics={analytics} />
        <RecentComplaints />
      </div>
    </div>
  );
};