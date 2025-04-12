import React from 'react';

export default function Cancel({ className = '', fill = '#3F4041', width = '22' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 22 22"
      className={className}
    >
      <path
        fill={fill}
        stroke={fill}
        strokeWidth="0.5"
        d="M12.105 11l8.666-8.666a.781.781 0 00-1.105-1.105L11 9.895 2.334 1.23a.781.781
           0 10-1.105 1.105L9.895 11 1.23 19.666a.781.781 0 101.105 1.105L11 12.105l8.666
           8.666a.779.779 0 001.105 0 .781.781 0 000-1.105L12.105 11z"
      />
    </svg>
  );
}
