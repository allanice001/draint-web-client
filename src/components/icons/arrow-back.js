import * as React from 'react';

function ArrowBack(props) {
  return (
    <svg width={14} height={24} viewBox="0 0 14 24" {...props}>
      <path
        d="M11.038 22.852h0l-9.893-9.89 9.893 9.89zm0 0c.532.53 1.393.53 1.926 0h0m-1.926 0h1.926m0 0a1.358 1.358 0 000-1.923v1.923zm-.001-21.704h0a1.36 1.36 0 010 1.924s0 0 0 0l-8.93 8.929 8.931 8.928-.001-19.781zm0 0a1.364 1.364 0 00-1.926 0h0m1.926 0h-1.926m0 0l-9.893 9.89h0m9.893-9.89l-9.894 9.89m0 0a1.37 1.37 0 00.002 1.924l-.002-1.924z"
        fill="#806BFF"
        // stroke="#806BFF"
        strokeWidth={0.5}
      />
    </svg>
  );
}

export default ArrowBack;
