import React from 'react';

const SepaIconDisabled = function(properties) {
  const { param: parameter } = properties;
  return (
    <svg fill="none" height={parameter} viewBox="0 0 30 30" width={parameter}>
      <path
        d="M19.987 4.012c3.335 0 6.313 1.557 8.27 3.995L30 4.22A15.179 15.179 0 0019.47 0C13.095 0 7.644 3.9 5.406 9.42h-3.4L0 13.778h4.374c-.033.404-.055.809-.055 1.222 0 .5.026.993.075 1.481H2.196L.189 20.843h5.323C7.812 26.223 13.196 30 19.469 30c3.162 0 6.095-.96 8.524-2.6v-5.344c-1.956 2.257-4.817 3.682-8.006 3.682-3.728 0-7.008-1.947-8.918-4.895h11.146l2.007-4.36H9.43a11.128 11.128 0 01-.063-2.704h16.1l2.006-4.36H10.758c1.849-3.232 5.289-5.407 9.229-5.407z"
        fill="#ffe093"
      />
    </svg>
  );
};

export default SepaIconDisabled;
