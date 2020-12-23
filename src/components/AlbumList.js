import React from 'react';
import Album from './Album';
import Loading from './Loading';
import { useGlobalContext } from '../context';

const AlbumList = () => {
  const { loading, albums, searchTerm, default_cover } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (albums.length < 1) {
    return (
      <h1 className="section-title">No albums matched your search criteria</h1>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">{`${searchTerm} discography`}</h2>
      <div className="cocktails-center">
        {albums.map((item) => {
          return (
            <Album key={item.id} {...item} default_cover={default_cover} />
          );
        })}
      </div>
    </section>
  );
};

export default AlbumList;
