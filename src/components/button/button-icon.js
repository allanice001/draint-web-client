import ClassNames from 'classnames';
import { Icon } from 'components/lib';
import React from 'react';

export function IconButton(props) {
  const cssClass = ClassNames({
    'btn-ico': true,
    [props.className]: props.className,
  });

  return (
    <button
      type="button"
      title={props.title}
      className={cssClass}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        if (props.action) props.action(props.params);
      }}
    >
      <Icon image={props.image} color={props.color} size={props.size} />
    </button>
  );
}
