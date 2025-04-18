import React from 'react';

export default function Edit({ className = '', fill = '#3F4041' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <g fill={fill} clipPath="url(#clip0)">
        <path d="M22.151 15.077a.598.598 0 00-.598.597v5.308a1.795 1.795 0 01-1.793
        1.793H2.99c-.99-.001-1.792-.804-1.794-1.793V5.405A1.795 1.795 0 012.99 3.612h5.307a.598.598
        0 100-1.195H2.989A2.992 2.992 0 000 5.405v15.577a2.992 2.992 0 002.989 2.988H19.76a2.992 2.992
        0 002.989-2.988v-5.308a.598.598 0 00-.598-.597z"
        />
        <path d="M22.51.879a2.69 2.69 0 00-3.804 0L8.043 11.543a.597.597 0
        00-.154.263l-1.402 5.062a.598.598 0 00.735.736l5.063-1.402c.1-.028.19-.08.263-.154L23.212
        5.384a2.693 2.693 0 000-3.804L22.51.88zM9.345 11.93l8.728-8.728 2.814 2.815-8.728
        8.728-2.814-2.815zm-.562 1.128l2.248 2.25-3.11.861.862-3.11zm13.583-8.52l-.633.634-2.815-2.815.634-.634a1.494
        1.494 0 012.113 0l.701.701c.583.585.583 1.53 0 2.114z"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
