import React, { useState } from 'react';
import { ArrowLeft, Scan, Camera, Upload, AlertCircle, CheckCircle, MapPin, Calendar, User } from 'lucide-react';

interface QRScannerProps {
  onViewChange: (view: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onViewChange }) => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        batchId: 'ASH-2024-001',
        product: 'Premium Ashwagandha Powder',
        status: 'verified',
        manufacturer: 'Ayur Naturals Pvt Ltd',
        collectionDate: '2024-01-15',
        location: 'Mysore, Karnataka',
        quality: 'A+',
        certificate: 'BT-ASH-2024-001'
      });
    }, 2000);
  };

  const mockResults = [
    {
      batchId: 'ASH-2024-001',
      product: 'Premium Ashwagandha Powder',
      status: 'verified',
      manufacturer: 'Ayur Naturals Pvt Ltd',
      location: 'Mysore, Karnataka'
    },
    {
      batchId: 'TUR-2024-001',
      product: 'Organic Turmeric Powder',
      status: 'verified',
      manufacturer: 'Spice Valley Co.',
      location: 'Erode, Tamil Nadu'
    },
    {
      batchId: 'BRA-2024-001',
      product: 'Brahmi Extract Capsules',
      status: 'warning',
      manufacturer: 'Herbal Life Ltd.',
      location: 'Haridwar, Uttarakhand'
    }
  ];

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
                QR Code Scanner
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scanner Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Scan Product QR Code
            </h2>
            <p className="text-gray-600 mb-8">
              Scan the QR code on your Ayurvedic product to verify its authenticity and view complete traceability information.
            </p>

            {!isScanning && !scanResult && (
              <div className="space-y-6">
                {/* Mock camera view */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Camera feed will appear here</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={simulateScan}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Scan className="w-5 h-5" />
                    <span>Start Scanning</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="space-y-6">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg h-64 flex items-center justify-center relative">
                  <div className="absolute inset-4 border-2 border-green-500 rounded-lg animate-pulse"></div>
                  <div className="text-center">
                    <Scan className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                    <p className="text-green-700 font-medium">Scanning QR Code...</p>
                  </div>
                </div>
              </div>
            )}

            {scanResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-900">
                    Product Verified Successfully
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Batch ID</p>
                    <p className="text-lg font-semibold text-gray-900">{scanResult.batchId}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Product</p>
                    <p className="text-lg font-semibold text-gray-900">{scanResult.product}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Manufacturer</p>
                    <p className="text-lg font-semibold text-gray-900">{scanResult.manufacturer}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Collection Location</p>
                    <p className="text-lg font-semibold text-gray-900">{scanResult.location}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => onViewChange('trace')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Complete Traceability
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Scans / Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {scanResult ? 'Recent Scans' : 'Example Products'}
          </h3>
          
          <div className="space-y-4">
            {mockResults.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        result.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <h4 className="font-medium text-gray-900">{result.product}</h4>
                      <span className="text-sm text-gray-500">({result.batchId})</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {result.manufacturer}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {result.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.status === 'verified' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-blue-900 mb-3">
            How to Use QR Scanner
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Start Scanning" to activate the camera</li>
            <li>Point your device camera at the QR code on the product</li>
            <li>Wait for the scan to complete automatically</li>
            <li>View the verification results and traceability information</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;