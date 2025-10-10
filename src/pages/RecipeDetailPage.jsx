import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import useLocalStorage from '../hooks/useLocalStorage';
import { StatusDisplay, AnimatedPage } from '../components/OtherComponents';
import { cardContainerVariants, cardVariants } from '../components/animations';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const isFavorited = favorites.some(fav => fav.idMeal === id);

  useEffect(() => {
    setLoading(true);
    api.getById(id)
      .then(response => {
        setRecipe(response.data.meals[0]);
      })
      .catch(error => console.error("Failed to fetch recipe:", error))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorited) {
        setFavorites(favorites.filter(fav => fav.idMeal !== id));
    } else {
        const newFavorite = { idMeal: recipe.idMeal, strMeal: recipe.strMeal, strMealThumb: recipe.strMealThumb };
        setFavorites([...favorites, newFavorite]);
    }
  };

  if (loading) return (
      <div className="container mx-auto p-8">
        <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse mb-6"></div>
        <div className="h-10 w-3/4 bg-gray-300 rounded animate-pulse mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
      </div>
  );
  if (!recipe) return <StatusDisplay message="Oops! Recipe not found." />;

  const ingredients = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map(key => ({
      ingredient: recipe[key],
      measure: recipe[`strMeasure${key.slice(13)}`]
    }));

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <motion.div className="flex items-center justify-between mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl font-bold font-lora text-primary-text">{recipe.strMeal}</h1>
            <button onClick={toggleFavorite} className="p-2 transition-transform transform rounded-full hover:bg-gray-200 active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill={isFavorited ? '#D9534F' : 'none'} stroke={isFavorited ? '#D9534F' : 'currentColor'} strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
            </button>
        </motion.div>

        <motion.div
            className="flex flex-col lg:flex-row gap-8"
            initial="hidden"
            animate="visible"
            variants={cardContainerVariants}
        >
          <motion.div className="lg:w-1/2" variants={cardVariants}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full rounded-lg shadow-lg" />
          </motion.div>
          <motion.div className="lg:w-1/2" variants={cardVariants}>
            <h2 className="text-2xl font-bold font-lora mb-3 border-b-2 border-accent pb-2 text-primary-text">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {ingredients.map((item, index) => (
                <li key={index}>{item.measure} {item.ingredient}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold font-lora mb-3 border-b-2 border-accent pb-2 text-primary-text">Instructions</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{recipe.strInstructions}</p>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default RecipeDetailPage;