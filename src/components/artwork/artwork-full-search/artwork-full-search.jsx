import ArtistCollectorModal from 'components/basic-modal/artist-collector-modal/artist-collector-modal';
import { Artwork } from 'models/artwork';
import { ArtworkCard } from 'components/artwork/artwork-card/artwork-card';
import ArtworkCardSkeleton from 'components/skeletons/artwork-card/artwork-card-sk';
import ArtworkPageUnloggedModal from 'components/artwork/artwork-page-unlogged-modal/artwork-page-unlogged-modal';
import { HOVER_FROM } from 'constants/components/homepage';
import React from 'react';
import SearchBlock from 'components/search-block/search-block';
import { TabType } from 'constants/search.constants';

function ArtworkFullSearch({
  query = '',
  method,
  filtersOptions = {},
  filters,
  isOpen,
  setOpen,
  initialValues,
  matchesMd,
  headerRender,
  setCleanPage,
  cleanPage,
}) {
  return (
    <section>
      <div className="container">
        <SearchBlock
          setCleanPage={setCleanPage}
          cleanPage={cleanPage}
          filters={filters}
          type={TabType.Artwork}
          Item={ArtworkCard}
          Skeleton={ArtworkCardSkeleton}
          options={filtersOptions}
          query={query}
          action={method}
          isOpen={isOpen}
          setOpen={setOpen}
          create={data => ({
            artwork: Artwork.create(data),
            fluid: true,
            onlyHover: true,
            fullArtworkInfo: data,
            addToCartFrom: HOVER_FROM.artworkSearchCard,
          })}
          initialValues={initialValues}
          matchesMd={matchesMd}
          headerRender={headerRender}
        />
      </div>
      <ArtworkPageUnloggedModal />
      <ArtistCollectorModal />
    </section>
  );
}

export default ArtworkFullSearch;
