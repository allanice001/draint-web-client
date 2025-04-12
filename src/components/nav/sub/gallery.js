import { PROFILE_GALLERY, profileTabs } from 'constants/routes/artist-profile';
import { AuthContext } from 'components/lib';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export class GalleryNav extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {context => (
          <nav className={styles.subnav}>
            <NavLink exact to={PROFILE_GALLERY} activeClassName={styles.active}>
              Gallery
            </NavLink>
            <NavLink
              exact
              to={PROFILE_GALLERY + profileTabs.INSTAGRAM}
              activeClassName={styles.active}
            >
              Instagram
            </NavLink>
            {/*
                        <NavLink exact to='/account/password' activeClassName='active'>Password</NavLink>
                        <NavLink exact to='/account/notifications' activeClassName='active'>Notifications</NavLink>

                        { context.permission()['owner'] &&

                        <>
                            <NavLink exact to='/account/billing' activeClassName='active'>Billing</NavLink>
                        </>

                        }
                        */}
          </nav>
        )}
      </AuthContext.Consumer>
    );
  }
}
