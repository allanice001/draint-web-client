import React, { useEffect, useRef, useState } from 'react';

import { Artwork } from '../../../models/artwork';
import { ArtworkCard } from '../artwork-card/artwork-card';
import ArtworkCardSkeleton from '../../skeletons/artwork-card/artwork-card-sk';
import { setColumns } from 'services/artwork-columns-service';
import styles from './artwork-list.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ArtworkList = ({
  loading,
  list,
  title = '',
  isShowFirst,
  isShowMore,
  onShowMore,
  onFirstPage,
}) => {
  const desktop = useMediaQuery('(min-width:959px)');
  const listRef = useRef();
  const [view, setView] = useState([]);

  useEffect(() => {
    const artworks = loading
      ? Array.from(new Array(15))
      : list.map(Artwork.create);
    const newView = [];
    setColumns(artworks, newView, desktop);
    setView(newView);
  }, [list, desktop, loading]);

  const scrollToStart = el => {
    window.scrollTo({
      top: el.offsetTop - 100 > 0 ? el.offsetTop - 100 : 0,
      left: 0,
    });
    el.scrollTo({ top: 0, left: 0 });
  };

  if (list[0] === 'fail') {
    return <h3 className={`group-title ${styles.title}`}>No search results</h3>;
  }

  return (
    <section className={styles.wrapper}>
      <div className="container">
        {title && <h3 className="group-title">{title}</h3>}
        <div className={styles.list} ref={listRef}>
          {!!view.length &&
            view.map((column, i) => (
              <div className={styles.column} key={i}>
                {column.map((artwork, i) =>
                  artwork ? (
                    <ArtworkCard fluid artwork={artwork} key={artwork.id} />
                  ) : (
                    <ArtworkCardSkeleton key={i} />
                  )
                )}
              </div>
            ))}
        </div>

        <div className={styles.button_container}>
          {isShowMore && (
            <button
              type="button"
              className={`${styles.more} primary-button`}
              onClick={() => {
                onShowMore();
              }}
            >
              Show more
            </button>
          )}
          {isShowFirst && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                onFirstPage();
                setView([]);
                scrollToStart(listRef.current);
              }}
            >
              Back to start
            </button>
          )}
        </div>

        {/* <SearchPagination */}
        {/*  className={styles.pagination} */}
        {/*  pages={pages} */}
        {/*  currentPage={currentPage} */}
        {/*  setPage={(page) => { */}
        {/*    setPage(page); */}
        {/*  }} */}
        {/*  isShowFirst={isShowFirst} */}
        {/*  isShowLast={isShowLast} */}
        {/* /> */}
      </div>
    </section>
  );
};

export { ArtworkList };
