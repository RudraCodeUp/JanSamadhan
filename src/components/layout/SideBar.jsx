import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../utils';

// Dashboard Icon from Heroicons
const DashboardIcon = ({ className }) => (
  <ChartBarSquareIcon className={className} />
);

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { name: 'Complaint Map', href: '/map', icon: MapPinIcon },
  { name: 'All Complaints', href: '/complaints', icon: ChatBubbleLeftRightIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Staff Management', href: '/staff', icon: UsersIcon },
  { name: 'Emergency Alerts', href: '/emergency', icon: ExclamationTriangleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm border-r border-gray-200/60 flex flex-col sticky top-0 h-screen shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src="/src/assets/logo/Logo-Blue-JanSamadhan.svg"
              alt="JanSamadhan Logo"
              className="w-10 h-10 transition-transform duration-200 "
            />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-5 text-gray-900 ">JanSamadhan</h1>
            <p className="text-xs text-gray-500 font-medium">Municipal Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md hover:shadow-gray-200/50 hover:scale-[1.01]'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-xl"></div>
              )}

              <item.icon className={cn(
                "w-5 h-5 transition-all duration-200",
                isActive
                  ? "text-white drop-shadow-sm"
                  : "text-gray-500 group-hover:!text-blue-600 group-hover:scale-110"
              )} />

              <span className="relative z-10 transition-all duration-200">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Status Card */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50 p-4 rounded-2xl border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-blue-900">System Status</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
            </div>
          </div>
          <p className="text-xs text-blue-700/80 mb-3 font-medium">All systems operational</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs text-emerald-700 font-semibold">Online</span>
            </div>
            <div className="text-xs text-blue-600/70 font-mono">99.9%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
