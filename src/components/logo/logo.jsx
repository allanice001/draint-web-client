import { bool, string } from 'prop-types';

import { HOME } from 'constants/routes/mainRout';
import Icons from '../icons';
import Img from './img';
import { Link } from 'react-router-dom';
import React from 'react';
import { pageScroll } from 'services/pageScroller';
import staticUrls from 'constants/images/static-urls';
import styles from './logo.module.scss';

const Logo = function({ old, short, home, className }) {
  const getLogo = props => {
    if (old) return <Img src={staticUrls.image.logoCertificate} {...props} />;
    if (short) return <Icons.Logo {...props} />;
    return <Icons.LogoWithName {...props} />;
  };

  const logoClass = `${styles.logo} ${className}`;

  if (home) {
    return getLogo({
      className: logoClass,
      onClick: pageScroll,
    });
  }

  return <Link to={HOME}>{getLogo({ className: logoClass })}</Link>;
};

Logo.propTypes = {
  old: bool,
  short: bool,
  home: bool,
  className: string,
};

export { Logo };
