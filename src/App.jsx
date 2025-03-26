import React, { useState, useEffect } from "react";
import UserList from "./components/UserList/UserList";
import Search from "./components/Search/Search";
import Sort from "./components/Sort/Sort";
import BgImg from "./assets/background.png"; // Background image import
import "./App.css";

function App() {
  const [users, setUsers] = useState([]); // Original user data from API
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered/sorted version of users
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state if API fails
  const [selectedUser, setSelectedUser] = useState(null); // Currently selected user for detail view
  const [currentSearch, setCurrentSearch] = useState(""); // Current search 
  const [sortDetails, setSortDetails] = useState({ // Sorting details
    key: "name", // Default sort by name
    direction: "ascending", // Default ascending order
  });

  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make API request 
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        // Parse JSON response
        const data = await response.json();
        
        // Update state with fetched data
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users with all users
        setLoading(false); // Loading complete
      } catch (err) {
        // Handle any errors that occur during fetch
        setError(err.message);
        setLoading(false); // Ensure loading is false even on error
      }
    };

    fetchUsers(); // Execute the async function
  }, []); // Empty array means this runs only once on mount

  // This effect runs whenever users, currentSearch, or sortDetails changes
  useEffect(() => {
    // Start with all users
    let result = users;

    // Apply search filter if currentSearch exists
    if (currentSearch) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(currentSearch.toLowerCase())
      );
    }

    // Apply sorting if sortDetails exists
    if (sortDetails.key) {
      // Create a new array before sorting to avoid mutating state directly
      result = [...result].sort((a, b) => {
        // Compare the relevant properties based on sortDetails.key
        if (a[sortDetails.key] < b[sortDetails.key]) {
          return sortDetails.direction === "ascending" ? -1 : 1;
        }
        if (a[sortDetails.key] > b[sortDetails.key]) {
          return sortDetails.direction === "ascending" ? 1 : -1;
        }
        return 0; // Equal values
      });
    }

    // Update the filtered users that will be displayed
    setFilteredUsers(result);
  }, [users, currentSearch, sortDetails]);

  // Handler for search term changes
  const handleSearch = (term) => {
    setCurrentSearch(term);
  };

  // Handler for sorting requests
  const requestSort = (key) => {
    let direction = "ascending";
    // Toggle direction if same key is clicked again
    if (sortDetails.key === key && sortDetails.direction === "ascending") {
      direction = "descending";
    }
    setSortDetails({ key, direction });
  };

  // Handler when a user is selected
  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user for detail view
  };

  // Handler to return to list view from detail view
  const handleBackToList = () => {
    setSelectedUser(null); // Clear selected user
  };

  // Loading state UI
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  // Error state UI
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Main app render
  return (
    <div className="app">
      {/* Import Montserrat font from Google Fonts */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      

      <img
        className="background"
        src={BgImg}
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Page header */}
      <div className="title-holder">
        <h1 className="header">Sonatus Assessment</h1>
      </div>

      {/* Conditional rendering based on whether a user is selected */}
      {selectedUser ? (
        // Show user details if a user is selected
        <UserList.UserDetails user={selectedUser} onBack={handleBackToList} />
      ) : (
        // Otherwise show the list view with controls
        <>
          {/* Search and sort controls container */}
          <div className="controls">
            <Search onSearch={handleSearch} />
            <Sort sortDetails={sortDetails} onSort={requestSort} />
          </div>
          {/* The main user list */}
          <UserList users={filteredUsers} onUserSelect={handleUserSelect} />
        </>
      )}
    </div>
  );
}

export default App;