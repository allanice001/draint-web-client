import React from 'react';

export default function RotateLeft({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="30"
      fill="none"
      viewBox="0 0 27 30"
      className={className}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.25 16.875c0 5.17-4.206 9.375-9.375 9.375a9.372 9.372 0 01-4.497-1.147L7.574 28.39A13.147 13.147 0 0013.875 30C21.112 30 27 24.111 27 16.875c0-6.598-4.9-12.06-11.25-12.975V0l-5.625 5.625 5.625 5.625V7.69c4.274.87 7.5 4.658 7.5 9.185zM1.09 13.893a13.142 13.142 0 013.004-5.77l2.794 2.5a9.371 9.371 0 00-2.144 4.12l-3.653-.85zm3.392 4.309a9.315 9.315 0 002.107 4.695l-2.887 2.41a13.05 13.05 0 01-2.952-6.58l3.732-.525z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
