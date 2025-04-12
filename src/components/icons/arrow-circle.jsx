import * as React from 'react';
import styles from './icons.module.scss';

function ArrowCircle({ className = '' }) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      className={`${styles.svg} ${className}`}
    >
      <g>
        <path
          d="M0 14c0 7.72 6.28 14 14 14s14-6.28 14-14S21.72 0 14 0 0 6.28 0
            14zm19.25-5.25v8.75l-3.063-3.063-4.812 4.813-2.625-2.625 4.813-4.813L10.5 8.75h8.75z"
          // fill="#806BFF"
        />
      </g>
    </svg>
  );
}

export default ArrowCircle;
