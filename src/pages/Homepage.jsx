import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import { RecipeCard, SkeletonCard, AnimatedPage } from '../components/OtherComponents';
import {
    heroVariants, floatingElementVariants, titleVariants, subtitleVariants,
    searchBarVariants, cardContainerVariants, categoryButtonVariants, cardVariants
} from '../components/animations';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listCategories().then(res => {
        setCategories(res.data.categories);
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setRecipes([]);
    api.filterByCategory(selectedCategory).then(res => {
        setRecipes(res.data.meals);
    }).catch(err => {
        console.error(err);
    }).finally(() => {
        setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <AnimatedPage>
      {/* Enhanced Hero Section */}
      <motion.div
        className="relative flex flex-col items-center justify-center min-h-[80vh] text-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-orange-200/30 rounded-full blur-xl"
          variants={floatingElementVariants}
          animate="float"
        />
        <motion.div
          className="absolute bottom-32 right-16 w-40 h-40 bg-red-200/30 rounded-full blur-xl"
          variants={floatingElementVariants}
          animate="float"
          transition={{ delay: 1, duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200/40 rounded-full blur-xl"
          variants={floatingElementVariants}
          animate="float"
          transition={{ delay: 2, duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Food Icons - Adjusted positioning */}
        <motion.div
          className="absolute top-16 right-1/4 text-6xl z-0"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🍳
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-1/3 text-5xl z-0"
          animate={{
            rotate: [0, -15, 15, 0],
            y: [5, -5, 5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🥘
        </motion.div>
        <motion.div
          className="absolute top-20 left-16 text-4xl z-0"
          animate={{
            rotate: [0, 20, -20, 0],
            y: [-3, 3, -3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🍕
        </motion.div>

        {/* Main Content */}
        <motion.div className="relative z-10 px-4 max-w-4xl">
          <motion.h1
            className="text-6xl md:text-7xl font-pacifico text-primary-text mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            Find  Your  Next
            
            <motion.span
              className="block text-accent"
              animate={{
                scale: [1, 1.02, 1],
                textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 5px 15px rgba(0,0,0,0.1)", "0px 0px 0px rgba(0,0,0,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Culinary  Adventure
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={subtitleVariants}
          >
            Discover thousands of recipes from around the world. Simple, easy, and absolutely delicious.
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
          </motion.p>

          <motion.div variants={searchBarVariants}>
            <SearchBar />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Categories and Recipes Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Categories Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-lora mb-4 text-primary-text">
              Explore by
              <span className="text-accent"> Category</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-accent to-orange-400 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat.idCategory}
                onClick={() => setSelectedCategory(cat.strCategory)}
                variants={categoryButtonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedCategory === cat.strCategory
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                }`}
                custom={index}
              >
                {cat.strCategory}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Recipes Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-lora text-primary-text">
              Popular in{' '}
              <motion.span
                className="text-accent"
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedCategory}
              </motion.span>
            </h2>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-accent to-orange-400 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <motion.div key={i} variants={cardVariants}>
                      <SkeletonCard />
                    </motion.div>
                  ))
                : recipes.map((recipe, index) => (
                    <RecipeCard
                      key={recipe.idMeal}
                      recipe={recipe}
                    />
                  ))
              }
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;