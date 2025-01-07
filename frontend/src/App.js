import React, { useState } from 'react';
import UserProvider from './context/UserProvider';
import SearchForm from './components/SearchForm';
import UserDetails from './components/UserDetails';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import FollowersList from './components/FollowersList';

const App = () => {
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSelectRepo = (repo) => setSelectedRepo(repo);
  const handleBackToRepoList = () => setSelectedRepo(null);

  return (
    <UserProvider>
      <div className="App">
        <SearchForm />
        <UserDetails />
        {!selectedRepo && (
          <>
            <RepoList onSelectRepo={handleSelectRepo} />
            <FollowersList />
          </>
        )}
        {selectedRepo && <RepoDetails repo={selectedRepo} onBack={handleBackToRepoList} />}
      </div>
    </UserProvider>
  );
};

export default App;
