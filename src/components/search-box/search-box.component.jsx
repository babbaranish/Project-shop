import React from 'react';
import { SearchBoxContainer } from './search-box.styles';

const SearchBox = ({ placeholder, handleChange }) => (
  <SearchBoxContainer
    type="search"
    placeholder={placeholder}
    onChange={handleChange}
  />
);

export default SearchBox;
