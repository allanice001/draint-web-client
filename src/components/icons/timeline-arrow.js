import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="36"
      fill="none"
      viewBox="0 0 22 36"
      {...props}
    >
      <path
        stroke="#F4F4F4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
        d="M4 4l14 14L4 32"
      ></path>
    </svg>
  );
}

export default Icon;
