import React from 'react';
import { Leaf, Scan, Globe, Shield, TrendingUp, ArrowRight, MapPin, Award, Clock, LogOut } from 'lucide-react';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface HomepageProps {
  onViewChange: (view: string) => void;
  user: User;
}

const Homepage: React.FC<HomepageProps> = ({ onViewChange, user }) => {
  const { logout } = useAuth();

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Geo-Tagged Collection",
      description: "Track herbs from exact GPS coordinates of collection points"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Blockchain Security",
      description: "Immutable records ensure authenticity and prevent tampering"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Quality Assurance",
      description: "Lab-verified quality parameters and compliance certifications"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Real-time Tracking",
      description: "Monitor your herbs through every stage of the supply chain"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Herbs Tracked" },
    { number: "500+", label: "Farmers Connected" },
    { number: "99.9%", label: "Traceability Accuracy" },
    { number: "24/7", label: "System Availability" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-green-100 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">HerbTrace</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => onViewChange('trace')}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Track Herbs
              </button>
              <button 
                onClick={() => onViewChange('scan')}
                className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
              >
                <Scan className="w-4 h-4" />
                <span>Scan QR</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, <strong>{user.name}</strong></span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blockchain-Powered
              <br />
              <span className="text-green-200">Ayurvedic Traceability</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Complete transparency from farm to formulation. Track every Ayurvedic herb through its journey with geo-tagged precision and blockchain security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onViewChange('trace')}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span>Track Your Herbs</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onViewChange('scan')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Scan className="w-5 h-5" />
                <span>Scan QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionary Traceability Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our blockchain-based system provides unprecedented transparency and authenticity verification for Ayurvedic herbs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Access Section */}
      <section className="py-20 bg-white bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Dashboard</h2>
            <p className="text-xl text-gray-600">Access your specialized dashboard</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onViewChange('dashboard')}
              className="group bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold">{user.role.charAt(0).toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2 capitalize">{user.role} Dashboard</h3>
                <p className="text-green-100 mb-4">{user.organization}</p>
                <div className="flex items-center justify-center space-x-2 text-green-200">
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold">HerbTrace</span>
            </div>
            <div className="text-gray-400 text-center">
              <p>&copy; 2025 HerbTrace. Built for Ayurvedic Transparency.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;