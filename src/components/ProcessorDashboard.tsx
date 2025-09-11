import React, { useState } from 'react';
import { Plus, Package, TrendingUp, Users, Award, Factory, Thermometer, Clock, Scale } from 'lucide-react';

const ProcessorDashboard: React.FC = () => {
  const [showProcessForm, setShowProcessForm] = useState(false);

  const processingRecords = [
    {
      id: 'PRC001',
      collectionId: 'COL001',
      herb: 'Ashwagandha',
      processType: 'Drying & Grinding',
      processDate: '2024-01-20',
      inputQuantity: 50,
      outputQuantity: 12.5,
      batchNumber: 'ASH-BATCH-001',
      processingMethod: 'Solar Drying + Fine Grinding',
      temperature: 45,
      duration: '48 hours',
      equipment: 'Solar Dryer + Pulverizer',
      qualityGrade: 'A+',
      expiryDate: '2025-12-15',
      storageConditions: 'Cool, dry place below 25°C',
      packaging: 'Airtight pouches with desiccant',
      status: 'Completed'
    },
    {
      id: 'PRC002',
      collectionId: 'COL002',
      herb: 'Turmeric',
      processType: 'Cleaning & Grinding',
      processDate: '2024-01-18',
      inputQuantity: 75,
      outputQuantity: 18.75,
      batchNumber: 'TUR-BATCH-001',
      processingMethod: 'Steam Cleaning + Grinding',
      temperature: 80,
      duration: '24 hours',
      equipment: 'Steam Cleaner + Grinder',
      qualityGrade: 'A',
      expiryDate: '2025-10-15',
      storageConditions: 'Cool, dry place below 20°C',
      packaging: 'Food-grade containers',
      status: 'In Progress'
    }
  ];

  const pendingCollections = [
    { id: 'COL006', herb: 'Brahmi', quantity: '30 kg', receivedDate: '2024-01-19', testStatus: 'Passed' },
    { id: 'COL007', herb: 'Neem', quantity: '45 kg', receivedDate: '2024-01-18', testStatus: 'Passed' },
    { id: 'COL008', herb: 'Tulsi', quantity: '25 kg', receivedDate: '2024-01-17', testStatus: 'Passed' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processor Dashboard</h1>
          <p className="text-gray-600">Manufacturing and processing management</p>
        </div>
        <button
          onClick={() => setShowProcessForm(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Process</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Factory className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Batches Processed</p>
              <p className="text-2xl font-semibold text-gray-900">89</p>
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
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-2xl font-semibold text-gray-900">15</p>
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

      {/* Pending Collections for Processing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ready for Processing</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingCollections.map((collection) => (
              <div key={collection.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{collection.herb}</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {collection.testStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">ID: {collection.id}</p>
                <p className="text-sm text-gray-600 mb-1">Quantity: {collection.quantity}</p>
                <p className="text-xs text-gray-500 mb-3">Received: {collection.receivedDate}</p>
                <button
                  onClick={() => setShowProcessForm(true)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Start Processing
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Processing Records */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Processing Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Herb</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input/Output</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processingRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.herb}</div>
                      <div className="text-sm text-gray-500">Collection: {record.collectionId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.processType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.batchNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>Input: {record.inputQuantity} kg</div>
                      <div>Output: {record.outputQuantity} kg</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.qualityGrade === 'A+' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {record.qualityGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.expiryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Processing Form Modal */}
      {showProcessForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Processing Record Form</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Collection Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection ID</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Select Collection</option>
                    {pendingCollections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.id} - {collection.herb} ({collection.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Process Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Process Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Process Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Drying & Grinding</option>
                    <option>Cleaning & Grinding</option>
                    <option>Steam Processing</option>
                    <option>Extraction</option>
                    <option>Formulation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., ASH-BATCH-001"
                    required
                  />
                </div>
              </div>

              {/* Quantities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Input Quantity (kg)</label>
                  <div className="flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Output (kg)</label>
                  <div className="flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Processing Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 48 hours"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality Grade</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>A+</option>
                    <option>A</option>
                    <option>B+</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
              </div>

              {/* Processing Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Processing Method</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Describe the processing method in detail..."
                  required
                ></textarea>
              </div>

              {/* Equipment Used */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Used</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Solar Dryer + Pulverizer"
                  required
                />
              </div>

              {/* Storage & Packaging */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Conditions</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Cool, dry place below 25°C"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Packaging</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Airtight pouches with desiccant"
                    required
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              {/* Form Actions */}
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
                  Save Processing Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessorDashboard;