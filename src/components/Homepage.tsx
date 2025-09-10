import React from 'react';
import { Leaf, Users, FlaskConical, ShoppingBag, Scan, Globe, Shield, TrendingUp, ArrowRight, MapPin, Award, Clock } from 'lucide-react';

interface HomepageProps {
  onViewChange: (view: string) => void;
  onRoleSelect: (role: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onViewChange, onRoleSelect }) => {
  const handleRoleClick = (role: string) => {
    onRoleSelect(role);
    onViewChange('dashboard');
  };

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
      <nav className="bg-white shadow-sm border-b border-green-100">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
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
      <section className="bg-white py-16">
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
      <section className="py-20 bg-green-50">
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

      {/* Role Selection Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600">
              Access specialized dashboards designed for your specific needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <button 
              onClick={() => handleRoleClick('farmer')}
              className="group bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <Users className="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Farmer/Collector</h3>
              <p className="text-green-100">Record collection data and geo-location</p>
            </button>

            <button 
              onClick={() => handleRoleClick('lab')}
              className="group bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <FlaskConical className="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Laboratory</h3>
              <p className="text-blue-100">Conduct quality testing and certification</p>
            </button>

            <button 
              onClick={() => handleRoleClick('seller')}
              className="group bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Seller/Distributor</h3>
              <p className="text-purple-100">Manage inventory and supply chain</p>
            </button>

            <button 
              onClick={() => handleRoleClick('consumer')}
              className="group bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-xl text-white hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105"
            >
              <Shield className="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Consumer</h3>
              <p className="text-orange-100">Verify authenticity and quality</p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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