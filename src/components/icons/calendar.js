/* eslint-disable max-len */
import * as React from 'react';

function Calendar(props) {
  return (
    <svg
      width={17}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.459 2.375h3.166a.792.792 0 0 1 .792.792v12.666a.792.792 0 0 1-.792.792H1.375a.792.792 0 0 1-.792-.792V3.167a.792.792 0 0 1 .792-.792h3.167V.792h1.583v1.583h4.75V.792h1.584v1.583Zm-1.584 1.583h-4.75v1.584H4.542V3.958H2.167v3.167h12.666V3.958H12.46v1.584h-1.584V3.958Zm3.959 4.75H2.167v6.334h12.667V8.708Z"
        fill="#C7C7C7"
      />
    </svg>
  );
}

export default Calendar;
