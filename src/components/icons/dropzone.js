import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      {...props}
    >
      <path
        fill="#F2F2F2"
        d="M38.333 0H1.667C.75 0 0 .75 0 1.667v36.666C0 39.25.75 40 1.667 40h36.666C39.25 40 40 39.25 40 38.333V1.667C40 .75 39.25 0 38.333 0z"
      ></path>
      <path fill="#84DBFF" d="M37.084 2.917H2.917V30.5h34.167V2.916z"></path>
      <path
        fill="#334A5E"
        d="M20.834 30.5H2.917v-7c1.417-.416 3-.583 4.583-.583 2 0 4 .333 5.667 1 .5.167.917.333 1.333.583 2.917 1.334 5.167 3.417 6.334 6z"
      ></path>
      <path
        fill="#40596B"
        d="M37.085 21.666V30.5H10.168c.75-2.334 2.333-4.417 4.417-6.084C18 21.666 22.835 20 28.335 20c3.083 0 6.166.583 8.75 1.666z"
      ></path>
      <path
        fill="#fff"
        d="M9.752 13.168a3.417 3.417 0 100-6.834 3.417 3.417 0 000 6.834zM34.584 8.084c.083-.25.083-.5.083-.75 0-1.333-1.083-2.5-2.5-2.5-.917 0-1.75.5-2.167 1.25-.25-.167-.583-.167-.916-.167a2.253 2.253 0 00-2.25 1.917c-.667.167-1.167.75-1.167 1.417 0 .833.667 1.5 1.5 1.5h6.583c.834 0 1.5-.667 1.5-1.5 0-.5-.25-.917-.666-1.167z"
      ></path>
    </svg>
  );
}

export default Icon;
