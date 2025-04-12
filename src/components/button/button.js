import './button.scss';

import ClassNames from 'classnames';
import React from 'react';

export function Button(props) {
  const cssClass = ClassNames({
    btn: props.className !== 'btn-text',
    'btn-text': props.className === 'btn-text',
    [props.color]: props.color,
    [props.className]: props.className,
  });

  return (
    <button
      type="button"
      className={cssClass}
      onClick={() => {
        if (props.action) props.action(props.params);
      }}
    >
      {props.text}
    </button>
  );
}
