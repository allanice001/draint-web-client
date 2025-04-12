import React from 'react';
import styles from './icons.module.scss';

export const Info = ({ size = 'md', className = '' }) => (
  <svg
    viewBox="0 0 26 26"
    fill="none"
    className={`${styles.svg} ${styles[size]} ${className}`}
  >
    <g clipPath="url(#prefix_unique__clip0)">
      <path d="M25.486 24.519c-.32-.187-2.272-1.395-3.317-3.58 2.44-2.28 3.826-5.453 3.826-8.7 0-6.718-5.858-12.236-12.997-12.236C5.858.003 0 5.521 0 12.24c0 6.72 5.859 12.236 12.998 12.236.958 0 1.987-.09 3.408-.388 3.732 1.984 7.083 1.928 8.358 1.908.567-.007.98.095 1.191-.49a.773.773 0 00-.47-.986zM14.52 18.383a1.523 1.523 0 01-3.047 0V12.24a1.523 1.523 0 113.047 0v6.143zM12.998 8.38a1.523 1.523 0 110-3.047 1.523 1.523 0 010 3.047z" />
    </g>
    <defs>
      <clipPath id="prefix_unique__clip0">
        <path fill="#fff" d="M0 0h26v26H0z" />
      </clipPath>
    </defs>
  </svg>
);
