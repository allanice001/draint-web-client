import { AuthContext } from 'components/lib';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export class AccountNav extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {context => (
          <nav className={styles.subnav}>
            <NavLink
              exact
              to="/account-settings"
              activeClassName={styles.active}
            >
              Settings
            </NavLink>
            <NavLink
              exact
              to="/account/location"
              activeClassName={styles.active}
            >
              Address
            </NavLink>
            <NavLink
              exact
              to="/account/preview"
              activeClassName={styles.active}
            >
              Preview
            </NavLink>
            <NavLink
              exact
              to="/account/password"
              activeClassName={styles.active}
            >
              Password
            </NavLink>
            <NavLink
              exact
              to="/account/verification"
              activeClassName={styles.active}
            >
              Verification
            </NavLink>
            <NavLink
              exact
              to="/account/notifications"
              activeClassName={styles.active}
            >
              Notifications
            </NavLink>
            {context.permission()['owner'] && (
              <>
                <NavLink
                  exact
                  to="/account/billing"
                  activeClassName={styles.active}
                >
                  Billing
                </NavLink>
              </>
            )}
          </nav>
        )}
      </AuthContext.Consumer>
    );
  }
}
