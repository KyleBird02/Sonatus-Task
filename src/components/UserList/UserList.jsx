import React from 'react';
import './styles.css';

/**
 - UserList 
    -Displays a table of users with clickable rows and a detailed view component.
    -Features:
     - Tabular display of user names and emails
     - Clickable rows for quick access to details
     - Dedicated view buttons for explicit actions
     - Responsive design
     - Empty state handling
 */
function UserList({ users, onUserSelect }) {
  const handleRowClick = (user, e) => {
    // Only trigger if click didn't originate from the view button
    if (!e.target.closest('.view-button')) {
      onUserSelect(user);
    }
  };

  return (
    <div className="user-list">
      {/* Empty state handling */}
      {users.length === 0 ? (
        <div className="no-results">No users found</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through users to create table rows */}
            {users.map(user => (
              <tr 
                key={user.id} // Unique key 
                className="user-row"
                onClick={(e) => handleRowClick(user, e)}
                title="Click for more details" // Cursor Tooltip
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {/* More Details Button */}
                  <button 
                    onClick={() => onUserSelect(user)}
                    className="view-button"
                    aria-label={`View details for ${user.name}`}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/**
  UserDetails Component
  - Displays detailed information about selected user.
 */
function UserDetails({ user, onBack }) {
  return (
    <div className="user-details">
      {/* Back navigation button */}
      <button 
        onClick={onBack} 
        className="back-button"
        aria-label="Return to user list"
      >
        &larr; Back to list
      </button>
      
      {/* User name as heading */}
      <h2>{user.name}</h2>
      
      {/* Detailed information in table format */}
      <table className="details-table">
        <tbody>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>
              {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
            </td>
          </tr>
          <tr>
            <td><strong>Company:</strong></td>
            <td>{user.company.name}</td>
          </tr>
          <tr>
            <td><strong>Website:</strong></td>
            <td>
              <a 
                href={`https://${user.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Attach UserDetails as a static property of UserList
UserList.UserDetails = UserDetails;

export default UserList;