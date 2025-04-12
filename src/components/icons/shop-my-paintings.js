import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="34"
      fill="none"
      viewBox="0 0 36 34"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.374 27a5.616 5.616 0 01-5.313-3.827l-.052-.172a5.472 5.472 0 01-.26-1.626V11.148L.11 23.295a3.407 3.407 0 002.388 4.132l23.194 6.212c.29.075.58.11.864.11 1.494 0 2.86-.991 3.242-2.452L31.149 27H9.374zM13.5 11.25c1.654 0 3-1.346 3-3 0-1.655-1.346-3-3-3-1.655 0-3 1.345-3 3 0 1.654 1.345 3 3 3z"
      ></path>
      <path
        fill="currentColor"
        d="M32.25.75H9.75A3.755 3.755 0 006 4.5V21a3.755 3.755 0 003.75 3.75h22.5A3.755 3.755 0 0036 21V4.5A3.755 3.755 0 0032.25.75zm-22.5 3h22.5a.75.75 0 01.75.75V15.15l-4.739-5.53c-.502-.589-1.23-.904-2.011-.922a2.623 2.623 0 00-2.004.947l-5.571 6.687-1.815-1.811a2.633 2.633 0 00-3.72 0L9 18.658V4.5a.75.75 0 01.75-.75z"
      ></path>
    </svg>
  );
}

export default Icon;
