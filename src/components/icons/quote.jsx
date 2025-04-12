import * as React from "react"

function Quote({ className = '' }) {
  return (
    <svg
      width={96}
      height={68}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 40.8h20.4L6.8 68h20.4l13.6-27.2V0H0v40.8zM54.402 0v40.8h20.4L61.202 68h20.4l13.6-27.2V0h-40.8z"
        fill="#F5F5F5"
      />
    </svg>
  )
}

export default Quote;
