import React from 'react';
import styles from './infoBlock.module.scss';

function InfoBlock({ param, description, inWatchlist }) {
  return (
    <>
      <div
        className={`${inWatchlist ? styles.block_in_watchlist : styles.block}`}
      >
        <b
          className={`${
            inWatchlist ? styles.param_in_watchlist : styles.param
          }`}
        >
          {param}
        </b>
        <p
          className={`${
            inWatchlist ? styles.description_in_watchlist : styles.description
          }`}
        >
          {description}
        </p>
      </div>
    </>
  );
}

export default InfoBlock;
