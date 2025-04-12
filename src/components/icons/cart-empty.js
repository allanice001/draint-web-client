import React from 'react';

export const CartEmpty = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    viewBox="0 0 26 26"
    className={className}
  >
    <g fill="#fff" stroke="#806BFF" strokeWidth="1.5" clipPath="url(#clip0)">
      {/* eslint-disable-next-line max-len */}
      <path d="M19.704 19.32a3.034 3.034 0 00-3.036 3.036 3.034 3.034 0 003.036 3.036 3.034 3.034 0 003.036-3.036c-.03-1.664-1.372-3.036-3.036-3.036zM25.046 4.841c-.058 0-.146-.03-.233-.03H6.422l-.293-1.955A2.614 2.614 0 003.532.608H1.168C.525.608 0 1.134 0 1.776c0 .642.525 1.168 1.168 1.168h2.364c.146 0 .263.116.292.262l1.81 12.32a3.2 3.2 0 003.153 2.714H20.93c1.518 0 2.832-1.08 3.153-2.569l1.897-9.487a1.154 1.154 0 00-.934-1.343zM12.26 22.21c-.059-1.606-1.401-2.89-3.007-2.89a3.053 3.053 0 00-2.92 3.152c.06 1.606 1.373 2.89 2.978 2.89h.059c1.664-.087 2.977-1.488 2.89-3.152z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0H26V26H0z" />
      </clipPath>
    </defs>
  </svg>
);
