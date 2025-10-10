import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardVariants } from './animations';
import { pageVariants, pageTransition } from './animations';

export const StatusDisplay = ({ message }) => (
    <div className="flex items-center justify-center py-20">
        <p className="text-xl text-center text-gray-500">{message}</p>
    </div>
);

export const SkeletonCard = () => (
    <div className="bg-card-bg rounded-lg shadow-md animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
        <div className="p-4">
            <div className="w-3/4 h-6 mb-2 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        </div>
    </div>
);

export const RecipeCard = ({ recipe }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 15px 35px rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    whileTap={{ scale: 0.98 }}
  >
    <Link to={`/recipe/${recipe.idMeal}`} className="block overflow-hidden bg-card-bg rounded-lg shadow-md group">
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate font-poppins text-primary-text group-hover:text-accent transition-colors duration-200">
          {recipe.strMeal}
        </h3>
        <p className="text-sm text-gray-600">{recipe.strCategory || ''}</p>
      </div>
    </Link>
  </motion.div>
);

export const AnimatedPage = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
        {children}
    </motion.div>
);