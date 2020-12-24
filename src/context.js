import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
import default_cover from './default_cover.jpg';

const url = 'https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('daft punk');
  const [albums, setAlbums] = useState([]);
  //adding useCallback to avoid infinite loop that would happen when we add fetch drinks as dependency to useEffects. If we dnt then react throws warning
  const fetchAlbums = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url + searchTerm}`);
      const data = await response.json();
      console.log(data);
      const { album } = data;
      if (album) {
        const albumsList = album.map((item) => {
          const {
            idAlbum,
            idArtist,
            strAlbum,
            strAlbumThumb,
            strArtist,
            intYearReleased,
            strDescriptionEN,
            strReview,
            strGenre,
            strLabel,
            strMood,
            strReleaseFormat,
          } = item;
          return {
            id: idAlbum,
            artistID: idArtist,
            name: strAlbum,
            image: strAlbumThumb,
            artist: strArtist,
            year: intYearReleased,
            desc: strDescriptionEN,
            review: strReview,
            genre: strGenre,
            label: strLabel,
            mood: strMood,
            format: strReleaseFormat,
          };
        });
        setAlbums(albumsList);
      } else {
        setAlbums([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchAlbums();
  }, [searchTerm, fetchAlbums]);

  return (
    <AppContext.Provider
      value={{ loading, albums, setSearchTerm, searchTerm, default_cover }}
    >
      {children}
    </AppContext.Provider>
  );
};
//custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
