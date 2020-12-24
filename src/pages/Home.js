import React from 'react';
import AlbumList from '../components/AlbumList';
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <main>
      <SearchForm />
      <AlbumList />
    </main>
  );
};

export default Home;
