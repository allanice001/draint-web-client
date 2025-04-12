import {
  ART_GALLERY_PAINTINGS,
  BLOG,
  COLLECTOR_DASHBOARD_ARTWORKS,
  FAQ,
  FEATURES_ARTISTS,
  HOME,
  IMPRINT,
  LEGAL,
  LEGAL_PRIVACY_POLICY,
  LEGAL_TERMS_AND_CONDITIONS,
  MISSION,
  SHOPPING_CART,
  SIGNUP_ARTIST,
  SIGNUP_COLLECTOR,
  SIGN_IN,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  TRADE,
} from 'constants/routes/publicModule/nav';
import {
  PROFILE_GALLERY,
  PROFILE_PAINTINGS,
} from 'constants/routes/artist-profile';
import { SIGN_IN_ROOT, SIGN_UP_ROOT } from 'constants/routes/publicModule/auth';
import {
  artistDashboardLinksMobile,
  collectorDashboardLinks,
} from 'constants/components/navbar/links';
import ArtistsSubMenu from 'components/nav/home/components/sub-menu-artists';
import ArtworksSubMenu from 'components/nav/home/components/sub-menu-artworks';
import { COLLECTOR_DASHBOARD } from 'constants/routes/collector-profile';
import DropDownNavigation from 'components/shared/dropdown-navigation/dropdown-navigation';
import Icons from 'components/icons';
import ProfileSubMenu from 'components/nav/home/components/sub-menu-profile';
import React from 'react';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import withArtistDropdownNavigation from 'hoc/with-artist-dropdown-navigation';
import withCollectorDropdownNavigation from 'hoc/with-collector-dropdown-navigation';

export const MAIN_NAV_BAR_HEIGHT = 106;

export const navMap = {
  artist: {
    key: 'artist',
    label: 'Artists',
    url: SEARCH_ARTISTS,
    Icon: Icons.Artist,
    subMenu: props => <ArtistsSubMenu {...props} />,
  },

  artwork: {
    key: 'artwork',
    label: 'Artworks',
    url: SEARCH_ARTWORKS,
    Icon: Icons.Artwork,
    subMenu: props => <ArtworksSubMenu {...props} />,
  },

  artistProfile: {
    onlyMobile: true,
    key: 'artist-profile',
    label: 'Profile',
    url: PROFILE_GALLERY,
    subMenu: props => (
      <ProfileSubMenu {...props} nav={artistDashboardLinksMobile} />
    ),
  },

  collectorProfile: {
    onlyMobile: true,
    key: 'collector-profile',
    label: 'Profile',
    url: COLLECTOR_DASHBOARD_ARTWORKS,
    subMenu: props => (
      <ProfileSubMenu {...props} nav={collectorDashboardLinks} />
    ),
  },

  trade: {
    key: 'trade',
    label: 'Trade',
    Icon: Icons.Trade,
    url: TRADE,
  },

  // draint profile features
  pricing: {
    key: 'pricing',
    label: 'Pricing',
    // Icon: Icons.Trade,
    url: FEATURES_ARTISTS,
  },

  cart: empty => ({
    key: 'cart',
    label: 'Cart',
    url: SHOPPING_CART,
    Icon: empty ? Icons.Cart : Icons.Cart,
  }),

  support: {
    label: 'Support',
    url: FEATURES_ARTISTS,
    Icon: Icons.Info,
  },

  home: {
    label: 'Home',
    url: HOME,
    Icon: Icons.Home,
  },

  search: {
    label: 'Search',
    Icon: Icons.Search,
  },

  contact: {
    label: 'Contact',
    url: IMPRINT,
  },

  team: {
    label: 'Team',
    url: HOME,
  },

  legal: {
    key: 'legal',
    label: 'Legal',
    url: LEGAL,
  },

  faq: {
    key: 'faq',
    label: 'FAQ',
    url: FAQ,
  },

  blog: {
    key: 'blog',
    label: 'Blog',
    url: BLOG,
  },

  profile: {
    label: 'My profile',
    url: ART_GALLERY_PAINTINGS,
  },

  collector: {
    label: 'My profile',
    url: COLLECTOR_DASHBOARD_ARTWORKS,
  },

  imprint: {
    label: 'Imprint',
    url: IMPRINT,
  },

  terms: {
    label: 'Terms',
    url: LEGAL_TERMS_AND_CONDITIONS,
  },

  privacy: {
    label: 'Privacy',
    url: LEGAL_PRIVACY_POLICY,
  },

  signin: {
    label: 'Log In',
    url: SIGN_IN,
    Icon: Icons.SignIn,
  },

  instagram: {
    label: 'Instagram',
    url: SOCIAL_INSTAGRAM,
    social: SOCIAL_INSTAGRAM,
    Icon: Icons.SocialInstagram,
  },

  facebook: {
    label: 'Facebook',
    url: SOCIAL_FACEBOOK,
    social: SOCIAL_FACEBOOK,
    Icon: Icons.SocialFacebook,
  },

  profileOverviewArtist: {
    label: 'Profile Overview',
    url: PROFILE_GALLERY,
  },

  profileOverviewCollector: {
    label: 'Profile Overview',
    url: COLLECTOR_DASHBOARD_ARTWORKS,
  },

  signUpArtist: {
    label: 'SignUp',
    url: SIGNUP_ARTIST,
  },

  signUpCollector: {
    label: 'SignUp',
    url: SIGNUP_COLLECTOR,
  },

  whyDraint: {
    label: 'Why Draint',
    url: FEATURES_ARTISTS,
  },

  missionVision: {
    label: 'Mission & Vision',
    url: MISSION,
  },

  tradeYourPaintings: {
    label: 'Trade your Paintings',
    url: TRADE,
  },

  searchArtists: {
    label: 'Search for Artists',
    url: SEARCH_ARTISTS,
  },

  searchPaintings: {
    label: 'Search for Paintings',
    url: SEARCH_ARTWORKS,
  },

  Shipping: {
    label: 'Shipping',
    url: '/shipping',
  },

  termsConditions: {
    label: 'Terms & Conditions',
    url: LEGAL_TERMS_AND_CONDITIONS,
  },

  privacyPolicy: {
    label: 'Privacy Policy',
    url: LEGAL_PRIVACY_POLICY,
  },

  legals: {
    label: 'Legals',
    url: LEGAL,
  },
};

export const navButtons = {
  profileButton: (isArtist, isActivated, isTablet) => ({
    label: 'Your Profile',
    url: isArtist ? PROFILE_PAINTINGS : COLLECTOR_DASHBOARD,
    button: true,
    primary: true,
    dropdownMenu: isArtist
      ? withArtistDropdownNavigation(DropDownNavigation, isActivated, isTablet)
      : withCollectorDropdownNavigation(DropDownNavigation, isTablet),
  }),
  signInButton: {
    label: 'Log In',
    url: SIGN_IN_ROOT,
    primary: true,
    button: true,
  },
  signUpButton: {
    label: 'Sign Up!',
    url: SIGN_UP_ROOT,
    button: true,
  },
};
