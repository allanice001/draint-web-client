import PropTypes from 'prop-types';
import React from 'react';

function WrapperDeleteIcon({ size, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#prefix__clip011)" fill={color}>
        <path d="M2 14c0 1.102.897 2 2 2h8c1.103 0 2-.898 2-2V4H2v10zM10 1V0H6v1H1v2h14V1h-5z" />
      </g>
      <defs>
        <clipPath id="prefix__clip011">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

WrapperDeleteIcon.defaultProps = {
  size: 16,
  color: '#D80027',
};

WrapperDeleteIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default WrapperDeleteIcon;
