import React from 'react';
import { motion } from 'framer-motion';
import upload from '../../assets/svg/upload.svg'

const UploadLoader = ({ currentItem, totalImages }) => {
  const progress = totalImages > 0 ? (currentItem / totalImages) * 100 : 0;

  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <motion.div 
        className="text-primary"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <img src={upload} alt="upload icon" className="w-12 h-12" />
      </motion.div>

      <div className="flex flex-col justify-start items-start w-full space-y-2">
        <motion.h1 
          className="text-lg font-medium text-gray-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Uploading {currentItem}/{totalImages}
        </motion.h1>

        <div className="min-w-[350px] max-w-[350px] h-[10px] bg-[#FAE8EF] rounded-[10px] border relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-[5px] bg-gradient-to-r from-primary to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadLoader;