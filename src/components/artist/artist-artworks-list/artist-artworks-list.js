import React, { useRef } from 'react';

import { Artist } from '../../../models/artist';
import ArtistLongCard from '../artist-long-card/artist-long-card';
import styles from './artist-artworks-list.module.scss';

const scrollToStart = el => {
  window.scrollTo({
    top: el.offsetTop - 100 > 0 ? el.offsetTop - 100 : 0,
    left: 0,
  });
  el.scrollTo({ top: 0, left: 0 });
};

const ArtistsList = ({
  list,
  length = 8,
  loading,
  onShowMore,
  onFirstPage,
  isShowFirst,
  isShowMore,
  title = '',
  className,
}) => {
  const listRef = useRef();

  if (!list || list[0] === 'fail') {
    return <h3 className={`group-title ${styles.title}`}>No search results</h3>;
  }

  const data = !loading
    ? list.map(Artist.create)
    : list.map(Artist.create).concat(Array.from(new Array(length)));

  return (
    <section>
      <div className={styles.container}>
        {title && (
          <h3 className={`group-title ${styles.title} ${className}`}>
            {title}
          </h3>
        )}

        <div className={styles.content}>
          <div className={styles.list} ref={listRef}>
            {data.map((el, i) => (
              <ArtistLongCard key={i} artist={el} />
            ))}
            {/* {isShowMore && ( */}
            {/*  <ArtistLongCard className={styles.more__card} empty artist={{}}> */}
            {/*    <button */}
            {/*      type="button" */}
            {/*      className={styles.button__more} */}
            {/*      onClick={onShowMore} */}
            {/*    > */}
            {/*      Show more */}
            {/*    </button> */}
            {/*  </ArtistLongCard> */}
            {/* )} */}
          </div>

          <div className={styles.button_container}>
            {isShowMore && (
              <button
                type="button"
                className={`${styles.more} primary-button`}
                onClick={onShowMore}
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
                  scrollToStart(listRef.current);
                }}
              >
                Back to start
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ArtistsList };
