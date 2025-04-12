import React from 'react';

export default function DropdownArrow({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      fill="none"
      viewBox="0 0 14 8"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1 1l6 6 6-6"
      />
    </svg>
  );
}
