import PropTypes from 'prop-types';
import React from 'react';

function SimpleArrowBack({ height, width }) {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 8 14"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.01 7c0 .25.096.502.287.693l6.02 6.02a.98.98 0 101.386-1.387L2.377 7l5.326-5.326A.98.98 0 006.316.287l-6.02 6.02A.978.978 0 00.01 7z"
        fill="#3F4041"
      />
    </svg>
  );
}

SimpleArrowBack.defaultProps = {
  height: undefined,
  width: undefined,
};

SimpleArrowBack.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SimpleArrowBack;
