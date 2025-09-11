import React from 'react';
import { Users, Package, FlaskConical, Factory, TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, Globe, Shield, Award } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const systemStats = [
    { label: 'Total Collections', value: '1,247', icon: Package, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Users', value: '89', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Lab Tests', value: '856', icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Processed Batches', value: '423', icon: Factory, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'collection',
      message: 'New Ashwagandha collection recorded by Ravi Kumar',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'test',
      message: 'Lab test completed for Turmeric batch TUR-2024-001',
      timestamp: '4 hours ago',
      status: 'warning'
    },
    {
      id: 3,
      type: 'processing',
      message: 'Processing completed for Brahmi batch BRA-2024-001',
      timestamp: '6 hours ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'user',
      message: 'New laboratory user registered: BioTest Labs',
      timestamp: '1 day ago',
      status: 'info'
    }
  ];

  const qualityMetrics = [
    { label: 'AYUSH Compliance Rate', value: '94.2%', trend: '+2.1%', color: 'text-green-600' },
    { label: 'Test Success Rate', value: '91.8%', trend: '+1.5%', color: 'text-green-600' },
    { label: 'Traceability Coverage', value: '99.7%', trend: '+0.3%', color: 'text-green-600' },
    { label: 'Blockchain Verification', value: '100%', trend: '0%', color: 'text-green-600' }
  ];

  const usersByRole = [
    { role: 'Farmers/Collectors', count: 45, percentage: 50.6 },
    { role: 'Laboratories', count: 18, percentage: 20.2 },
    { role: 'Processors', count: 15, percentage: 16.9 },
    { role: 'Administrators', count: 11, percentage: 12.4 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'collection': return <Package className="w-4 h-4" />;
      case 'test': return <FlaskConical className="w-4 h-4" />;
      case 'processing': return <Factory className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600">Monitor and manage the entire traceability ecosystem</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quality & Compliance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {qualityMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className={`text-sm font-medium ${metric.color}`}>{metric.trend}</span>
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">User Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {usersByRole.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" style={{
                      backgroundColor: `hsl(${120 + index * 60}, 60%, 50%)`
                    }}></div>
                    <span className="text-sm font-medium text-gray-900">{user.role}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{user.count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ 
                          width: `${user.percentage}%`,
                          backgroundColor: `hsl(${120 + index * 60}, 60%, 50%)`
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{user.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Health & Security</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Blockchain Network</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">API Services</p>
                <p className="text-xs text-blue-600">99.9% Uptime</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Data Integrity</p>
                <p className="text-xs text-purple-600">100% Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Manage Users</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Award className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">View Certificates</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Generate Reports</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Security Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;