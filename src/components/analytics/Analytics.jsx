import React from 'react';
import { useComplaintStore } from '../../store/complaintStore';
import { StatusDistribution } from './charts/StatusDistribution';
import { ComplaintTrends } from './charts/ComplaintTrends';
import { CategoryBreakdown } from './charts/CategoryBreakdown';
import { ComplaintsTable } from './tables/ComplaintsTable';
import { PerformanceMetrics } from './metrics/PerformanceMetrics';
import { DemographicAnalysis } from './demographics/DemographicAnalysis';

export const Analytics = () => {
  const { complaints } = useComplaintStore();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Complaint Analytics Dashboard</h1>
      
      {/* Summary Cards */}
      <PerformanceMetrics complaints={complaints} />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusDistribution complaints={complaints} />
        <CategoryBreakdown complaints={complaints} />
      </div>
      
      {/* Trend Analysis */}
      <ComplaintTrends complaints={complaints} />
      
      {/* Demographics Section */}
      <DemographicAnalysis complaints={complaints} />
      
      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Complaint Statistics</h2>
        <ComplaintsTable complaints={complaints} />
      </div>
    </div>
  );
};