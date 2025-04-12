import { func, number, string } from 'prop-types';

import React from 'react';

const Img = function({ src, onClick, className, width = 145 }) {
  const title = 'Logo';

  return (
    <img
      alt={title}
      className={className}
      onClick={onClick}
      src={src}
      title={title}
      width={width}
    />
  );
};

Img.propTypes = {
  src: string,
  className: string,
  width: number,
  onClick: func,
};

export default Img;
