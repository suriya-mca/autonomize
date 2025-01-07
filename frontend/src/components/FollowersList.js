import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const FollowersList = ({ onSelectFollower }) => {
  const { followers } = useContext(UserContext);

  return (
    <div className="followers-list">
      <h3>Followers</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id} onClick={() => onSelectFollower(follower)}>
            {follower.login}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
