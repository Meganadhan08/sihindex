import React, { useState } from 'react';
import { Package, TrendingUp, Factory, Award, LogOut, ArrowLeft, Eye, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ManufacturerDashboardProps {
  onBack?: () => void;
}

const ManufacturerDashboard: React.FC<ManufacturerDashboardProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [showProcessForm, setShowProcessForm] = useState(false);

  const availableBatches = [
    {
      id: 'BATCH005',
      species: 'Ashwagandha',
      quantity: 25,
      farmer: 'Suresh Patel',
      agency: 'Green Harvest Agency',
      status: 'in_transit',
      expectedArrival: '2024-01-20',
      qualityGrade: 'A+',
      testResults: {
        moisture: 8.5,
        purity: 98.2,
        contamination: 'None detected'
      }
    },
    {
      id: 'BATCH006',
      species: 'Ashwagandha',
      quantity: 35,
      farmer: 'Lakshmi Devi',
      agency: 'Green Harvest Agency',
      status: 'received',
      receivedDate: '2024-01-18',
      qualityGrade: 'A',
      testResults: {
        moisture: 9.1,
        purity: 96.8,
        contamination: 'Trace metals within limits'
      }
    }
  ];

  const processedProducts = [
    {
      id: 'PROD001',
      batchId: 'BATCH003',
      productName: 'Premium Ashwagandha Powder',
      inputQuantity: 20,
      outputQuantity: 18,
      processDate: '2024-01-15',
      expiryDate: '2025-01-15',
      batchNumber: 'ASH-PWD-2024-001',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_transit': return 'In Transit';
      case 'received': return 'Received';
      case 'processing': return 'Processing';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Manufacturer Dashboard</h1>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProcessForm(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Process</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Batches</p>
                <p className="text-2xl font-semibold text-gray-900">{availableBatches.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Factory className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processed Products</p>
                <p className="text-2xl font-semibold text-gray-900">{processedProducts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Output</p>
                <p className="text-2xl font-semibold text-gray-900">2.4T</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Quality Rating</p>
                <p className="text-2xl font-semibold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Batches */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Available Batches for Processing</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableBatches.map((batch) => (
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
                    <p><strong>Quality Grade:</strong> {batch.qualityGrade}</p>
                    <p><strong>Farmer:</strong> {batch.farmer}</p>
                    <p><strong>Agency:</strong> {batch.agency}</p>
                    {batch.expectedArrival && (
                      <p><strong>Expected:</strong> {batch.expectedArrival}</p>
                    )}
                    {batch.receivedDate && (
                      <p><strong>Received:</strong> {batch.receivedDate}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedBatch(batch)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    
                    {batch.status === 'received' && (
                      <button
                        onClick={() => setShowProcessForm(true)}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Start Processing
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Processed Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Processed Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input/Output</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.batchNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>In: {product.inputQuantity} kg</div>
                        <div>Out: {product.outputQuantity} kg</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.processDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

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
                  <label className="block text-sm font-medium text-gray-500">Quality Grade</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.qualityGrade}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Farmer</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.farmer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Agency</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedBatch.agency}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Results</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Moisture</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedBatch.testResults.moisture}%</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Purity</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedBatch.testResults.purity}%</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Contamination</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedBatch.testResults.contamination}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedBatch.status === 'received' && (
                  <button
                    onClick={() => {
                      setSelectedBatch(null);
                      setShowProcessForm(true);
                    }}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Start Processing
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Form Modal */}
      {showProcessForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Processing Form</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch ID</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Select Batch</option>
                    {availableBatches.filter(b => b.status === 'received').map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {batch.id} - {batch.species} ({batch.quantity} kg)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Premium Ashwagandha Powder"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Input Quantity (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Output (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Processing Method</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Describe the processing method..."
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowProcessForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Start Processing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerDashboard;