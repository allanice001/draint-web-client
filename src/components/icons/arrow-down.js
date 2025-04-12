import React from 'react';

function Icon(props) {
  const { className, fill = 'currentColor', width = 14 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      fill="none"
      viewBox="0 0 14 8"
      className={className}
    >
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1 1l6 6 6-6"
      />
    </svg>
  );
}

export default Icon;
