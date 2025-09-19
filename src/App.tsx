import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './components/LandingPage';
import AuthPages from './components/AuthPages';
import FarmerDashboard from './components/FarmerDashboard';
import AgentDashboard from './components/AgentDashboard';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import AdminDashboard from './components/AdminDashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('landing');

  // Check for admin user
  const isAdmin = user?.email === 'admin@herbtrace.com';

  if (!user) {
    if (currentView === 'login' || currentView === 'signup') {
      return <AuthPages mode={currentView} onNavigate={setCurrentView} />;
    }
    return <LandingPage onNavigate={setCurrentView} />;
  }

  // Admin goes directly to admin dashboard
  if (isAdmin) {
    return <AdminDashboard />;
  }

  // Regular users get their role-based dashboard
  const getDashboardComponent = () => {
    switch (user.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'manufacturer':
        return <ManufacturerDashboard />;
      default:
        return <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Role</h1>
            <p className="text-gray-600">Please contact administrator for assistance.</p>
          </div>
        </div>;
    }
  };

  return getDashboardComponent();
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;