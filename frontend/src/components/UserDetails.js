import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserDetails = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user selected.</p>;

  return (
    <div className="user-details">
      <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
      <h2>{user.username}</h2>
      <p>Location: {user.location || 'N/A'}</p>
      <p>Blog: {user.blog || 'N/A'}</p>
      <p>Bio: {user.bio || 'N/A'}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
    </div>
  );
};

export default UserDetails;
