import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './components/LandingPage';
import AuthPages from './components/AuthPages';
import Homepage from './components/Homepage';
import FarmerDashboard from './components/FarmerDashboard';
import LabDashboard from './components/LabDashboard';
import ProcessorDashboard from './components/ProcessorDashboard';
import AdminDashboard from './components/AdminDashboard';
import TraceabilityView from './components/TraceabilityView';
import QRScanner from './components/QRScanner';

const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('landing');

  if (!user) {
    if (currentView === 'login' || currentView === 'signup') {
      return <AuthPages mode={currentView} onNavigate={setCurrentView} />;
    }
    return <LandingPage onNavigate={setCurrentView} />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'lab':
        return <LabDashboard />;
      case 'processor':
        return <ProcessorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setCurrentView('home')}
                      className="text-green-600 hover:text-green-700 transition-colors font-semibold text-lg"
                    >
                      HerbTrace
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{user.name}</span>
                      <span className="ml-2 text-gray-400">({user.role})</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {getDashboardComponent()}
            </main>
          </div>
        );
      case 'trace':
        return <TraceabilityView onViewChange={setCurrentView} />;
      case 'scan':
        return <QRScanner onViewChange={setCurrentView} />;
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      default:
        return <Homepage onViewChange={setCurrentView} user={user} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
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