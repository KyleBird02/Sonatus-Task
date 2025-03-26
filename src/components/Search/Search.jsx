import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import './styles.css';

function Search({ onSearch }) {
  // State to track the current search term
  const [currentSearch, setCurrentSearch] = useState('');

  const handleChange = (e) => {
    const term = e.target.value; // Get the current input value
    setCurrentSearch(term); // Update local state
    onSearch(term); // Notify parent component of the change
  };

  return (
    <div className="search-bar">
      {/* Icon container*/}
      <div className="search-icon-wrapper">
        <SearchIcon 
          className="search-icon" 
          size={20} // Set icon size
        />
      </div>
      
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by name or email" // Placeholder
        value={currentSearch} 
        onChange={handleChange} // Update as user types
        className="search-input"
      />
    </div>
  );
}

export default Search;