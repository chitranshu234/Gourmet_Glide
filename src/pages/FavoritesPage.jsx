import React from 'react';
import { motion } from 'framer-motion';
import useLocalStorage from '../hooks/useLocalStorage';
import { RecipeCard, StatusDisplay, AnimatedPage } from '../components/OtherComponents';
import { cardContainerVariants } from '../components/animations';


const FavoritesPage = () => {
    const [favorites] = useLocalStorage('favorites', []);

    return (
        <AnimatedPage>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold font-lora mb-6 text-primary-text">Your Favorite Recipes</h2>
                {favorites.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {favorites.map(recipe => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
                    </motion.div>
                ) : (
                    <StatusDisplay message="You haven't saved any favorite recipes yet. Click the heart icon on a recipe to add it!" />
                )}
            </div>
        </AnimatedPage>
    );
};

export default FavoritesPage;