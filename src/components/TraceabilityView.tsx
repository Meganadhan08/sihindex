import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Calendar, User, FlaskConical, Package, Truck, Store, Award, AlertCircle } from 'lucide-react';

interface TraceabilityViewProps {
  onViewChange: (view: string) => void;
}

const TraceabilityView: React.FC<TraceabilityViewProps> = ({ onViewChange }) => {
  const [batchId, setBatchId] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = () => {
    if (batchId.trim()) {
      setShowDetails(true);
    }
  };

  const traceabilityData = {
    product: {
      name: 'Premium Ashwagandha Powder',
      batch: 'ASH-2024-001',
      manufacturer: 'Ayur Naturals Pvt Ltd',
      expiryDate: '2025-12-15',
      netWeight: '100g'
    },
    timeline: [
      {
        stage: 'Collection',
        date: '2024-01-15',
        time: '08:30 AM',
        location: 'Mysore District, Karnataka',
        coordinates: '12.2958° N, 76.6394° E',
        actor: 'Ravi Kumar (Farmer)',
        details: {
          variety: 'Withania somnifera',
          soilType: 'Red laterite soil',
          weather: 'Dry, 28°C',
          method: 'Hand-picked, morning harvest',
          quantity: '50 kg fresh roots'
        },
        icon: <User className="w-6 h-6" />,
        color: 'bg-green-500'
      },
      {
        stage: 'Primary Processing',
        date: '2024-01-16',
        time: '02:00 PM',
        location: 'Mysore Processing Unit',
        coordinates: '12.3051° N, 76.6553° E',
        actor: 'Ayur Processing Co.',
        details: {
          process: 'Solar drying for 48 hours',
          temperature: '40-45°C',
          humidity: '<10%',
          yield: '12.5 kg dried roots',
          qualityCheck: 'Visual inspection passed'
        },
        icon: <Package className="w-6 h-6" />,
        color: 'bg-blue-500'
      },
      {
        stage: 'Laboratory Testing',
        date: '2024-01-18',
        time: '10:00 AM',
        location: 'Certified Testing Lab, Bangalore',
        coordinates: '12.9716° N, 77.5946° E',
        actor: 'BioTest Labs Pvt Ltd',
        details: {
          testType: 'Complete quality analysis',
          withanolides: '2.8% (target: >2.5%)',
          heavyMetals: 'Within limits',
          microbialCount: 'Acceptable',
          certification: 'AYUSH approved',
          certificate: 'BT-ASH-2024-001'
        },
        icon: <FlaskConical className="w-6 h-6" />,
        color: 'bg-purple-500'
      },
      {
        stage: 'Manufacturing',
        date: '2024-01-20',
        time: '09:00 AM',
        location: 'Ayur Naturals Manufacturing, Chennai',
        coordinates: '13.0827° N, 80.2707° E',
        actor: 'Ayur Naturals Pvt Ltd',
        details: {
          process: 'Fine grinding and sieving',
          meshSize: '80 mesh',
          batchSize: '500 units of 100g',
          packaging: 'Airtight pouches with desiccant',
          qualityControl: 'Final QC passed'
        },
        icon: <Package className="w-6 h-6" />,
        color: 'bg-orange-500'
      },
      {
        stage: 'Distribution',
        date: '2024-01-22',
        time: '06:00 AM',
        location: 'Central Distribution Hub, Mumbai',
        coordinates: '19.0760° N, 72.8777° E',
        actor: 'LogiCare Distribution',
        details: {
          vehicle: 'Temperature controlled truck',
          route: 'Chennai → Mumbai → Delhi',
          temperature: '20-25°C maintained',
          transitTime: '48 hours',
          trackingId: 'LC-ASH-240122'
        },
        icon: <Truck className="w-6 h-6" />,
        color: 'bg-indigo-500'
      },
      {
        stage: 'Retail',
        date: '2024-01-24',
        time: '11:00 AM',
        location: 'Wellness Store, Delhi',
        coordinates: '28.7041° N, 77.1025° E',
        actor: 'Wellness Plus Store',
        details: {
          storeType: 'Authorized Ayurvedic retailer',
          storage: 'Climate controlled warehouse',
          shelfLife: '18 months from manufacturing',
          price: '₹299 per 100g',
          availability: 'In stock'
        },
        icon: <Store className="w-6 h-6" />,
        color: 'bg-teal-500'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onViewChange('home')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Herb Traceability
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Track Your Ayurvedic Product
          </h2>
          <p className="text-gray-600 mb-6">
            Enter the batch ID or QR code number to view complete traceability information
          </p>
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter Batch ID (e.g., ASH-2024-001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Track</span>
            </button>
          </div>
        </div>

        {/* Traceability Results */}
        {showDetails && (
          <div className="space-y-8">
            {/* Product Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {traceabilityData.product.name}
                  </h3>
                  <p className="text-gray-600">Batch: {traceabilityData.product.batch}</p>
                  <p className="text-gray-600">Manufacturer: {traceabilityData.product.manufacturer}</p>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Award className="w-6 h-6" />
                  <span className="font-semibold">Verified Authentic</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Net Weight</p>
                  <p className="text-lg font-semibold text-gray-900">{traceabilityData.product.netWeight}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Manufacturing Date</p>
                  <p className="text-lg font-semibold text-gray-900">2024-01-20</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                  <p className="text-lg font-semibold text-gray-900">{traceabilityData.product.expiryDate}</p>
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Complete Journey</h3>
              
              <div className="relative">
                {traceabilityData.timeline.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-8 last:pb-0">
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full ${stage.color} flex items-center justify-center text-white shadow-lg`}>
                        {stage.icon}
                      </div>
                      {index < traceabilityData.timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                      )}
                    </div>

                    {/* Stage content */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{stage.stage}</h4>
                        <div className="text-sm text-gray-500">
                          {stage.date} • {stage.time}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{stage.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          <span className="text-sm">{stage.actor}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-3">
                        Coordinates: {stage.coordinates}
                      </div>

                      {/* Stage details */}
                      <div className="bg-white rounded p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Stage Details:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          {Object.entries(stage.details).map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="font-medium text-gray-500 capitalize mr-2">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="text-lg font-semibold text-green-900">
                    Blockchain Verified
                  </h4>
                  <p className="text-green-700">
                    This product's entire journey has been verified and recorded on the blockchain. 
                    All quality parameters meet AYUSH standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample batch IDs for testing */}
        {!showDetails && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">
              Sample Batch IDs for Testing
            </h4>
            <div className="flex flex-wrap gap-2">
              {['ASH-2024-001', 'TUR-2024-001', 'BRA-2024-001', 'NEM-2024-001'].map((id) => (
                <button
                  key={id}
                  onClick={() => {setBatchId(id); setShowDetails(true);}}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraceabilityView;