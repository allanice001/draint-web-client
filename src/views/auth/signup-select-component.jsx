import {
  HELMET_DESCRIPTION,
  HELMET_KEYWORDS,
} from 'constants/components/auth/sign-up';
import React, { useEffect } from 'react';
// import { CollectorArtistSelector } from './collector-artist-selector';
import { CollectorArtistSignUp } from './collector-artist-sign-up';
import Helmet from 'components/helmet';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { pageScroll } from 'services/pageScroller';

function SignupSelectComponent() {
  useEffect(() => {
    ReactPixel.trackCustom('SignUpButtonSelect', {
      content_category: 'User',
      content_name: 'Sign up button was clicked',
    });

    PinterestTag.track('Signup', {
      content_category: 'User',
      action: 'Sign up button was clicked',
    });

    ReactGA.event({
      category: 'User',
      label: 'Sign up button selected',
      action: 'Sign up button was clicked',
    });

    pageScroll();
  }, []);

  return (
    <>
      <Helmet description={HELMET_DESCRIPTION} keywords={HELMET_KEYWORDS} />
      <div className="container">
        <CollectorArtistSignUp />
        {/*<CollectorArtistSelector />*/}
      </div>
    </>
  );
}

export default SignupSelectComponent;
