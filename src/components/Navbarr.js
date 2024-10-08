import React, { useState } from 'react';
import './Navbar.css'; 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert("Veuillez saisir une requête de recherche !");
      return;
    }
    console.log(`Recherche effectuée pour : ${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <h1>Planing'Work</h1>
      <div className="navbar-content">
        <div className="logo">
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Valider
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
