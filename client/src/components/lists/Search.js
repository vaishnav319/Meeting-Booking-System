import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form
      autocomplete='off'
      className='transition duration-700 ease-in-out hover:shadow-2xl  outline-none bg-purple-100  p-1 w-80 rounded-lg'
    >
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type='text'
        id='header-search'
        placeholder='Search '
        name='s'
        className='outline-none bg-purple-100 ml-5'
      />
      <i className='fas fa-search ml-5 text-gray-800'></i>
    </form>
  );
};

export default SearchBar;
