import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="sticky top-0 z-40 p-4 shadow-md bg-card-bg/80 backdrop-blur-sm">
    <div className="container flex items-center justify-between mx-auto">
      <Link to="/" className="text-5xl font-bold font-dancing text-primary-text">
        Gourmet Glide
      </Link>
      <nav className="flex items-center gap-2">
        <Link to="/" className="px-4 py-2 text-sm font-semibold transition-colors rounded-md hover:bg-accent hover:text-white">
          Home
        </Link>
        <Link to="/favorites" className="px-4 py-2 text-sm font-semibold transition-colors rounded-md hover:bg-accent hover:text-white">
          Favorites
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;