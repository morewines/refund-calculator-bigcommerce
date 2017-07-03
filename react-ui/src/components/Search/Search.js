import React from 'react';

//CSS
import './Search.css';

//Modules
import FaSearch from 'react-icons/lib/fa/search';
import FaSpinner from 'react-icons/lib/fa/spinner';

const Search = (
  {
    searchValue,
    handleSearchChange,
    handleSearchSubmit,
    fetching,
    searchPlaceholder
  }) => {

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <fieldset>
          { fetching ? (
            <button className="button-primary fetching-button float-right"
              type="" disabled>
              <FaSpinner size={18} className="spinner" style={{
                marginBottom: '3px',
                marginRight: '1em'
              }}/>
              Loading....
            </button>
          ) : (
            <button className="button-primary button-mw float-right"
              type="submit">
              <FaSearch size={18} style={{
                marginBottom: '3px',
                marginRight: '1em'
              }} />
              Get Order
            </button>
          )}
          <div style={{
              overflow: 'hidden',
              paddingRight: '1em'
            }}>
            <input type="text" placeholder={searchPlaceholder}
              id="search-field"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Search;
