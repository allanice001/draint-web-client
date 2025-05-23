import React from 'react';

function Icon(props) {
  const { className = '', width = 18, height = 16 } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 18 16"
    >
      <path
        fill="currentColor"
        d="M4.545 12.727c-1.164 0-2.2-.745-2.576-1.855l-.025-.084A2.653 2.653 0 011.818 10V5.04l-1.765 5.89a1.652 1.652 0 001.158 2.003l11.246 3.012c.14.037.28.054.42.054.723 0 1.385-.48 1.57-1.19l.656-2.083H4.545zM6.545 5.09C7.348 5.09 8 4.439 8 3.637a1.456 1.456 0 00-2.91 0c0 .802.653 1.455 1.455 1.455z"
      ></path>
      <path
        fill="currentColor"
        d="M15.637 0H4.727A1.82 1.82 0 002.91 1.818v8a1.82 1.82 0 001.818 1.819h10.91a1.82 1.82 0 001.818-1.819v-8A1.82 1.82 0 0015.637 0zM4.727 1.455h10.91c.2 0 .363.162.363.363v5.163l-2.297-2.68a1.302 1.302 0 00-.976-.448c-.376.002-.73.17-.971.459L9.055 7.554l-.88-.878a1.276 1.276 0 00-1.804 0L4.364 8.683V1.818c0-.2.163-.363.363-.363z"
      ></path>
    </svg>
  );
}

export default Icon;
