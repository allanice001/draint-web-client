import React from 'react';

export default function Delete({
  className = '', width = '18', height = '18',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 18 18"
      className={className}
    >
      <g fill="currentColor">
        <path d="M2.25 15.75C2.25 16.99 3.26 18 4.5 18h9c1.24 0 2.25-1.01 2.25-2.25V4.5H2.25v11.25zM11.25 1.125V0h-4.5v1.125H1.125v2.25h15.75v-2.25H11.25z" />
      </g>
    </svg>
  );
}
