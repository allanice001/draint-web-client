/** *
 *
 *   LOADER
 *   Infinite spinning animation for loading states.
 *
 ********* */

import './loader.scss';

import Center from './images/center.svg';
import ClassNames from 'classnames';
import Orbit from './images/orbit.svg';
import React from 'react';

export const Loader = ({ className }) => {
  const cssClass = ClassNames({
    loader: true,
    [className]: className,
  });

  return (
    <div className={cssClass}>
      <img
        alt="Orbit Center"
        className="center"
        src={Center}
        title="Orbit Center"
      />
      <img
        alt="Orbit Spinner"
        className="orbit"
        src={Orbit}
        title="Orbit Spinner"
      />
    </div>
  );
};
