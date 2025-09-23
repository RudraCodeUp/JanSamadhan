import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPinIcon, PlusIcon, MinusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons based on priority
const createPriorityIcon = (priority) => {
  const colors = {
    1: '#ef4444', // red - critical
    2: '#f97316', // orange - high
    3: '#eab308', // yellow - medium
    4: '#3b82f6', // blue - low
  };
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${colors[priority] || '#6b7280'}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to handle map zoom controls
const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  const map = useMap();
  
  useEffect(() => {
    const handleZoomIn = () => {
      map.zoomIn();
    };
    
    const handleZoomOut = () => {
      map.zoomOut();
    };
    
    onZoomIn.current = handleZoomIn;
    onZoomOut.current = handleZoomOut;
  }, [map, onZoomIn, onZoomOut]);
  
  return null;
};

export const ComplaintMap = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default to Bangalore
  const zoomInRef = React.useRef();
  const zoomOutRef = React.useRef();

  useEffect(() => {
    const fetchDepartmentData = () => {
      try {
        setIsLoading(true);
        const departmentInfo = localStorage.getItem('departmentInfo');
        
        if (departmentInfo) {
          const parsedData = JSON.parse(departmentInfo);
          const departmentComplaints = parsedData.complaints || [];
          
          // Transform complaints to include required fields
          const transformedComplaints = departmentComplaints.map(complaint => ({
            id: complaint._id,
            title: complaint.subject,
            description: complaint.description,
            location: {
              lat: complaint.location.coordinates[1], // latitude
              lng: complaint.location.coordinates[0], // longitude
              address: `${complaint.location.name}, ${complaint.location.city}, ${complaint.location.state} ${complaint.location.postalCode}`,
              class: complaint.location.class,
              name: complaint.location.name,
              city: complaint.location.city,
              state: complaint.location.state,
              postalCode: complaint.location.postalCode
            },
            priority: getPriorityLevel(complaint.priority),
            status: complaint.status,
            category: complaint.location.class || 'General',
            image: complaint.image,
            video: complaint.video,
            createdAt: complaint.createdAt,
            votes: complaint.votes?.length || 0,
            comments: complaint.comments?.length || 0
          }));
          
          setComplaints(transformedComplaints);
          setFilteredComplaints(transformedComplaints);
          
          // Set map center to first complaint if available
          if (transformedComplaints.length > 0) {
            const firstComplaint = transformedComplaints[0];
            setMapCenter([firstComplaint.location.lat, firstComplaint.location.lng]);
          }
        }
      } catch (error) {
        console.error('Error fetching department data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartmentData();
  }, []);

  const getPriorityLevel = (priority) => {
    switch (priority) {
      case 1: return 'critical';
      case 2: return 'high';
      case 3: return 'medium';
      case 4: return 'low';
      default: return 'low';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

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

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative h-[600px]">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
            <button
              onClick={() => zoomInRef.current?.()}
              className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => zoomOutRef.current?.()}
              className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
          </div>

          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <ZoomControls onZoomIn={zoomInRef} onZoomOut={zoomOutRef} />
            
            {filteredComplaints.map((complaint) => (
              <Marker
                key={complaint.id}
                position={[complaint.location.lat, complaint.location.lng]}
                icon={createPriorityIcon(complaint.priority === 'critical' ? 1 : complaint.priority === 'high' ? 2 : complaint.priority === 'medium' ? 3 : 4)}
                eventHandlers={{
                  click: () => setSelectedComplaint(complaint),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Priority:</span>
                        <span className={`font-medium capitalize ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="font-medium capitalize">{complaint.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium">{complaint.category}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200 z-[1000]">
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
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <MapPinIcon className="w-4 h-4" />
                <span>{selectedComplaint.location.address}</span>
              </div>
              {selectedComplaint.image && (
                <img 
                  src={selectedComplaint.image} 
                  alt="Complaint" 
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Priority:</span>
                <span className={`font-medium capitalize ${getPriorityColor(selectedComplaint.priority)}`}>
                  {selectedComplaint.priority}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">{selectedComplaint.status.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{selectedComplaint.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Votes:</span>
                <span className="font-medium">{selectedComplaint.votes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Comments:</span>
                <span className="font-medium">{selectedComplaint.comments}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};