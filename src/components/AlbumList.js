import React from 'react';
import Album from './Album';
import Loading from './Loading';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';

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
      <h2 className="section-title">
        <Link to={`/artist/${albums[0].artistID}`} className="band-link">
          {searchTerm}
        </Link>{' '}
        discography
      </h2>
      <div className="albums-center">
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
