import React from "react";

function Icon(props) {
  const { className = '', width = 13, height = 16 } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 13 16"
    >
      <path
        fill="currentColor"
        d="M6.13 7.535c1.792 0 3.245-1.687 3.245-3.767C9.375 1.687 8.898 0 6.13 0 3.36 0 2.884 1.687 2.884 3.768c0 2.08 1.453 3.767 3.246 3.767zM0 13.881c0-.128 0-.036 0 0zM12.262 13.98c.002-.035 0-.241 0 0zM12.254 13.728c-.06-3.624-.555-4.657-4.346-5.311 0 0-.534.65-1.777.65-1.244 0-1.778-.65-1.778-.65C.603 9.064.078 10.081.01 13.611c-.005.288-.008.303-.009.27v.38s.903 1.74 6.13 1.74c5.228 0 6.13-1.74 6.13-1.74v-.281a2.26 2.26 0 01-.006-.252z"
      ></path>
    </svg>
  );
}

export default Icon;
