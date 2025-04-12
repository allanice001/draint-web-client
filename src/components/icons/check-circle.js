/* eslint-disable max-len */
import React from 'react';
import styles from './icons.module.scss';

export const CheckCircle = ({ className = '', hover }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    className={`${styles.svg} ${className} ${hover ? 'hover' : ''}`}
  >
    <path
      fill="#806BFF"
      fillOpacity="0.3"
      d="M15 0C6.729 0 0 6.729 0 15s6.729 15 15 15 15-6.729 15-15S23.271 0 15 0z"
    />
    <path
      fill="#806BFF"
      stroke="#806BFF"
      d={`M22.322 11.821l-8.125 8.125a1.246 1.246 0 01-1.768 0l-4.062-4.062a1.248 1.248 0 010-1.768 
      1.248 1.248 0 011.767 0l3.179 3.18 7.241-7.242a1.249 1.249 0 111.767 1.768z`}
    />
  </svg>
);
