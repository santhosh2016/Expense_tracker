import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import OverviewCards from '../cards/OverviewCards';
import CreditCardSection from '../cards/CreditCardSection';
import ExpenseChart from '../charts/ExpenseChart';
import TransactionList from '../transactions/TransactionList';
import AddTransactionModal from '../modals/AddTransactionModal';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for the dashboard
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: -45.50,
      category: 'Food',
      type: 'expense',
      date: '2025-01-20',
      description: 'Lunch at restaurant'
    },
    {
      id: 2,
      amount: 2500.00,
      category: 'Salary',
      type: 'income',
      date: '2025-01-15',
      description: 'Monthly salary'
    },
    {
      id: 3,
      amount: -120.00,
      category: 'Shopping',
      type: 'expense',
      date: '2025-01-18',
      description: 'Clothing purchase'
    },
    {
      id: 4,
      amount: -85.30,
      category: 'Travel',
      type: 'expense',
      date: '2025-01-19',
      description: 'Gas station'
    }
  ]);

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([transaction, ...transactions]);
    setIsModalOpen(false);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const balance = totalIncome - totalExpenses;

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <TopBar onAddTransaction={() => setIsModalOpen(true)} />
        
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OverviewCards 
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CreditCardSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ExpenseChart transactions={transactions} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TransactionList transactions={transactions} />
          </motion.div>
        </main>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={addTransaction}
      />
    </div>
  );
};

export default Dashboard;

