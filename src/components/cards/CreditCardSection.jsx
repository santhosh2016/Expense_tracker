import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Square, Wifi } from 'lucide-react';

const CreditCardSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6 }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6 }
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Credit Cards</h3>
        <button 
          onClick={handleCardClick}
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isFlipped ? 'Show Front' : 'Show Back'}
        </button>
      </div>
      
      <div className="perspective-1000">
        <motion.div
          drag
          dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileHover={{ 
            scale: 1.05,
            rotateX: 5,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
          animate={isFlipped ? "back" : "front"}
          variants={cardVariants}
          className={`relative w-full h-56 rounded-2xl cursor-pointer transform-gpu ${
            isDragging ? 'z-10' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={handleCardClick}
        >
          {/* Front of the card */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-6 shadow-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Chip and contactless icons */}
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center">
                <Square className="w-6 h-6 text-yellow-800" />
              </div>
              <Wifi className="w-6 h-6 opacity-70" />
            </div>

            {/* Card number */}
            <div className="mb-6">
              <p className="text-sm opacity-80 mb-1">Card Number</p>
              <p className="text-xl font-mono tracking-wider">
                **** **** **** 1234
              </p>
            </div>

            {/* Card holder and expiry */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm opacity-80">Card Holder</p>
                <p className="font-semibold">Santhosh</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Expires</p>
                <p className="font-semibold">12/27</p>
              </div>
            </div>

            {/* Card brand logo */}
            <div className="absolute top-6 right-6">
              <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white p-6 shadow-2xl"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Magnetic stripe */}
            <div className="w-full h-12 bg-black mt-4 mb-6"></div>
            
            {/* CVV section */}
            <div className="bg-white/90 rounded p-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 text-sm">CVV</span>
                <span className="text-gray-800 font-mono">***</span>
              </div>
            </div>

            {/* Card info */}
            <div className="text-xs opacity-80 space-y-1">
              <p>This card is property of ExpenseTracker Bank</p>
              <p>If found, please return to nearest branch</p>
              <p>Customer Service: 1-800-EXPENSE</p>
            </div>

            {/* Signature strip */}
            <div className="absolute bottom-6 right-6 w-20 h-6 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs">Signature</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Available Credit</p>
          <p className="text-lg font-semibold text-blue-600">₹8,750</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Cashback Earned</p>
          <p className="text-lg font-semibold text-green-600">₹127.50</p>
        </div>
      </div>

      {/* Drag hint */}
      {!isDragging && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-500 text-center mt-3"
        >
          💡 Drag the card around or click to flip
        </motion.p>
      )}
    </div>
  );
};

export default CreditCardSection;

