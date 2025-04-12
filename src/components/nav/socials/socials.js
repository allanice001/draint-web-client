import { List, Record, Space } from '../../shared/list';

import Icons from '../../icons';
import React from 'react';
import cx from 'classnames';
import styles from './socials.module.scss';

const links = [
  {
    href: 'https://www.instagram.com/draint_artgallery/',
    Icon: Icons.Instagram,
  },
  { href: 'https://www.facebook.com/draint.artgallery/', Icon: Icons.Facebook },
];

export const Socials = ({ className = '', xl }) => (
  <div className={cx(styles.root, className)}>
    <List horizontal space={Space.Around}>
      {links.map(({ href, Icon }, index) => (
        <Record key={index}>
          <a className={cx(styles.link)} href={href}>
            <Icon xl={xl} />
          </a>
        </Record>
      ))}
    </List>
  </div>
);
