import React, { useState } from 'react';

export const ComplaintsTable = ({ complaints }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(complaints.length / itemsPerPage);
  
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-slate-200/50">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm">
            {currentComplaints.map((complaint, index) => (
              <tr 
                key={complaint.id} 
                className="border-b border-slate-100/50 transition-all duration-200 hover:bg-slate-50/50 hover:shadow-sm"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                  #{complaint.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700 max-w-xs truncate">
                  {complaint.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {complaint.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200
                    ${complaint.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}
                    ${complaint.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''}
                    ${complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}
                    ${complaint.status === 'Rejected' ? 'bg-red-100 text-red-700 hover:bg-red-200' : ''}
                  `}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-light">
                  {new Date(complaint.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 max-w-xs truncate">
                  {complaint.location?.address || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/50">
          <div>
            <p className="text-sm text-slate-600 font-light">
              Showing <span className="font-medium text-slate-700">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium text-slate-700">
                {Math.min(indexOfLastItem, complaints.length)}
              </span>{" "}
              of <span className="font-medium text-slate-700">{complaints.length}</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};