import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const SearchForm = () => {
  const { fetchUserData } = useContext(UserContext);
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      fetchUserData(username);
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
