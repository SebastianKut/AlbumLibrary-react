import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { useGlobalContext } from '../context';
import functions from '../util/functions';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';

const url = 'https://theaudiodb.com/api/v1/json/1/artist.php?i=';

function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { default_cover } = useGlobalContext();

  const fetchArtist = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url + id}`);
      const data = await response.json();
      console.log(data);
      const { artists } = data;
      if (artists) {
        const {
          intBornYear,
          intDiedYear,
          intFormedYear,
          intMembers,
          strArtist,
          strArtistLogo,
          strArtistThumb,
          strBiographyEN,
          strCountry,
          strFacebook,
          strGenre,
          strTwitter,
          strWebsite,
        } = artists[0];
        const socialMedia = [strFacebook, strTwitter];
        const newArtist = {
          born: intBornYear,
          died: intDiedYear,
          formed: intFormedYear,
          members: intMembers,
          name: strArtist,
          logo: strArtistLogo,
          image: strArtistThumb,
          bio: strBiographyEN,
          country: strCountry,
          genre: strGenre,
          social: socialMedia,
          website: strWebsite,
        };
        setArtist(newArtist);
      } else {
        setArtist(null);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtist();
  }, [id]);

  if (loading) return <Loading />;

  if (!artist) {
    return <h2 className="section-title">no artist information to display</h2>;
  } else {
    const {
      born,
      died,
      formed,
      members,
      name,
      image,
      bio,
      country,
      genre,
      social,
      website,
    } = artist;
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
            {born && (
              <p>
                <span className="drink-data">born :</span>
                <span>{born}</span>
              </p>
            )}
            {died && (
              <p>
                <span className="drink-data">died :</span>
                <span>{died}</span>
              </p>
            )}
            <p>
              <span className="drink-data">origin :</span>
              <span className={!country && 'no-info'}>
                {country ? country : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">genre:</span>
              <span className={!genre && 'no-info'}>
                {genre ? genre : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">formed :</span>
              <span className={!formed && 'no-info'}>
                {formed ? formed : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">number of members :</span>
              <span className={!members && 'no-info'}>
                {members ? members : 'No information available'}
              </span>
            </p>
            <p>
              <span className="drink-data">social media:</span>
              <span className={!social && 'no-info'}>
                {social ? (
                  <>
                    <a href={`https://${social[0]}`} className="social-icon">
                      <FaFacebookSquare />
                    </a>
                    <a href={`https://${social[1]}`} className="social-icon">
                      <FaTwitterSquare />
                    </a>
                  </>
                ) : (
                  'No information available'
                )}
              </span>
            </p>
            <p>
              <span className="drink-data">website :</span>
              <span className={!website && 'no-info'}>
                {website ? (
                  <a className="band-link" href={`http://${website}`}>
                    {website}
                  </a>
                ) : (
                  'No information available'
                )}
              </span>
            </p>
            {bio && (
              <p>
                <span className="drink-data">bio :</span>
                <span>
                  {readMore ? bio : functions.truncate(bio, 40)}
                  <button
                    className="read-more-btn"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? 'Read less' : 'Read more'}
                  </button>
                </span>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Artist;
