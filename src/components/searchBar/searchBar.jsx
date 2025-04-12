import './searchBar.scss';

import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';

import PropTypes from 'prop-types';

function SearchBar({ handleSearch, value, customLabel }) {
  const inputRef = useRef();

  const onSearch = useCallback(() => {
    handleSearch(inputRef.current.value);
  }, [inputRef, handleSearch]);

  const label = customLabel ? customLabel : 'Search';

  return (
    <div className="search-bar-wrapper">
      <FormControl>
        <InputLabel htmlFor="input-search">{label}</InputLabel>
        <Input defaultValue={value} inputRef={inputRef} />
      </FormControl>

      <Button color="primary" variant="contained" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
}

SearchBar.defaultProps = {
  placeholder: 'SEARCH',
};

SearchBar.prototype = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
