import React, { useState } from 'react';
import { Package, TrendingUp, Clock, CheckCircle, MapPin, User, Calendar, LogOut, ArrowLeft, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AgentDashboardProps {
  onBack?: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  const assignedBatches = [
    {
      id: 'BATCH002',
      species: 'Ashwagandha',
      quantity: 30,
      date: '2024-01-14',
      farmer: 'Ravi Kumar',
      farmLocation: 'Mysore, Karnataka',
      gps: { lat: 12.9716, lng: 77.5946 },
      status: 'assigned_to_agency',
      assignedDate: '2024-01-15',
      contact: '+91 9876543210'
    },
    {
      id: 'BATCH004',
      species: 'Ashwagandha',
      quantity: 40,
      date: '2024-01-16',
      farmer: 'Lakshmi Devi',
      farmLocation: 'Hassan, Karnataka',
      gps: { lat: 13.0067, lng: 76.1000 },
      status: 'assigned_to_agency',
      assignedDate: '2024-01-17',
      contact: '+91 9876543211'
    },
    {
      id: 'BATCH005',
      species: 'Ashwagandha',
      quantity: 25,
      date: '2024-01-13',
      farmer: 'Suresh Patel',
      farmLocation: 'Tumkur, Karnataka',
      gps: { lat: 13.3379, lng: 77.1022 },
      status: 'collected',
      assignedDate: '2024-01-14',
      collectedDate: '2024-01-15',
      contact: '+91 9876543212'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned_to_agency': return 'bg-blue-100 text-blue-800';
      case 'collected': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned_to_agency': return 'Assigned';
      case 'collected': return 'Collected';
      case 'in_transit': return 'In Transit';
      default: return status;
    }
  };

  const handleStatusUpdate = (batchId: string, newStatus: string) => {
    console.log(`Updating batch ${batchId} to status: ${newStatus}`);
    // Here you would typically make an API call to update the status
    setSelectedBatch(null);
    setStatusUpdate('');
  };

  const getBatchHistory = (batch: any) => {
    const history = [
      {
        stage: 'Batch Created',
        date: batch.date,
        actor: batch.farmer,
        location: batch.farmLocation
      },
      {
        stage: 'Assigned to Agency',
        date: batch.assignedDate,
        actor: 'Green Harvest Agency',
        location: 'Bangalore, Karnataka'
      }
    ];

    if (batch.status === 'collected' || batch.status === 'in_transit') {
      history.push({
        stage: 'Collected',
        date: batch.collectedDate || batch.assignedDate,
        actor: 'Green Harvest Agency',
        location: batch.farmLocation
      });
    }

    return history;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Agency Dashboard</h1>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Assigned</p>
                <p className="text-2xl font-semibold text-gray-900">{assignedBatches.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Collection</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {assignedBatches.filter(b => b.status === 'assigned_to_agency').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Collected</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {assignedBatches.filter(b => b.status === 'collected').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {assignedBatches.filter(b => b.status === 'in_transit').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Batches */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Assigned Batches</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedBatches.map((batch) => (
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
                    <p><strong>Farmer:</strong> {batch.farmer}</p>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{batch.farmLocation}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Created: {batch.date}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedBatch(batch)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    
                    {batch.status === 'assigned_to_agency' && (
                      <button
                        onClick={() => handleStatusUpdate(batch.id, 'collected')}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark as Collected
                      </button>
                    )}
                    
                    {batch.status === 'collected' && (
                      <button
                        onClick={() => handleStatusUpdate(batch.id, 'in_transit')}
                        className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Mark In Transit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Batch Details Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Batch Details & History</h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Batch Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Information</h3>
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
                    <label className="block text-sm font-medium text-gray-500">Farmer</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedBatch.farmer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Farm Location</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedBatch.farmLocation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Contact</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedBatch.contact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">GPS Location</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedBatch.gps.lat.toFixed(4)}, {selectedBatch.gps.lng.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Current Status</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedBatch.status)}`}>
                      {getStatusText(selectedBatch.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* History Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch History</h3>
                <div className="space-y-4">
                  {getBatchHistory(selectedBatch).map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.stage}</h4>
                        <p className="text-sm text-gray-600">
                          {event.date} • {event.actor} • {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Section */}
              {selectedBatch.status === 'assigned_to_agency' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Update Status</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedBatch.id, 'collected')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Collected
                    </button>
                  </div>
                </div>
              )}

              {selectedBatch.status === 'collected' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Update Status</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedBatch.id, 'in_transit')}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Mark In Transit
                    </button>
                  </div>
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

export default AgentDashboard;