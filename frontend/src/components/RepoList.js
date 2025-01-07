import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const RepoList = ({ onSelectRepo }) => {
  const { repositories } = useContext(UserContext);

  return (
    <div className="repo-list">
      <h3>Repositories</h3>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} onClick={() => onSelectRepo(repo)}>
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
