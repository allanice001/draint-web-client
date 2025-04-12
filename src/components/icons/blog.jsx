import React from 'react';

function Icon(props) {
  const { className = '', width = 21, height = 20 } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill="currentColor"
        d="M17.583 4.9l-2.485-2.485-4.63 4.667 2.487 2.486L17.583 4.9zM8.243 11.028a.586.586 0 00.767.766l2.976-1.54L9.78 8.05l-1.538 2.978zM19.83 2.657a.586.586 0 000-.828L18.171.172a.586.586 0 00-.829 0L15.93 1.586l2.485 2.486 1.415-1.415z"
      ></path>
      <path
        fill="currentColor"
        d="M1.758 16.445h.586v2.969a.585.585 0 001 .414l3.383-3.383h6.828a1.76 1.76 0 001.758-1.758V8.87l-1.849 1.848c-.16.161-.35.288-.56.377l-3.355 1.74c-.305.131-.534.178-.768.178a1.73 1.73 0 01-.505-.083H4.102a.586.586 0 110-1.172h2.967c-.116-.384-.066-.8.093-1.18L8.97 7.065c.052-.13.179-.32.34-.48l1.86-1.86H1.757A1.76 1.76 0 000 6.484v8.203c0 .97.789 1.758 1.758 1.758z"
      ></path>
    </svg>
  );
}

export default Icon;
