import { TabList, TabType } from 'constants/search.constants';

import { ArtistsTitle } from './artists-title';
import { ArtworksTitle } from './artworks-title';
import React from 'react';
import styles from '../../search-page.module.scss';

const getTotalResults = data => {
  delete data.total;
  const array = Object.values(data || {});
  return array.length > 0 ? array.reduce((p, c) => p + c) : 0;
};

export const DynamicTitle = ({ data, activeTab, query, provedCountData }) => {
  if (!!query)
    return (
      <h1 className={styles.message}>{`We have ${getTotalResults(
        provedCountData
      )} results for “${query}”.`}</h1>
    );

  switch (TabList[activeTab].type) {
    case TabType.Artist: {
      return <ArtistsTitle filters={data} />;
    }

    case TabType.Artwork: {
      return <ArtworksTitle filters={data} />;
    }

    default: {
      return <h1 className={styles.message}>Original paintings for sale</h1>;
    }
  }
};
