import React from 'react';

export default function Crop({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      className={className}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M3.75 0H7.5v22.5h13.125v3.75H3.75V7.5H0V3.75h3.75V0zm22.5 3.75V22.5H30v3.75h-3.75V30H22.5V7.5H9.375V3.75H26.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
