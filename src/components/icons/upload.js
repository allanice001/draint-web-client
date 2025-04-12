import React from 'react';

export default function Upload({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="107"
      height="107"
      fill="none"
      viewBox="0 0 107 107"
      className={className}
    >
      <path
        fill="currentColor"
        fillOpacity="0.9"
        fillRule="evenodd"
        d="M107 53.5c0 29.547-23.953 53.5-53.5 53.5S0 83.047 0 53.5 23.953 0 53.5 0 107 23.953 107 53.5zM64.401 42.73l-9.843-11.25A1.411 1.411 0 0053.5 31c-.405 0-.79.177-1.057.48l-9.844 11.25a1.407 1.407 0 001.057 2.332h5.625v18.282c0 .776.63 1.406 1.407 1.406h5.625c.776 0 1.406-.63 1.406-1.406V45.062h5.625c.551 0 1.052-.32 1.28-.824a1.402 1.402 0 00-.223-1.507zm4.568 27.645v-8.438h5.625v11.25A2.81 2.81 0 0171.78 76H35.22a2.812 2.812 0 01-2.813-2.813v-11.25h5.625v8.438H68.97z"
        clipRule="evenodd"
      />
    </svg>
  );
}
