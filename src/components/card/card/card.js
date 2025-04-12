import './card.scss';

import ClassNames from 'classnames';
import { Loader } from 'components/lib';
import React from 'react';

export function Card(props) {
  const cssClass = ClassNames({
    card: true,
    loading: props.loading,
    [props.className]: props.className,
  });

  return (
    <section className={cssClass}>
      {props.title && (
        <header>
          <h2>{props.title}</h2>
        </header>
      )}

      {props.loading ? <Loader /> : props.children}
    </section>
  );
}
