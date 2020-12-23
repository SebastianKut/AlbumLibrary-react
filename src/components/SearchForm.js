import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchTerm = useRef('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {
    setSearchTerm(searchTerm.current.value);
  };
  useEffect(() => {
    searchTerm.current.focus();
  }, []);
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="">Find Albums by Artist</label>
          <input
            type="text"
            placeholder={`e.g. daft punk`}
            ref={searchTerm}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
