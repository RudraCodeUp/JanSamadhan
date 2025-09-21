import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ComplaintList } from './components/complaints/ComplaintList';
import { ComplaintMap } from './components/map/ComplaintMap';
import { Analytics } from './components/analytics/Analytics';
import Staff from './components/dashboard/Staff';
import AdminPage from './components/dashboard/AdminPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <>
        <LoginForm />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Admin page route without Layout */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* All other routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaints" element={<ComplaintList />} />
            <Route path="/map" element={<ComplaintMap />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/staff" element={<div className="p-6"><Staff /></div>} />
            <Route path="/emergency" element={<div className="p-6">Emergency alerts coming soon...</div>} />
            <Route path="/settings" element={<div className="p-6">Settings coming soon...</div>} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;