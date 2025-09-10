import React, { useState } from 'react';
import { Leaf, Users, FlaskConical, ShoppingBag, Scan, Globe, Shield, TrendingUp } from 'lucide-react';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import TraceabilityView from './components/TraceabilityView';
import QRScanner from './components/QRScanner';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userRole, setUserRole] = useState<string | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} onViewChange={setCurrentView} />;
      case 'trace':
        return <TraceabilityView onViewChange={setCurrentView} />;
      case 'scan':
        return <QRScanner onViewChange={setCurrentView} />;
      default:
        return <Homepage onViewChange={setCurrentView} onRoleSelect={setUserRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {renderView()}
    </div>
  );
}

export default App;