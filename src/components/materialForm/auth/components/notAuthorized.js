import './notAuthorized.scss';

import { Link } from 'components/lib';
import React from 'react';

export default function NotAuthorized() {
  return (
    <div id="not-authorized">
      <span className="auth-text">If you want to subscribe you need to</span>
      <Link className="auth-link" url="/signup/artist" text="Sign Up" />{' '}
      <span className="auth-text">or</span>
      <Link className="auth-link" url="/signin" text="Sign In" />
    </div>
  );
}
