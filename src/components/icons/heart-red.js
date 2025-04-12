/* eslint-disable max-len */
import React from 'react';

import styles from './icons.module.scss';

export const HeartRed = ({ size = 'md', className = '' }) => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 25 20"
    fill="#D80027"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.svg} ${styles[size]} ${className}`}
  >
    <path
      d="M10.001 1.52898C12.35 -0.58002 15.98 -0.51002 18.243 1.75698C20.505 4.02498 20.583 7.63698 18.479 9.99298L9.99901 18.485L1.52101 9.99298C-0.582994 7.63698 -0.503994 4.01898 1.75701 1.75698C4.02201 -0.50702 7.64501 -0.58302 10.001 1.52898Z"
      fill="#D80027"
    />
  </svg>
);
