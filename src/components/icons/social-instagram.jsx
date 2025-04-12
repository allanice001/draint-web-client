import React from 'react';

function SocialInstagram(props) {
  const { param } = props;

  return (
    <svg
      width={param}
      height={param}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
        fill="currentColor"
        d="M21.233 0H4.767A4.772 4.772 0 000 4.767v16.466A4.773 4.773 0 004.767 26h16.466A4.773
          4.773 0 0026 21.233V4.767A4.772 4.772 0 0021.233 0zM13 21.56c-4.72 0-8.559-3.84-8.559-8.56
          0-4.72 3.84-8.559 8.559-8.559 4.72 0 8.56 3.84 8.56 8.559 0 4.719-3.841 8.56-8.56 8.56zm8.834-15.35a2.028 2.028
          0 01-2.026-2.024c0-1.117.909-2.026 2.026-2.026 1.117 0 2.025.909 2.025
          2.026a2.027 2.027 0 01-2.025 2.025z"
      />
      <path
        fill="currentColor"
        d="M13 8.058a4.948 4.948 0 00-4.943 4.941A4.95 4.95 0 0013 17.942 4.948 4.948 0 0017.942
          13 4.948 4.948 0 0013 8.058z"
      />
    </svg>
  );
}

export default SocialInstagram;
