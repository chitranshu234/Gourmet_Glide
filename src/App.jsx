import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/Homepage';
import SearchResultsPage from './pages/SearchResultsPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:query" element={<SearchResultsPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;