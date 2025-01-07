import React from 'react';

const RepoDetails = ({ repo, onBack }) => {
  if (!repo) return null;

  return (
    <div className="repo-details">
      <h2>{repo.name}</h2>
      <p>{repo.description || 'No description available.'}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks}</p>
      <button onClick={onBack}>Back to List</button>
    </div>
  );
};

export default RepoDetails;
