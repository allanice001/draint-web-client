import React from 'react';

export default function Next({ className = '', fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      className={className}
    >
      {}
      <path
        fill={fill || '#806BFF'}
        fillRule="evenodd"
        d="M1.51 17.379l7.753-7.754a.884.884 0 000-1.25L1.51.622a.88.88 0 00-1.25 0
          .884.884 0 000 1.25L7.386 9 .259 16.128a.884.884 0 101.25 1.25zm7.875
          0l7.753-7.754a.884.884 0 000-1.25L9.385.622a.88.88 0 00-1.25 0 .884.884 0 000
          1.25L15.261 9l-7.128 7.128a.884.884 0 101.25 1.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
