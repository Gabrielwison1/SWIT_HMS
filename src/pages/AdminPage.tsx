import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Hotel, Calendar, DollarSign, Settings, BarChart3, Plus, Search } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'rooms', label: 'Room Management', icon: Hotel },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'bookings', label: 'Booking Management', icon: Calendar },
    { id: 'finance', label: 'Account Finance', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Rooms', value: '156', change: '+2.5%', trend: 'up' },
    { label: 'Occupancy Rate', value: '84%', change: '+1.2%', trend: 'up' },
    { label: 'Revenue Today', value: '£12,456', change: '+5.8%', trend: 'up' },
    { label: 'Pending Bookings', value: '23', change: '-3.1%', trend: 'down' },
  ];

  const recentBookings = [
    { id: 'BWK123', guest: 'John Smith', room: 'Deluxe 201', checkIn: '2025-01-20', status: 'Confirmed' },
    { id: 'BWK124', guest: 'Sarah Johnson', room: 'Suite 301', checkIn: '2025-01-22', status: 'Pending' },
    { id: 'BWK125', guest: 'Mike Davis', room: 'Standard 105', checkIn: '2025-01-25', status: 'Confirmed' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.label}</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{booking.guest}</p>
                        <p className="text-sm text-gray-600">{booking.room} • {booking.checkIn}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 text-primary-600" />
                      <span className="font-medium text-primary-700">Add New Room</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">Create Booking</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-700">Add Customer</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rooms':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Room
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search rooms..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>All Room Types</option>
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                  </select>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600">Room management interface would be implemented here with full CRUD operations.</p>
                <p className="text-sm text-gray-500 mt-2">This is a placeholder for the complete room management system.</p>
              </div>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Customer
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Customer database and profile management would be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">Features: Customer profiles, booking history, preferences, contact management.</p>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Booking
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Comprehensive booking management system would be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">Features: View all bookings, modify reservations, cancellations, check-in/out management.</p>
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Finance</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Financial tracking and reporting system would be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">Features: Revenue tracking, transaction logs, financial reports, payment processing.</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">System configuration and settings panel would be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">Features: Hotel information, pricing settings, user management, system preferences.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotel Management System</h1>
          <p className="text-gray-600">Manage your hotel operations efficiently</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-64"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
