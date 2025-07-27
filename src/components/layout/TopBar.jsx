import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TopBar = ({ onAddTransaction }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Welcome message */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, Santhosh! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your money today.
          </p>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 bg-white/50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Add Transaction Button */}
          <Button
            onClick={onAddTransaction}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover-lift transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;

