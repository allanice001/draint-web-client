/* eslint-disable max-len */
import React from 'react';
import styles from './icons.module.scss';

export const Home = ({ className = '' }) => (
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
      d={`M23.355 10.439l-.001-.002-9.791-9.79A2.195 2.195 0 0012 0c-.59 0-1.145.23-1.562.647L.652 
        10.432l-.01.01a2.212 2.212 0 00.004 3.12 2.197 2.197 0 001.534.648h.39v7.204A2.589 2.589 0 005.158 
        24h3.83a.703.703 0 00.704-.703v-5.649c0-.65.529-1.18 1.18-1.18h2.259c.65 0 1.18.53 1.18 1.18v5.649c0 
        .388.314.703.703.703h3.83a2.589 2.589 0 002.587-2.586V14.21h.362a2.213 2.213 0 001.564-3.77z`}
    />
  </svg>
);
