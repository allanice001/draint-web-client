import * as React from 'react';
import styles from './icons.module.scss';

function SearchSmall({ size = 'md', className = '' }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`${styles.svg} ${styles[size]} ${className}`}
    >
      <path
        d="M19.336 18.21l-4.602-4.6A8.069 8.069 0 008.496.43a8.066 8.066 0 100
        16.133 8.024 8.024 0 005.11-1.825l4.601 4.598a.797.797 0
        001.129-1.125zm-10.84-3.253a6.47 6.47 0 01-6.465-6.46A6.473
        6.473 0 018.496 2.03a6.475 6.475 0 016.465 6.465c0 3.563-2.902 6.461-6.465 6.461z"
      />
    </svg>
  );
}

export default SearchSmall;
