import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PRIORITIES, STATUSES, COMPLAINT_CATEGORIES, DEPARTMENTS } from '../types';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
};

export const getPriorityColor = (priority) => {
  const colors = {
    [PRIORITIES.LOW]: 'bg-blue-100 text-blue-800 border-blue-200',
    [PRIORITIES.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [PRIORITIES.HIGH]: 'bg-orange-100 text-orange-800 border-orange-200',
    [PRIORITIES.CRITICAL]: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[priority];
};

export const getStatusColor = (status) => {
  const colors = {
    [STATUSES.PENDING]: 'bg-gray-100 text-gray-800 border-gray-200',
    [STATUSES.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [STATUSES.RESOLVED]: 'bg-green-100 text-green-800 border-green-200',
    [STATUSES.CLOSED]: 'bg-gray-100 text-gray-600 border-gray-200',
    [STATUSES.ESCALATED]: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status];
};

export const getCategoryIcon = (category) => {
  const icons = {
    [COMPLAINT_CATEGORIES.ROADS]: '🛣️',
    [COMPLAINT_CATEGORIES.WATER]: '💧',
    [COMPLAINT_CATEGORIES.ELECTRICITY]: '⚡',
    [COMPLAINT_CATEGORIES.WASTE]: '🗑️',
    [COMPLAINT_CATEGORIES.PARKS]: '🌳',
    [COMPLAINT_CATEGORIES.STREETLIGHTS]: '💡',
    [COMPLAINT_CATEGORIES.DRAINAGE]: '🌊',
    [COMPLAINT_CATEGORIES.BUILDINGS]: '🏢',
    [COMPLAINT_CATEGORIES.NOISE]: '🔊',
    [COMPLAINT_CATEGORIES.OTHER]: '📝'
  };
  return icons[category];
};

export const getDepartmentName = (department) => {
  const names = {
    [DEPARTMENTS.ROADS]: 'Roads & Transportation',
    [DEPARTMENTS.WATER]: 'Water & Utilities',
    [DEPARTMENTS.ELECTRICAL]: 'Electrical Services',
    [DEPARTMENTS.SANITATION]: 'Sanitation & Waste',
    [DEPARTMENTS.PARKS]: 'Parks & Recreation',
    [DEPARTMENTS.BUILDING]: 'Building Services',
    [DEPARTMENTS.GENERAL]: 'General Services'
  };
  return names[department];
};

export const calculateUrgencyScore = (
  priority,
  createdAt,
  category,
  location = {}
) => {
  let score = 0;
  
  // Priority weight (40% of score)
  const priorityWeights = {
    [PRIORITIES.LOW]: 10,
    [PRIORITIES.MEDIUM]: 30,
    [PRIORITIES.HIGH]: 60,
    [PRIORITIES.CRITICAL]: 90
  };
  score += priorityWeights[priority];
  
  // Age weight (30% of score)
  const hoursOld = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  const ageScore = Math.min(30, hoursOld * 0.5); // Max 30 points after 60 hours
  score += ageScore;
  
  // Category weight (20% of score)
  const categoryWeights = {
    [COMPLAINT_CATEGORIES.WATER]: 15,
    [COMPLAINT_CATEGORIES.ELECTRICITY]: 15,
    [COMPLAINT_CATEGORIES.ROADS]: 12,
    [COMPLAINT_CATEGORIES.WASTE]: 8,
    [COMPLAINT_CATEGORIES.STREETLIGHTS]: 10,
    [COMPLAINT_CATEGORIES.DRAINAGE]: 12,
    [COMPLAINT_CATEGORIES.BUILDINGS]: 8,
    [COMPLAINT_CATEGORIES.PARKS]: 5,
    [COMPLAINT_CATEGORIES.NOISE]: 3,
    [COMPLAINT_CATEGORIES.OTHER]: 5
  };
  score += categoryWeights[category];
  
  // Location weight (10% of score) - high-traffic areas get higher scores
  if (location.district === 'Manhattan' || location.ward?.includes('1')) {
    score += 10;
  } else {
    score += 5;
  }
  
  return Math.min(100, Math.round(score));
};

export const routeToAppropriateDataDepartment = (
  category,
  priority,
  location
) => {
  // Primary routing based on category
  const categoryMapping = {
    [COMPLAINT_CATEGORIES.ROADS]: DEPARTMENTS.ROADS,
    [COMPLAINT_CATEGORIES.WATER]: DEPARTMENTS.WATER,
    [COMPLAINT_CATEGORIES.ELECTRICITY]: DEPARTMENTS.ELECTRICAL,
    [COMPLAINT_CATEGORIES.WASTE]: DEPARTMENTS.SANITATION,
    [COMPLAINT_CATEGORIES.PARKS]: DEPARTMENTS.PARKS,
    [COMPLAINT_CATEGORIES.STREETLIGHTS]: DEPARTMENTS.ELECTRICAL,
    [COMPLAINT_CATEGORIES.DRAINAGE]: DEPARTMENTS.WATER,
    [COMPLAINT_CATEGORIES.BUILDINGS]: DEPARTMENTS.BUILDING,
    [COMPLAINT_CATEGORIES.NOISE]: DEPARTMENTS.GENERAL,
    [COMPLAINT_CATEGORIES.OTHER]: DEPARTMENTS.GENERAL
  };
  
  let assignedDepartment = categoryMapping[category];
  
  // Override for critical issues - route to specialized teams
  if (priority === PRIORITIES.CRITICAL) {
    const criticalMapping = {
      [COMPLAINT_CATEGORIES.ROADS]: DEPARTMENTS.ROADS,
      [COMPLAINT_CATEGORIES.WATER]: DEPARTMENTS.WATER,
      [COMPLAINT_CATEGORIES.ELECTRICITY]: DEPARTMENTS.ELECTRICAL,
      [COMPLAINT_CATEGORIES.WASTE]: DEPARTMENTS.SANITATION,
      [COMPLAINT_CATEGORIES.PARKS]: DEPARTMENTS.PARKS,
      [COMPLAINT_CATEGORIES.STREETLIGHTS]: DEPARTMENTS.ELECTRICAL,
      [COMPLAINT_CATEGORIES.DRAINAGE]: DEPARTMENTS.WATER,
      [COMPLAINT_CATEGORIES.BUILDINGS]: DEPARTMENTS.BUILDING,
      [COMPLAINT_CATEGORIES.NOISE]: DEPARTMENTS.GENERAL,
      [COMPLAINT_CATEGORIES.OTHER]: DEPARTMENTS.GENERAL
    };
    assignedDepartment = criticalMapping[category];
  }
  
  return assignedDepartment;
};