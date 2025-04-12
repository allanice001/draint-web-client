import '../layout.scss';
import './app.scss';

import { AppNav, AuthContext, Button, Header, HoverNav } from 'components/lib';

import ClassNames from 'classnames';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import React from 'react';

export class AppLayout extends React.Component {
  render() {
    document.body.classList.remove('color-bg');
    const cssClass = ClassNames({
      app: true,
      'with-sidebar': true,
      'with-bottom-nav': true,
      hide: this.props.loading,
    });

    return (
      <>
        <AppNav
          type="fixed"
          items={[
            { label: 'Your Gallery', link: PROFILE_GALLERY },
            {
              label: 'Account settings',
              link: '/account-settings',
              hasSubNav: true,
            },
            { label: 'Orders', link: '/orders', hasSubNav: true },
            {
              label: 'Sales Dashboard',
              link: '/sales-dashboard',
              hasSubNav: false,
            },
          ]}
        />
        <main className={cssClass}>
          <Header title={this.props.title}>
            <HoverNav
              label={
                this.context.user.username
                  ? this.context.user.username
                  : this.context.user.email
              }
              align="right"
            >
              <Button
                text="Account Settings"
                action={event => (window.location = '/account')}
              />
              <Button text="Signout" action={this.context.signout} />
            </HoverNav>
          </Header>

          {<this.props.children />}
        </main>
      </>
    );
  }
}

AppLayout.contextType = AuthContext;
