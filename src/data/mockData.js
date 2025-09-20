import { subDays, subMonths, format } from 'date-fns';
import { COMPLAINT_CATEGORIES, PRIORITIES, STATUSES, DEPARTMENTS } from '../types';

// Generate realistic mock complaint data
export const mockComplaints = [
  {
    id: '1',
    title: 'Pothole on Main Street causing traffic issues',
    description: 'Large pothole near the intersection of Main Street and Oak Avenue. It\'s causing vehicles to swerve dangerously and has already damaged several tires.',
    category: COMPLAINT_CATEGORIES.ROADS,
    priority: PRIORITIES.HIGH,
    status: STATUSES.IN_PROGRESS,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '123 Main Street, New York, NY 10001',
      district: 'Manhattan',
      ward: 'Ward 5'
    },
    images: ['https://images.pexels.com/photos/163936/street-pothole-road-163936.jpeg?w=400'],
    citizenId: 'citizen1',
    citizenName: 'Mike Johnson',
    citizenEmail: 'mike.johnson@email.com',
    citizenPhone: '+1-555-0123',
    assignedTo: 'staff2',
    assignedDepartment: DEPARTMENTS.ROADS,
    createdAt: subDays(new Date(), 3),
    updatedAt: subDays(new Date(), 1),
    estimatedResolutionTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    comments: [
      {
        id: 'comment1',
        text: 'Complaint received and assigned to roads department.',
        authorId: 'staff1',
        authorName: 'Sarah Manager',
        authorRole: 'staff',
        createdAt: subDays(new Date(), 2),
        isInternal: true
      }
    ],
    tags: ['traffic', 'urgent', 'main-street'],
    urgencyScore: 85
  },
  {
    id: '2',
    title: 'Water main burst flooding residential area',
    description: 'Water main has burst on Elm Street, causing significant flooding in the residential area. Multiple homes are affected and water pressure is low throughout the neighborhood.',
    category: COMPLAINT_CATEGORIES.WATER,
    priority: PRIORITIES.CRITICAL,
    status: STATUSES.ESCALATED,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '456 Elm Street, New York, NY 10002',
      district: 'Manhattan',
      ward: 'Ward 3'
    },
    images: [
      'https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?w=400',
      'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?w=400'
    ],
    citizenId: 'citizen2',
    citizenName: 'Lisa Chen',
    citizenEmail: 'lisa.chen@email.com',
    citizenPhone: '+1-555-0456',
    assignedTo: 'staff3',
    assignedDepartment: DEPARTMENTS.WATER,
    createdAt: subDays(new Date(), 1),
    updatedAt: new Date(),
    estimatedResolutionTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    comments: [
      {
        id: 'comment2',
        text: 'Emergency crew dispatched. Estimated repair time: 24-48 hours.',
        authorId: 'staff3',
        authorName: 'David Water',
        authorRole: 'staff',
        createdAt: subDays(new Date(), 1),
        isInternal: false
      }
    ],
    tags: ['emergency', 'flooding', 'residential'],
    urgencyScore: 98
  },
  {
    id: '3',
    title: 'Broken streetlight creating safety hazard',
    description: 'Streetlight at the corner of Pine and 2nd Avenue has been out for over a week. The area is very dark at night and residents are concerned about safety.',
    category: COMPLAINT_CATEGORIES.STREETLIGHTS,
    priority: PRIORITIES.MEDIUM,
    status: STATUSES.PENDING,
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: 'Pine Street & 2nd Avenue, New York, NY 10003',
      district: 'Manhattan',
      ward: 'Ward 2'
    },
    images: ['https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?w=400'],
    citizenId: 'citizen3',
    citizenName: 'Robert Taylor',
    citizenEmail: 'robert.taylor@email.com',
    assignedDepartment: DEPARTMENTS.ELECTRICAL,
    createdAt: subDays(new Date(), 7),
    updatedAt: subDays(new Date(), 7),
    comments: [],
    tags: ['safety', 'lighting', 'night'],
    urgencyScore: 65
  },
  {
    id: '4',
    title: 'Illegal dumping in Central Park area',
    description: 'Someone has dumped construction debris and household items in the park area near the playground. This is creating an eyesore and potential safety hazard for children.',
    category: COMPLAINT_CATEGORIES.WASTE,
    priority: PRIORITIES.MEDIUM,
    status: STATUSES.RESOLVED,
    location: {
      lat: 40.7829,
      lng: -73.9654,
      address: 'Central Park East & 79th Street, New York, NY 10021',
      district: 'Manhattan',
      ward: 'Ward 8'
    },
    images: ['https://images.pexels.com/photos/2827374/pexels-photo-2827374.jpeg?w=400'],
    citizenId: 'citizen4',
    citizenName: 'Emma Wilson',
    citizenEmail: 'emma.wilson@email.com',
    assignedTo: 'staff4',
    assignedDepartment: DEPARTMENTS.SANITATION,
    createdAt: subDays(new Date(), 12),
    updatedAt: subDays(new Date(), 2),
    resolvedAt: subDays(new Date(), 2),
    comments: [
      {
        id: 'comment3',
        text: 'Cleanup crew has removed all debris. Area is now clean.',
        authorId: 'staff4',
        authorName: 'Maria Sanchez',
        authorRole: 'staff',
        createdAt: subDays(new Date(), 2),
        isInternal: false
      }
    ],
    tags: ['cleanup', 'park', 'resolved'],
    urgencyScore: 70
  },
  {
    id: '5',
    title: 'Traffic signal malfunction causing congestion',
    description: 'Traffic light at Broadway and 42nd Street is stuck on red in all directions. This is causing major traffic backup during rush hour.',
    category: COMPLAINT_CATEGORIES.ELECTRICITY,
    priority: PRIORITIES.HIGH,
    status: STATUSES.IN_PROGRESS,
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: 'Broadway & 42nd Street, New York, NY 10036',
      district: 'Manhattan',
      ward: 'Ward 4'
    },
    images: ['https://images.pexels.com/photos/2168561/pexels-photo-2168561.jpeg?w=400'],
    citizenId: 'citizen5',
    citizenName: 'James Brown',
    citizenEmail: 'james.brown@email.com',
    citizenPhone: '+1-555-0789',
    assignedTo: 'staff5',
    assignedDepartment: DEPARTMENTS.ELECTRICAL,
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 1),
    estimatedResolutionTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    comments: [
      {
        id: 'comment4',
        text: 'Technician on site. Working to resolve the timing issue.',
        authorId: 'staff5',
        authorName: 'Alex Electric',
        authorRole: 'staff',
        createdAt: subDays(new Date(), 1),
        isInternal: true
      }
    ],
    tags: ['traffic', 'rush-hour', 'signal'],
    urgencyScore: 88
  }
];

// Add more mock complaints for better demo
const categories = Object.values(COMPLAINT_CATEGORIES);
const priorities = [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH];
const statuses = Object.values(STATUSES);
const departments = Object.values(DEPARTMENTS);

for (let i = 6; i <= 25; i++) {
  mockComplaints.push({
    id: i.toString(),
    title: `Sample complaint ${i}`,
    description: `This is a sample complaint description for complaint number ${i}. It provides details about the issue reported by the citizen.`,
    category: categories[Math.floor(Math.random() * categories.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    location: {
      lat: 40.7589 + (Math.random() - 0.5) * 0.1,
      lng: -73.9851 + (Math.random() - 0.5) * 0.1,
      address: `${Math.floor(Math.random() * 900) + 100} Sample Street, New York, NY ${10000 + Math.floor(Math.random() * 100)}`,
      district: 'Manhattan',
      ward: `Ward ${Math.floor(Math.random() * 10) + 1}`
    },
    images: [],
    citizenId: `citizen${i}`,
    citizenName: `Citizen ${i}`,
    citizenEmail: `citizen${i}@email.com`,
    assignedDepartment: departments[Math.floor(Math.random() * departments.length)],
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: subDays(new Date(), Math.floor(Math.random() * 15)),
    comments: [],
    tags: [`tag${i}`, 'sample'],
    urgencyScore: Math.floor(Math.random() * 100)
  });
}

export const generateMockAnalytics = (complaints) => {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === STATUSES.PENDING).length;
  const resolved = complaints.filter(c => [STATUSES.RESOLVED, STATUSES.CLOSED].includes(c.status)).length;
  
  // Calculate average resolution time (mock data)
  const resolvedComplaints = complaints.filter(c => c.resolvedAt);
  const avgResolutionTime = resolvedComplaints.length > 0
    ? resolvedComplaints.reduce((acc, c) => {
        const resolutionTime = c.resolvedAt.getTime() - c.createdAt.getTime();
        return acc + (resolutionTime / (1000 * 60 * 60 * 24)); // Convert to days
      }, 0) / resolvedComplaints.length
    : 0;

  // Category breakdown
  const categoryBreakdown = Object.entries(
    complaints.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([category, count]) => ({ category, count }));

  // Monthly trends (last 6 months)
  const monthlyTrends = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    const monthComplaints = complaints.filter(c => 
      c.createdAt.getMonth() === date.getMonth() && 
      c.createdAt.getFullYear() === date.getFullYear()
    );
    const monthResolved = monthComplaints.filter(c => 
      c.resolvedAt && 
      c.resolvedAt.getMonth() === date.getMonth() && 
      c.resolvedAt.getFullYear() === date.getFullYear()
    );
    
    return {
      month: format(date, 'MMM yyyy'),
      complaints: monthComplaints.length,
      resolved: monthResolved.length
    };
  }).reverse();

  // Department performance
  const departmentList = Object.values(DEPARTMENTS);
  const departmentPerformance = departmentList.map(dept => {
    const deptComplaints = complaints.filter(c => c.assignedDepartment === dept);
    const deptResolved = deptComplaints.filter(c => [STATUSES.RESOLVED, STATUSES.CLOSED].includes(c.status));
    const deptAvgTime = deptResolved.length > 0 
      ? deptResolved.reduce((acc, c) => {
          if (c.resolvedAt) {
            return acc + (c.resolvedAt.getTime() - c.createdAt.getTime()) / (1000 * 60 * 60 * 24);
          }
          return acc;
        }, 0) / deptResolved.length
      : 0;

    return {
      department: dept,
      total: deptComplaints.length,
      resolved: deptResolved.length,
      avgTime: deptAvgTime
    };
  });

  // Priority distribution
  const priorityDistribution = Object.entries(
    complaints.reduce((acc, c) => {
      acc[c.priority] = (acc[c.priority] || 0) + 1;
      return acc;
    }, {})
  ).map(([priority, count]) => ({ priority, count }));

  return {
    totalComplaints: total,
    pendingComplaints: pending,
    resolvedComplaints: resolved,
    avgResolutionTime,
    categoryBreakdown,
    monthlyTrends,
    departmentPerformance,
    priorityDistribution
  };
};