import PropTypes from 'prop-types';
import React from 'react';
import { VERIFIED } from '../../constants/global';

function WrapperStepChecked({ size, uploaded, status, strokeWidth }) {
  function setIconColor(uploaded = false, status = '') {
    let color = '#fff';
    if (uploaded) color = '#806BFF';
    if (uploaded && status === VERIFIED) color = '#fff';
    return color;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 7.5L7.5 13l11-11"
        stroke={setIconColor(uploaded, status)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

WrapperStepChecked.defaultProps = {
  size: 25,
  strokeWidth: 4,
};

WrapperStepChecked.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
  uploaded: PropTypes.bool,
  status: PropTypes.string,
};

export default WrapperStepChecked;
