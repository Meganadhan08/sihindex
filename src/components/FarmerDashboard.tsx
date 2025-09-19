import React, { useState } from 'react';
import { Plus, MapPin, Calendar, Package, TrendingUp, Award, Camera, Upload, Save, ArrowLeft, LogOut, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface FarmerDashboardProps {
  onBack?: () => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [formData, setFormData] = useState({
    species: '',
    quantity: '',
    date: '',
    gps_lat: '',
    gps_lng: '',
    photo: null as File | null
  });

  const collections = [
    {
      id: 'BATCH001',
      species: 'Ashwagandha',
      quantity: 50,
      date: '2024-01-15',
      status: 'pending_collection',
      gps: { lat: 12.9716, lng: 77.5946 },
      photo: '/api/placeholder/300/200'
    },
    {
      id: 'BATCH002',
      species: 'Ashwagandha',
      quantity: 30,
      date: '2024-01-14',
      status: 'assigned_to_agency',
      gps: { lat: 12.9716, lng: 77.5946 },
      assigned_agency: 'Green Harvest Agency',
      photo: '/api/placeholder/300/200'
    },
    {
      id: 'BATCH003',
      species: 'Ashwagandha',
      quantity: 25,
      date: '2024-01-13',
      status: 'collected',
      gps: { lat: 12.9716, lng: 77.5946 },
      assigned_agency: 'Green Harvest Agency',
      photo: '/api/placeholder/300/200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_collection': return 'bg-yellow-100 text-yellow-800';
      case 'assigned_to_agency': return 'bg-blue-100 text-blue-800';
      case 'collected': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_collection': return 'Pending Collection';
      case 'assigned_to_agency': return 'Assigned to Agency';
      case 'collected': return 'Collected';
      default: return status;
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New collection:', formData);
    setShowAddForm(false);
    setFormData({
      species: '',
      quantity: '',
      date: '',
      gps_lat: '',
      gps_lng: '',
      photo: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Farmer Dashboard</h1>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Batch</span>
              </button>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('dashboard.overview')}
            </button>
            <button
              onClick={() => setActiveTab('batches')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'batches'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Batches
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Batches</p>
                    <p className="text-2xl font-semibold text-gray-900">{collections.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Collection</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {collections.filter(b => b.status === 'pending_collection').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Assigned to Agency</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {collections.filter(b => b.status === 'assigned_to_agency').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Award className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Collected</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {collections.filter(b => b.status === 'collected').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'batches' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Batches</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((batch) => (
                  <div key={batch.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{batch.species}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(batch.status)}`}>
                        {getStatusText(batch.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><strong>Batch ID:</strong> {batch.id}</p>
                      <p><strong>Quantity:</strong> {batch.quantity} kg</p>
                      <p><strong>Date:</strong> {batch.date}</p>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{batch.gps.lat.toFixed(4)}, {batch.gps.lng.toFixed(4)}</span>
                      </div>
                      {batch.assigned_agency && (
                        <p><strong>Agency:</strong> {batch.assigned_agency}</p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setSelectedBatch(batch)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Collection Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Batch</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Species *</label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Species</option>
                    <option value="Ashwagandha">Ashwagandha</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter quantity in kg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPS Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    name="gps_lat"
                    value={formData.gps_lat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="12.9716"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPS Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    name="gps_lng"
                    value={formData.gps_lng}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="77.5946"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo Upload *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload photo of the batch</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 mx-auto"
                    required
                  />
                  {formData.photo && (
                    <p className="text-sm text-green-600 mt-2">File selected: {formData.photo.name}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Batch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Details Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Batch Details</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Batch ID</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Species</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.species}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Quantity</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.quantity} kg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">GPS Location</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedBatch.gps.lat.toFixed(4)}, {selectedBatch.gps.lng.toFixed(4)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedBatch.status)}`}>
                    {getStatusText(selectedBatch.status)}
                  </span>
                </div>
              </div>

              {selectedBatch.assigned_agency && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Assigned Agency</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.assigned_agency}</p>
                </div>
              )}

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;