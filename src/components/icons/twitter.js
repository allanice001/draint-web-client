/* eslint-disable max-len */
import React from 'react';
import styles from './icons.module.scss';

export const Twitter = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="26"
    fill="none"
    viewBox="0 0 33 26"
    className={`${styles.svg} ${className}`}
  >
    <path
      fill="#C7C7C7"
      d={`M32.926 3.078a13.096 13.096 0 01-3.77 1.032A6.581 6.581 0 0032.042.48a13.14 
        13.14 0 01-4.168 1.592A6.557 6.557 0 0023.082 0a6.565 6.565 0 00-6.393 8.06A18.632 
        18.632 0 013.16 1.2a6.536 6.536 0 00-.888 3.301 6.563 6.563 0 002.92 5.463 6.517 6.517 
        0 01-2.973-.822v.084a6.568 6.568 0 005.265 6.435 6.54 6.54 0 01-2.964.114 6.57 6.57 0 
        006.132 4.558 13.17 13.17 0 01-8.153 2.81c-.529 0-1.052-.031-1.565-.092A18.566 18.566 0 
        0010.993 26C23.068 26 29.67 15.998 29.67 7.324c0-.284-.006-.568-.019-.849a13.31 13.31 0 003.276-3.397z`}
    />
  </svg>
);
