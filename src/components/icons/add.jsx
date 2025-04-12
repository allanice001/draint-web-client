import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        d="M12.937 12.939h9.804a.625.625 0 100-1.25h-9.804V1.884a.625.625 0 10-1.25 0v9.805H1.882a.625.625 0 000 1.25h9.805v9.805a.623.623 0 00.625.625c.345 0 .625-.28.625-.625v-9.805z"
      ></path>
    </svg>
  );
}

export default Icon;
