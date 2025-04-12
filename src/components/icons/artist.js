/* eslint-disable max-len */
import React from 'react';
import styles from './icons.module.scss';

export const Artist = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    className={`${styles.svg} ${className}`}
  >
    <path
      fill="#C7C7C7"
      fillRule="evenodd"
      d="M17.262 1.302A3.856 3.856 0 0120.149 0 3.856 3.856 0 0124 3.851a3.853 3.853 0 01-1.302 2.887l-8.19 7.226a7.516 7.516 0 00-1.788-2.763 7.714 7.714 0 00-2.697-1.695l7.239-8.204zM1.588 17.506c-.208-1.623-.443-3.463 1.375-5.236a6.202 6.202 0 018.71 0c1.178 1.149 1.827 2.667 1.827 4.275 0 1.604-.649 3.12-1.828 4.27C9.252 23.175 5.694 24 3.066 24c-1.044 0-1.941-.13-2.562-.346a.749.749 0 01-.278-1.245c1.77-1.726 1.582-3.198 1.363-4.901v-.002z"
      clipRule="evenodd"
    />
  </svg>
);
