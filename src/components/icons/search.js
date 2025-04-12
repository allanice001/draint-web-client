/* eslint-disable max-len */
import React from 'react';
import styles from './icons.module.scss';

export const Search = ({ className = '' , fill}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    className={`${styles.svg} ${className}`}
  >
    <path
      fill={fill || '#C7C7C7'}
      fillRule="evenodd"
      d={`M0 9.855C0 4.412 4.412 0 9.855 0c5.44.005 9.85 4.414 9.855 9.855a9.81 9.81 0 01-1.79
          5.664c.049.039.095.08.14.126l5.428 5.427a1.715 1.715 0 01-2.425 2.426l-5.428-5.428a1.752
          1.752 0 01-.127-.142 9.81 9.81 0 01-5.653 1.782C4.412 19.71 0 15.298 0 9.855zm3.428 0a6.427
          6.427 0 006.427 6.427 6.436 6.436 0 006.427-6.427 6.427 6.427 0 00-12.854 0z`}
      clipRule="evenodd"
    />
  </svg>
);
