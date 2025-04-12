import PropTypes from 'prop-types';
import React from 'react';

function WrappedCalendarIcon({ size1, size2, color1, color2 }) {
  return (
    <svg
      width={size1}
      height={size2}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.702 17.329h18.376a.704.704 0 00.45-.163c.177-.148 4.203-3.611 4.449-11.088H4.24C3.997 12.865.29 16.055.251 16.086a.705.705 0 00.451 1.243zM23.298 1.859h-3.516v-.703a.696.696 0 00-.703-.703.696.696 0 00-.703.703v.703h-3.563v-.703a.696.696 0 00-.703-.703.696.696 0 00-.703.703v.703H9.89v-.703a.696.696 0 00-.703-.703.696.696 0 00-.703.703v.703H4.969a.696.696 0 00-.703.703v2.11H24v-2.11a.696.696 0 00-.703-.703z"
        fill={color1}
      />
      <path
        d="M20.432 18.244a2.116 2.116 0 01-1.353.49H4.266v2.11c0 .389.314.703.703.703h18.329a.703.703 0 00.703-.703v-7.882c-1.356 3.326-3.248 5.013-3.569 5.282z"
        fill={color2}
      />
    </svg>
  );
}

WrappedCalendarIcon.defaultProps = {
  size1: 24,
  size2: 22,
  color1: '#806BFF',
  color2: '#806BFF',
};

WrappedCalendarIcon.propTypes = {
  size1: PropTypes.number,
  size2: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

export default WrappedCalendarIcon;
