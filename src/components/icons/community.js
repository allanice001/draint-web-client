import { OUTLINE_COLOR } from 'constants/colors';
import React from 'react';

function Icon({ fill = OUTLINE_COLOR }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6078_2791)">
        <path
          d="M4.66602 12.4776H6.26627L8.66602 14.9792L11.0658 12.4776H13.5995L15.9993 14.9792L18.3991 12.4776H20.9328L23.3326 14.9792L25.7324 12.4776H27.3326C29.228 12.4776 30.7701 10.9355 30.7701 9.04006V3.4375C30.7701 1.54206 29.228 0 27.3326 0H4.66602C2.77058 0 1.22852 1.54206 1.22852 3.4375V9.04006C1.22852 10.9355 2.77058 12.4776 4.66602 12.4776ZM7.60502 7.12956V5.25456H24.3936V7.12956H7.60502Z"
          fill={fill}
        />
        <path
          d="M8.9385 29.6418C8.9385 28.6496 9.142 27.6888 9.52881 26.8066C9.23569 26.3586 8.87575 25.9585 8.46219 25.6211C7.5305 26.2643 6.40188 26.6417 5.18663 26.6417C3.97137 26.6417 2.84269 26.2643 1.91106 25.6211C0.744937 26.5721 0 28.0198 0 29.6418V31.9992H8.9385V29.6418Z"
          fill={fill}
        />
        <path
          d="M9.08299 21.1018C9.21669 18.9496 7.58033 17.0965 5.42808 16.9628C3.27582 16.829 1.42268 18.4654 1.28897 20.6177C1.15527 22.7699 2.79162 24.623 4.94388 24.7567C7.09614 24.8905 8.94928 23.2541 9.08299 21.1018Z"
          fill={fill}
        />
        <path
          d="M30.0885 25.6211C29.1568 26.2643 28.0282 26.6417 26.8129 26.6417C25.5976 26.6417 24.469 26.2643 23.5373 25.6211C23.1237 25.9584 22.7638 26.3586 22.4707 26.8066C22.8575 27.6888 23.061 28.6496 23.061 29.6418V31.9992H31.9994C31.9994 31.9992 31.9994 29.6422 31.9994 29.6418C31.9994 28.0198 31.2545 26.5721 30.0885 25.6211Z"
          fill={fill}
        />
        <path
          d="M28.2808 24.4705C30.2821 23.6661 31.2524 21.3917 30.448 19.3904C29.6436 17.3891 27.3691 16.4188 25.3678 17.2232C23.3665 18.0276 22.3962 20.3021 23.2006 22.3034C24.005 24.3047 26.2795 25.2749 28.2808 24.4705Z"
          fill={fill}
        />
        <path
          d="M21.1875 31.9992C21.1875 31.9992 21.1875 29.6422 21.1875 29.6418C21.1875 28.0198 20.4425 26.5722 19.2765 25.6211C18.3449 26.2643 17.2162 26.6417 16.0009 26.6417C14.7857 26.6417 13.657 26.2643 12.7254 25.6211C11.5594 26.5722 10.8145 28.0198 10.8145 29.6418V31.9992H21.1875Z"
          fill={fill}
        />
        <path
          d="M16.1976 24.7755C18.3521 24.6656 20.0094 22.8299 19.8994 20.6755C19.7894 18.5211 17.9538 16.8637 15.7993 16.9737C13.6449 17.0837 11.9876 18.9194 12.0976 21.0738C12.2076 23.2282 14.0432 24.8855 16.1976 24.7755Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_6078_2791">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;
