import { Redirect, Route } from 'react-router-dom';

import PinterestTag from 'external-lib/pinterestTag';
import React from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

// auth context
export const AuthContext = React.createContext();

function getPermission(userType) {
  switch (userType) {
    case 'master':
      return {
        master: true,
        owner: true,
        admin: true,
        user: true,
      };
    case 'owner':
      return {
        master: false,
        owner: true,
        admin: true,
        user: true,
      };
    case 'admin':
      return {
        master: false,
        owner: false,
        admin: true,
        user: true,
      };
    case 'user':
      return {
        master: false,
        owner: false,
        admin: false,
        user: true,
      };
    default:
      return {
        master: false,
        owner: false,
        admin: false,
        user: false,
      };
  }
}

export class AuthProvider extends React.Component {
  constructor(properties) {
    super(properties);
    const user = JSON.parse(localStorage.getItem('user'));
    this.user = {
      token: user ? user.token : null,
      subscription: user ? user.subscription : null,
      permission: user ? user.permission : null,
      username: user ? user.username : null,
      email: user ? user.email : null,
      expires: user ? user.expires : null,
      avatar: user ? user.background : null,
    };
    this.signin = this.signin.bind(this);
    this.signinpricing = this.signinpricing.bind(this);
    this.signuppricing = this.signuppricing.bind(this);
    this.signup = this.signup.bind(this);
    this.signout = this.signout.bind(this);
  }

  permission = () => getPermission(this.user.permission);

  signin = res => {
    // store the user data
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      const userData = localStorage.user ? JSON.parse(localStorage.user) : null;
      const currentHash = localStorage.cartId ? localStorage.cartId : null;
      const cartHash =
        currentHash || (userData.cartHash ? userData.cartHash : null);
      localStorage.setItem('cartId', cartHash);
      if (res.data.permission === 'master') {
        window.location = '/master';
      } else {
        window.location = '/gallery';
      }
    }
  };

  signinpricing = res => {
    // store the user data
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      const userData = localStorage.user ? JSON.parse(localStorage.user) : null;
      const currentHash = localStorage.cartId ? localStorage.cartId : null;
      const cartHash =
        currentHash || (userData.cartHash ? userData.cartHash : null);
      localStorage.setItem('cartId', cartHash);
      if (res.data.permission === 'master') {
        window.location = '/master';
      } else {
        window.location = '/pricing';
      }
    }
  };

  signuppricing = res => {
    if (res.data) {
      ReactGA.event({
        category: 'User',
        action: 'Standard signup action',
      });
      ReactPixel.trackCustom('StandardSignup', {
        content_category: 'User',
        content_name: 'Standard signup action',
      });
      PinterestTag.track('Signup', {
        content_category: 'User',
        action: 'Standard signup action',
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.permission === 'master') {
        window.location = '/master';
      } else {
        window.location = '/pricing';
      }
    }
  };

  signup = res => {
    if (res.data) {
      ReactGA.event({
        category: 'User',
        action: 'Standard signup action',
      });
      ReactPixel.trackCustom('StandardSignup', {
        content_category: 'User',
        content_name: 'Standard signup action',
      });
      PinterestTag.track('Signup', {
        category: 'User',
        label: 'Standard signup action',
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.permission === 'master') {
        window.location = '/master';
      } else {
        window.location = '/gallery';
      }
    }
  };

  signout = () => {
    localStorage.clear();
    window.location = '/signin';
  };

  updateSubscription = status => {
    this.user.subscription = status;
    localStorage.setItem('user', JSON.stringify(this.user));
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.user,
          signin: this.signin,
          signinpricing: this.signinpricing,
          signup: this.signup,
          signuppricing: this.signuppricing,
          signout: this.signout,
          permission: this.permission,
          updateSubscription: this.updateSubscription,
        }}
        {...this.props}
      />
    );
  }
}

// custom route object checks for an auth token before
// rendering the route – redirects if token is not present
export var UnauthorizedRoute = function({
  render: Render,
  permission: Permission,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          return <Redirect to="/" />;
        }
        return <Render />;
      }}
    />
  );
};
