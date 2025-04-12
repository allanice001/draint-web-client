import React from 'react';

function Icon(props) {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="26"
      fill="none"
      viewBox="0 0 70 26"
      className={className}
    >
      <path
        fill="currentColor"
        d="M3.53.246S0 .936 0 4.424v21.33s.392-4.297 3.53-4.297H70l-6.778-10.984L70 .246H3.53z"
      />
    </svg>
  );
}

export default Icon;
