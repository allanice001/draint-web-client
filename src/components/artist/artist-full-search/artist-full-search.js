import { Artist } from '../../../models';
import ArtistLongCard from '../artist-long-card/artist-long-card';
import ArtistLongCardSkeleton from 'components/skeletons/artist-long-card/artist-long-card-sk';
import React from 'react';
import SearchBlock from '../../search-block/search-block';
import { TabType } from 'constants/search.constants';

function ArtistFullSearch({
  query = '',
  filtersOptions = {},
  method = () => {},
  filters,
  initialValues,
  isOpen,
  setOpen,
  matchesMd,
  cleanPage,
  setCleanPage,
}) {
  return (
    <section>
      <div className="container">
        <SearchBlock
          cleanPage={cleanPage}
          setCleanPage={setCleanPage}
          filters={filters}
          type={TabType.Artist}
          Item={ArtistLongCard}
          Skeleton={() => <ArtistLongCardSkeleton fluid />}
          options={filtersOptions}
          query={query}
          setOpen={setOpen}
          isOpen={isOpen}
          action={method}
          create={data => ({ artist: Artist.create(data), fluid: true })}
          initialValues={initialValues}
          matchesMd={matchesMd}
        />
      </div>
    </section>
  );
}

export default ArtistFullSearch;
