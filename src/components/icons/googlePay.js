import PropTypes from 'prop-types';
import React from 'react';

function GooglePay({ height, width }) {
  return (
    <svg
      className="prefix__main-header__logo-image"
      fill="#A1A1A1"
      height={height}
      viewBox="0 0 435.97 173.13"
      width={width}
    >
      <path
        d="M206.2 84.58v50.75h-16.1V10h42.7a38.61 38.61 0 0127.65 10.85A34.88 34.88 0 01272 47.3a34.72 34.72 0 01-11.55 26.6q-11.2 10.68-27.65 10.67h-26.6zm0-59.15v43.75h27a21.28 21.28 0 0015.93-6.48 21.36 21.36 0 000-30.63 21 21 0 00-15.93-6.65h-27zM309.1 46.78q17.85 0 28.18 9.54t10.32 26.16v52.85h-15.4v-11.9h-.7q-10 14.7-26.6 14.7-14.17 0-23.71-8.4a26.82 26.82 0 01-9.54-21q0-13.31 10.06-21.17t26.86-7.88q14.34 0 23.62 5.25v-3.68A18.33 18.33 0 00325.54 67 22.8 22.8 0 00310 61.13q-13.49 0-21.35 11.38l-14.18-8.93q11.7-16.8 34.63-16.8zm-20.83 62.3a12.86 12.86 0 005.34 10.5 19.64 19.64 0 0012.51 4.2 25.67 25.67 0 0018.11-7.52q8-7.53 8-17.67-7.53-6-21-6-9.81 0-16.36 4.73c-4.41 3.2-6.6 7.09-6.6 11.76zM436 49.58l-53.76 123.55h-16.62l19.95-43.23-35.35-80.32h17.5l25.55 61.6h.35l24.85-61.6z"
        fill="#5f6368"
      />
      <path
        d="M141.14 73.64A85.79 85.79 0 00139.9 59H72v27.73h38.89a33.33 33.33 0 01-14.38 21.88v18h23.21c13.59-12.53 21.42-31.06 21.42-52.97z"
        fill="#4285f4"
      />
      <path
        d="M72 144c19.43 0 35.79-6.38 47.72-17.38l-23.21-18C90.05 113 81.73 115.5 72 115.5c-18.78 0-34.72-12.66-40.42-29.72H7.67v18.55A72 72 0 0072 144z"
        fill="#34a853"
      />
      <path
        d="M31.58 85.78a43.14 43.14 0 010-27.56V39.67H7.67a72 72 0 000 64.66z"
        fill="#fbbc04"
      />
      <path
        d="M72 28.5a39.09 39.09 0 0127.62 10.8l20.55-20.55A69.18 69.18 0 0072 0 72 72 0 007.67 39.67l23.91 18.55C37.28 41.16 53.22 28.5 72 28.5z"
        fill="#ea4335"
      />
    </svg>
  );
}

GooglePay.defaultProps = {
  height: undefined,
  width: undefined,
};

GooglePay.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default GooglePay;
