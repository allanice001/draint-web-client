import React from 'react';

export default function Check({ className = '', fill = '#fff', width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 19}
      fill="none"
      viewBox="0 0 19 14"
      className={className}
    >
      <path
        fill={fill}
        d={`M18.123 3.186l-9.75 9.75a1.496 1.496 0 01-2.12 0L1.377 8.06a1.498 1.498 0 010-2.12 1.498 1.498 0 012.12 
        0l3.815 3.814 8.69-8.69a1.498 1.498 0 012.12 0 1.498 1.498 0 010 2.122z`}
      />
    </svg>
  );
}
