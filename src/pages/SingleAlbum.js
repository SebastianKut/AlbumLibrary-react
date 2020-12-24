import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useGlobalContext } from '../context';
import functions from '../util/functions';

const SingleAlbum = () => {
  const [readMore, setReadMore] = useState({
    review: false,
    description: false,
  });
  const { id } = useParams();
  const { albums, default_cover } = useGlobalContext();

  const singleAlbum = albums.filter((album) => album.id === id)[0];

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
              <span className={!artist && 'no-info'}>
                {artist ? artist : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">year of release :</span>
              <span className={!year && 'no-info'}>
                {year ? year : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">record lablel :</span>
              <span className={!label && 'no-info'}>
                {label ? label : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">genre :</span>
              <span className={!genre && 'no-info'}>
                {genre ? genre : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">mood :</span>
              <span className={!mood && 'no-info'}>
                {mood ? mood : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">format :</span>
              <span className={!format && 'no-info'}>
                {format ? format : 'No information available'}
              </span>
            </p>
            {desc && (
              <p>
                <span className="drink-data">description :</span>
                <span>
                  {readMore.description ? desc : functions.truncate(desc, 40)}
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
                </span>
              </p>
            )}
            {review && (
              <p>
                <span className="drink-data">review :</span>
                {readMore.review ? review : functions.truncate(review, 40)}
                <span>
                  <button
                    className="read-more-btn"
                    onClick={() =>
                      setReadMore({ ...readMore, review: !readMore.review })
                    }
                  >
                    {readMore.review ? 'Read less' : 'Read more'}
                  </button>
                </span>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default SingleAlbum;
