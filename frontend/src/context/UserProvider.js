import React, { useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (username) => {
    setLoading(true);
    try {
      const userRes = await axios.post('http://localhost:3000/api/user', { username });
      setUser(userRes.data);

      const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepositories(reposRes.data);

      const followersRes = await axios.get(`https://api.github.com/users/${username}/followers`);
      setFollowers(followersRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    repositories,
    followers,
    loading,
    fetchUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
