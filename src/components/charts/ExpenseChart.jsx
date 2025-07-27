import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

const ExpenseChart = ({ transactions }) => {
  const [chartType, setChartType] = useState('pie');
  const [animationKey, setAnimationKey] = useState(0);

  // Process transactions to get expense data by category
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      const amount = Math.abs(transaction.amount);
      
      const existing = acc.find(item => item.name === category);
      if (existing) {
        existing.value += amount;
      } else {
        acc.push({ name: category, value: amount });
      }
      return acc;
    }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316'];

  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-3 rounded-lg shadow-lg border border-gray-200"
        >
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600">
            ${payload[0].value.toFixed(2)}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  // Custom label component for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Trigger animation when chart type changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [chartType]);

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Expense Breakdown</h3>
          <p className="text-sm text-gray-600">Total: ${totalExpenses.toFixed(2)}</p>
        </div>
        
        {/* Chart type toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType('pie')}
            className={`p-2 rounded-md transition-all duration-200 ${
              chartType === 'pie' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <PieChartIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-md transition-all duration-200 ${
              chartType === 'bar' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        key={animationKey}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64 mb-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {expenseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={expenseData}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={0}
              >
                {expenseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Legend with animations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-3"
      >
        {expenseData.map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{entry.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-800">
                ${entry.value.toFixed(2)}
              </span>
              <div className="text-xs text-gray-500">
                {((entry.value / totalExpenses) * 100).toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Insights */}
      {expenseData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
        >
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">Insights</span>
          </div>
          <p className="text-sm text-blue-700">
            Your highest expense category is <strong>{expenseData[0]?.name}</strong> at{' '}
            <strong>${expenseData[0]?.value.toFixed(2)}</strong> (
            {((expenseData[0]?.value / totalExpenses) * 100).toFixed(1)}% of total expenses)
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ExpenseChart;

