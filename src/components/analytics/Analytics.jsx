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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 p-6 space-y-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Analytics <span className="font-normal text-slate-600">Dashboard</span>
          </h1>
        </div>
        <p className="text-slate-500 ml-7 font-light">
          Comprehensive insights into complaint management and performance metrics
        </p>
      </div>
      
      {/* Summary Cards */}
      <PerformanceMetrics complaints={complaints} />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StatusDistribution complaints={complaints} />
        <CategoryBreakdown complaints={complaints} />
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Trend Analysis */}
        <ComplaintTrends complaints={complaints} />
        
        {/* Demographics Section */}
        <DemographicAnalysis complaints={complaints} />
      </div>
      
      {/* Detailed Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-8 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-0.5 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full"></div>
          <h2 className="text-xl font-light text-slate-700">Detailed Statistics</h2>
        </div>
        <ComplaintsTable complaints={complaints} />
      </div>
    </div>
  );
};