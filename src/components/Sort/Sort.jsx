import React from 'react';
import './styles.css';
import { MoveUp, MoveDown } from 'lucide-react';

function Sort({ sortDetails, onSort }) {
  return (
    <div className="sort-controls">
      <span>Sort by: </span>
      <button 
        onClick={() => onSort('name')} // Trigger sort by name when clicked
        className={sortDetails.key === 'name' ? 'active' : ''} // Highlight if currently sorting by name
      >
        Name
        
        {/* Show arrow only when sorting by name */}
        {sortDetails.key === 'name' && (
          sortDetails.direction === 'ascending' 
            ? <MoveUp size={15} /> // Show up arrow for ascending
            : <MoveDown size={15} /> // Show down arrow for descending
        )}
      </button>
      
      {/* Email sort button */}
      <button 
        onClick={() => onSort('email')} // Trigger sort by email when clicked
        className={sortDetails.key === 'email' ? 'active' : ''} // Highlight if currently sorting by email
      >
        Email
        
        {/* Show arrow only when sorting by email */}
        {sortDetails.key === 'email' && (
          sortDetails.direction === 'ascending' 
            ? <MoveUp size={15} /> // Show up arrow for ascending
            : <MoveDown size={15} /> // Show down arrow for descending
        )}
      </button>
    </div>
  );
}

export default Sort;