import PropTypes from 'prop-types';
import React from 'react';

function CartBag({ sizeW, sizeH, fill, stroke }) {
  return (
    <svg
      width={sizeW}
      height={sizeH}
      viewBox="0 0 86 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.942 40.508c2.79 0 5.05 2.26 5.05 5.05s-2.26 5.049-5.05 5.049a5.047 5.047 0 01-5.049-5.05c.133-2.79 2.392-5.049 5.05-5.049zM54.024 40.508c2.79 0 5.049 2.26 5.049 5.05s-2.259 5.049-5.05 5.049a5.047 5.047 0 01-5.048-5.05c.133-2.79 2.391-5.049 5.049-5.049z"
        fill={fill}
      />
      <path
        d="M58.412 71.164a19.13 19.13 0 00-15.933-8.52 19.13 19.13 0 00-15.933 8.52"
        stroke={stroke}
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M69.238 25.721h-53.4c-2.65-.113-4.958 1.78-5.45 4.393l-7.57 52.675a5.134 5.134 0 001.514 3.939 5.046 5.046 0 003.936 1.477h68.539a5.236 5.236 0 003.936-1.477 5.22 5.22 0 001.514-3.938l-7.57-52.676c-.492-2.613-2.8-4.506-5.45-4.393zM56.411 14.588A14.271 14.271 0 0042.447 3c-6.736.038-12.564 4.847-13.889 11.512"
        stroke={stroke}
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

CartBag.defaultProps = {
  sizeW: 86,
  sizeH: 91,
  fill: '#806BFF',
  stroke: '#806BFF',
};

CartBag.propTypes = {
  sizeW: PropTypes.number,
  sizeH: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

export default CartBag;
