import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="14"
      fill="none"
      viewBox="0 0 25 14"
      {...props}
    >
      <path
        fill="currentColor"
        d="M1.124 5.871h19.431l-3.943-3.942a1.132 1.132 0 01-.004-1.596 1.12 1.12 0 011.59-.004l5.874 5.87v.002c.44.44.44 1.157 0 1.598V7.8l-5.874 5.871a1.12 1.12 0 01-1.59-.004 1.132 1.132 0 01.004-1.596l3.943-3.942H1.124C.503 8.129 0 7.624 0 7s.503-1.129 1.124-1.129z"
      ></path>
    </svg>
  );
}

export default Icon;
