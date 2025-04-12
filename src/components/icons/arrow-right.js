import * as React from 'react';

function ArrowRight(props) {
  const fill = props.fill || '#fff';
  return (
    <svg width={10} height={16} viewBox="0 0 10 16" fill="none" {...props}>
      <path
        d="M9.172 7.429L1.977.236a.81.81 0 00-1.143 0 .806.806 0 000 1.142L7.458
        8 .834 14.622a.807.807 0 101.144 1.142L9.173 8.57a.815.815 0 000-1.142z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowRight;
