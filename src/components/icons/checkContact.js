import * as React from 'react';

function ContactCheckIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      className={className}
    >
      <path
        d="M2 7.143L9.049 14 21.385 2"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { ContactCheckIcon };
