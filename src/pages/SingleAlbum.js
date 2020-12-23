import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useGlobalContext } from '../context';

const SingleAlbum = () => {
  const [readMore, setReadMore] = useState({
    review: false,
    description: false,
  });
  const { id } = useParams();
  const { albums, default_cover } = useGlobalContext();

  const singleAlbum = albums.filter((album) => album.id === id)[0];

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!singleAlbum) {
    return <h2 className="section-title">no album to display</h2>;
  } else {
    const {
      name,
      image,
      artist,
      year,
      desc,
      review,
      genre,
      label,
      mood,
      format,
    } = singleAlbum;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <div className="drink-cover">
            <img src={image ? image : default_cover} alt="album cover"></img>
          </div>
          <div className="drink-info">
            <p>
              <span className="drink-data">artist :</span>
              {artist ? artist : 'No information available'}
            </p>
            <p>
              <span className="drink-data">year of release :</span>
              {year ? year : 'No information available'}
            </p>
            <p>
              <span className="drink-data">record lablel :</span>
              {label ? label : 'No information available'}
            </p>
            <p>
              <span className="drink-data">genre :</span>
              {genre ? genre : 'No information available'}
            </p>
            <p>
              <span className="drink-data">mood :</span>
              {mood ? mood : 'No information available'}
            </p>
            <p>
              <span className="drink-data">format :</span>
              {format ? format : 'No information available'}
            </p>
            <p>
              <span className="drink-data">description :</span>
              {readMore.description ? desc : truncate(desc, 40)}
              <button
                className="read-more-btn"
                onClick={() =>
                  setReadMore({
                    ...readMore,
                    description: !readMore.description,
                  })
                }
              >
                {readMore.description ? 'Read less' : 'Read more'}
              </button>
            </p>
            <p>
              <span className="drink-data">review :</span>
              {readMore.review ? review : truncate(review, 40)}
              <button
                className="read-more-btn"
                onClick={() =>
                  setReadMore({ ...readMore, review: !readMore.review })
                }
              >
                {readMore.review ? 'Read less' : 'Read more'}
              </button>
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleAlbum;
