import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Tag, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const AddTransactionModal = ({ isOpen, onClose, onAddTransaction }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: ''
      });
      setErrors({});
      setShowSuccess(false);
    }
  }, [isOpen]);

  const categories = {
    expense: ['Food', 'Shopping', 'Travel', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Bonus', 'Other']
  };

  const validateForm = () => {
    const newErrors = {};

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    } else if (parseFloat(formData.amount) > 1000000) {
      newErrors.amount = 'Amount cannot exceed $1,000,000';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 3) {
      newErrors.description = 'Description must be at least 3 characters';
    } else if (formData.description.trim().length > 100) {
      newErrors.description = 'Description cannot exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

   
    await new Promise(resolve => setTimeout(resolve, 1000));

    const transaction = {
      type: formData.type,
      amount: formData.type === 'expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
      category: formData.category,
      description: formData.description.trim()
    };

    onAddTransaction(transaction);
    setShowSuccess(true);
    setIsSubmitting(false);

    // Close modal after success animation
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({ 
      ...prev, 
      type, 
      category: '' // Reset category when type changes
    }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add Transaction</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Success State */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 bg-white flex items-center justify-center z-10"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Transaction Added!</h3>
                  <p className="text-gray-600">Your transaction has been successfully recorded.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Tag className="w-4 h-4 inline mr-2" />
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTypeChange('expense')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.type === 'expense'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300 text-gray-600'
                  }`}
                >
                  <span className="font-medium">Expense</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('income')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.type === 'income'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-600'
                  }`}
                >
                  <span className="font-medium">Income</span>
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.amount
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.amount && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.amount}
                </motion.p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.category
                    ? 'border-red-500 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              >
                <option value="">Select a category</option>
                {categories[formData.type].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.category}
                </motion.p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <input
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.description
                    ? 'border-red-500 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                maxLength={100}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </motion.p>
                ) : (
                  <span></span>
                )}
                <span className="text-xs text-gray-500">
                  {formData.description.length}/100
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  'Add Transaction'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddTransactionModal;

