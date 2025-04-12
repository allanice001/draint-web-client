import React from 'react';
import styles from './icons.module.scss';

function Icon({ size = 'md', className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 26 26"
      className={`${styles.svg} ${styles[size]} ${className}`}
    >
      <g clipPath="url(#trade-fire-clip0)">
        <path d="M18.53 6.752a.762.762 0 00-1.413.394c0 .93-.757 1.686-1.686 1.686-.93 0-1.686-.757-1.686-1.686V.762a.762.762 0 00-1.3-.539C12.359.31 10.328 2.352 8.27 5.44c-1.213 1.82-2.182 3.625-2.878 5.366-.882 2.205-1.33 4.316-1.33 6.275 0 4.918 4.003 8.92 8.921 8.92 4.919 0 8.92-4.002 8.92-8.92.001-3.149-1.134-6.624-3.372-10.328zm-.464 10.13a.762.762 0 11-1.523 0v-1.425L12.75 19.25a.762.762 0 01-1.077 0l-1.77-1.77-1.192 1.193a.762.762 0 11-1.077-1.077l1.731-1.731a.762.762 0 011.077 0l1.77 1.77 3.254-3.255H14.04a.762.762 0 110-1.524h3.264c.42 0 .761.341.761.762v3.263z" />
      </g>
      <defs>
        <clipPath id="trade-fire-clip0">
          <path fill="#fff" d="M0 0H26V26H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;
