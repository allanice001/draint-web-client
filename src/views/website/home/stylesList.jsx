import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArtworkStyleList from 'components/artwork-style-list/artwork-style-list';
import Card from 'components/artwork-style-list/card';
import { STYLES_HEADER } from 'constants/components/homepage';
import { onStylesPageChanged } from 'redux/homepage/actions/homepageActions';

export const StylesList = () => {
  const { stylesPaginate } = useSelector(state => state.home.homepage);
  const [pageStyles, setPageStyles] = useState(1);
  const dispatch = useDispatch();

  const handleStylesPageChanged = (newPage = 1, type) => {
    setPageStyles(newPage);
    dispatch(onStylesPageChanged({ page: newPage, pageSize: 24 }, type));
  };
  return stylesPaginate ? (
    <ArtworkStyleList
      Component={Card}
      headers={STYLES_HEADER}
      handlePage={handleStylesPageChanged}
      list={stylesPaginate}
      page={pageStyles}
    />
  ) : null;
};
