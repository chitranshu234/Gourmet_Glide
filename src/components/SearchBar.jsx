import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setQuery('');
    }
  };

  const fetchRandom = async () => {
    try {
        const res = await api.getRandom();
        navigate(`/recipe/${res.data.meals[0].idMeal}`);
    } catch(err) {
        console.error("Failed to fetch random recipe", err);
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl gap-4 mx-auto">
        <form onSubmit={handleSearch} className="flex justify-center w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a recipe..."
                className="w-full px-4 py-2 text-primary-text bg-card-bg border rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
                type="submit"
                className="px-6 py-2 text-white transition-colors bg-accent rounded-r-md hover:opacity-90"
            >
                Search
            </button>
        </form>
        <button
            onClick={fetchRandom}
            className="px-6 py-2 text-sm font-semibold transition-all transform border-2 rounded-full border-accent text-accent hover:bg-accent hover:text-white active:scale-95">
            Feeling Lucky? ✨
        </button>
    </div>
  );
};

export default SearchBar;