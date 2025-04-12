import React from 'react';

function SocialFacebook(props) {
  const { param } = props;

  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={param}
      height={param}
      fill="none"
      viewBox="0 0 13 26"
    >
      <path
        fill="currentColor"
        d={`M11.837 12.975H8.282V26H2.895V12.975H.333V8.397h2.562V5.435C2.895 3.317 3.902 0 8.33
          0l3.99.017V4.46H9.425c-.475 0-1.143.237-1.143 1.248v2.694h4.026l-.47 4.573z`}
      />
    </svg>
  );
}

export default SocialFacebook
