import React from 'react';

export default function AddCircle({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="#806BFF"
        d={`M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm5.25 13H13v4.25a1 1 0 
        01-2 0V13H6.75a1 1 0 010-2H11V6.75a1 1 0 012 0V11h4.25a1 1 0 010 2z`}
      />
    </svg>
  );
}
