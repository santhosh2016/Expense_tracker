import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  PieChart, 
  List, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggle }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: CreditCard, label: 'Cards', active: false },
    { icon: PieChart, label: 'Analytics', active: false },
    { icon: List, label: 'Transactions', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-md border-r border-blue-100 shadow-lg z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-100">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-800">ExpenseTracker</span>
          </motion.div>
        )}
        
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 hover-lift ${
                    item.active
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : ''}`} />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-3 right-3"
        >
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">Premium User</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;

