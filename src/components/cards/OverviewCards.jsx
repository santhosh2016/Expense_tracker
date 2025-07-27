import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const OverviewCards = ({ totalIncome, totalExpenses, balance }) => {
  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      isPositive: true
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      isPositive: false
    },
    {
      title: 'Balance',
      amount: balance,
      icon: Wallet,
      color: balance >= 0 ? 'from-blue-400 to-blue-600' : 'from-red-400 to-red-600',
      bgColor: balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
      textColor: balance >= 0 ? 'text-blue-600' : 'text-red-600',
      isPositive: balance >= 0
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  {card.title}
                </p>
                <motion.p
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className={`text-3xl font-bold ${card.textColor}`}
                >
                  {card.isPositive ? '+' : ''}{formatCurrency(card.amount)}
                </motion.p>
                <div className="flex items-center mt-2">
                  <div className={`w-2 h-2 rounded-full ${card.bgColor} mr-2`}></div>
                  <span className="text-xs text-gray-500">
                    {card.isPositive ? 'Increase' : 'Decrease'} from last month
                  </span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OverviewCards;

