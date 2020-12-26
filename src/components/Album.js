import React from 'react';
import { Link } from 'react-router-dom';

const Album = ({ id, artist, image, year, name, default_cover, artistID }) => {
  return (
    <article className="album">
      <div className="image-container">
        <img src={image ? image : default_cover} alt="album cover" />
      </div>
      <div className="album-footer">
        <div className="footer-info">
          <h5>{name}</h5>
          <h6>
            <Link to={`/artist/${artistID}`} className="band-link">
              {artist}
            </Link>
          </h6>
          <p>{year}</p>
        </div>
        <Link to={`/album/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Album;
