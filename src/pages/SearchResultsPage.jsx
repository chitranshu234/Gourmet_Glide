import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { RecipeCard, SkeletonCard, StatusDisplay, AnimatedPage } from '../components/OtherComponents';
import { cardContainerVariants } from '../components/animations';

const SearchResultsPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.searchByName(query)
      .then(response => {
        setResults(response.data.meals || []);
      })
      .catch(error => {
        console.error("Search failed:", error);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold font-lora mb-6 text-primary-text">Results for "{query}"</h2>
        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        ) : results.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {results.map(recipe => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
          </motion.div>
        ) : (
          <StatusDisplay message={`No recipes found for "${query}". Try another search!`} />
        )}
      </div>
    </AnimatedPage>
  );
};

export default SearchResultsPage;