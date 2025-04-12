import * as React from 'react';

function Icon(props) {
  return (
    <svg height="24" viewBox="0 0 512 512" width="24" {...props}>
      <path
        fill="currentColor"
        d="M409.785 278.5L256 432.285 102.215 278.5l28.285-28.285 105.5
          105.5V0h40v355.715l105.5-105.5zM512 472H0v40h512zm0 0"
      />
    </svg>
  );
}

export default Icon;
