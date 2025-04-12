import * as React from 'react';

function SortIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M9.333 18.667c0 .736.597 1.333 1.334 1.333h2.666a1.333 1.333 0 100-2.667h-2.666c-.737 0-1.334.597-1.334 1.334zM1.333 4a1.333 1.333 0 100 2.667h21.334a1.333 1.333 0 000-2.667H1.333zM4 12c0 .736.597 1.333 1.333 1.333h13.334a1.333 1.333 0 000-2.666H5.333C4.597 10.667 4 11.264 4 12z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SortIcon;
