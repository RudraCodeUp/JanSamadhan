import React, { useEffect, useState } from 'react';
import { MapPinIcon, PlusIcon, MinusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useComplaintStore } from '../../store/complaintStore';
import { ComplaintMapMarker } from './ComplaintMapMarker';
import { ComplaintCluster } from './ComplaintCluster';
import { MapFilters } from './MapFilters';

export const ComplaintMap = () => {
  const { filteredComplaints, fetchComplaints, isLoading } = useComplaintStore();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 40.7589, lng: -73.9851 });

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Simple clustering algorithm - group complaints within 0.005 degrees (~0.5km)
  const createClusters = (complaints) => {
    const clusters = [];
    const processed = new Set();
    const items = [];

    complaints.forEach(complaint => {
      if (processed.has(complaint.id)) return;

      const nearby = complaints.filter(other => 
        !processed.has(other.id) &&
        Math.abs(other.location.lat - complaint.location.lat) < 0.005 &&
        Math.abs(other.location.lng - complaint.location.lng) < 0.005
      );

      if (nearby.length > 1) {
        // Create cluster
        const cluster = {
          id: `cluster-${complaint.id}`,
          lat: nearby.reduce((sum, c) => sum + c.location.lat, 0) / nearby.length,
          lng: nearby.reduce((sum, c) => sum + c.location.lng, 0) / nearby.length,
          complaints: nearby
        };
        clusters.push(cluster);
        items.push(cluster);
        nearby.forEach(c => processed.add(c.id));
      } else {
        // Single complaint
        items.push(complaint);
        processed.add(complaint.id);
      }
    });

    return items;
  };

  const mapItems = createClusters(filteredComplaints);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complaint Map</h1>
          <p className="text-gray-600 mt-1">
            Geographic visualization of {filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FunnelIcon className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <MapFilters onClose={() => setShowFilters(false)} />
      )}

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative h-[600px] bg-gradient-to-br from-green-100 via-blue-100 to-blue-200">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
            <button
              onClick={() => setZoom(Math.min(18, zoom + 1))}
              className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(Math.max(8, zoom - 1))}
              className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Map Markers and Clusters */}
          <div className="absolute inset-0 overflow-hidden">
            {mapItems.map((item) => {
              if (item.complaints) {
                // This is a cluster
                return (
                  <ComplaintCluster
                    key={item.id}
                    cluster={item}
                    zoom={zoom}
                    center={center}
                    onSelect={() => console.log('Cluster selected:', item)}
                  />
                );
              } else {
                // This is a single complaint
                return (
                  <ComplaintMapMarker
                    key={item.id}
                    complaint={item}
                    zoom={zoom}
                    center={center}
                    isSelected={selectedComplaint?.id === item.id}
                    onSelect={() => setSelectedComplaint(item)}
                  />
                );
              }
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Legend</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Low Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Multiple Complaints</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Complaint Details */}
      {selectedComplaint && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedComplaint.title}
            </h3>
            <button
              onClick={() => setSelectedComplaint(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">{selectedComplaint.description}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPinIcon className="w-4 h-4" />
                <span>{selectedComplaint.location.address}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Priority:</span>
                <span className="font-medium capitalize">{selectedComplaint.priority}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">{selectedComplaint.status.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium capitalize">{selectedComplaint.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};