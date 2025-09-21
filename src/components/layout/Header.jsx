import React from 'react';
import { Bell, Search, Settings, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/60 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search complaints, locations, citizens..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
            <Bell className="w-5 h-5 group- transition-transform duration-200" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
              3
            </span>
          </button>
          
          <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 ml-2 border-l border-gray-200/60">
            <div className="flex items-center space-x-3 group cursor-pointer">
              {user?.avatar ? (
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <User className="w-4 h-4 text-white" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize tracking-wide">{user?.role} • {user?.department}</p>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-200 group"
              title="Logout"
            >
              <LogOut className="w-4 h-4 group- transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};