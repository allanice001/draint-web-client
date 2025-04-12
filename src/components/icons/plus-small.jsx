import * as React from 'react';
import styles from './icons.module.scss';

function PlusSmall({ size = 'md', className = '' }) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 7.5v-6a1.5 1.5 0 113 0v6h6a1.5 1.5 0 010 3h-6v6a1.5 1.5 0 01-3 0v-6h-6a1.5 1.5 0 110-3h6z"
        className={`${styles.svg} ${styles[size]} ${className}`}
      />
    </svg>
  );
}

export default PlusSmall;
