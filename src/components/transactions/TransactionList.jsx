import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Car, 
  Utensils, 
  DollarSign, 
  Search, 
  Filter,
  ArrowUpDown,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const TransactionList = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'food':
        return Utensils;
      case 'shopping':
        return ShoppingBag;
      case 'travel':
        return Car;
      default:
        return DollarSign;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = Math.abs(a.amount);
          bValue = Math.abs(b.amount);
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'date':
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [transactions, searchTerm, sortBy, sortOrder, filterType]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 rounded-xl"
    >
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <p className="text-sm text-gray-600">{filteredAndSortedTransactions.length} transactions</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
      </div>

      {/* Sort buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleSort('date')}
          className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
            sortBy === 'date' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Calendar className="w-3 h-3" />
          <span>Date</span>
          {sortBy === 'date' && <ArrowUpDown className="w-3 h-3" />}
        </button>
        
        <button
          onClick={() => handleSort('amount')}
          className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
            sortBy === 'amount' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <DollarSign className="w-3 h-3" />
          <span>Amount</span>
          {sortBy === 'amount' && <ArrowUpDown className="w-3 h-3" />}
        </button>
        
        <button
          onClick={() => handleSort('category')}
          className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
            sortBy === 'category' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Filter className="w-3 h-3" />
          <span>Category</span>
          {sortBy === 'category' && <ArrowUpDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Transaction list */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredAndSortedTransactions.map((transaction, index) => {
            const Icon = getCategoryIcon(transaction.category);
            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`p-3 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 group-hover:bg-green-200' 
                        : 'bg-red-100 group-hover:bg-red-200'
                    } transition-colors duration-200`}
                  >
                    <Icon className={`w-5 h-5 ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </motion.div>
                  
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <motion.p 
                    whileHover={{ scale: 1.05 }}
                    className={`font-semibold text-lg ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <span className="flex items-center">
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredAndSortedTransactions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">No transactions found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionList;

