import {
  COLLECTOR_DASHBOARD,
  COLLECTOR_DASHBOARD_ARTWORKS,
  COLLECTOR_DASHBOARD_FEEDBACK,
  COLLECTOR_DASHBOARD_OFFERS,
  COLLECTOR_DASHBOARD_ORDERS,
  COLLECTOR_DASHBOARD_SALES,
  COLLECTOR_DASHBOARD_SETTINGS,
  COLLECTOR_DASHBOARD_WATCHLIST,
} from 'constants/routes/collector-profile';
import {
  PROFILE_CONTACTS,
  PROFILE_FEEDBACK,
  PROFILE_GALLERY,
  PROFILE_ORDERS,
  PROFILE_PAGE,
  PROFILE_SALES,
  PROFILE_SETTINGS,
  PROFILE_SOCIAL_MEDIA,
  PROFILE_SUBSCRIPTIONS,
  profileTabs,
} from 'constants/routes/artist-profile';
import { ARTIST_SIGN_UP } from 'constants/links';
import AtelierIcon from 'components/icons/atelier';
import Icons from 'components/icons';
import { LOGOUT_ROOT } from 'constants/routes/publicModule/auth';
import MailingIcon from 'components/icons/send';
// import NewIcon from 'components/icons/new';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import TradeIcon from 'components/icons/trade-fire';

export const artworksLinks = [
  {
    to: SEARCH_ARTWORKS,
    title: 'Latest artworks',
    subtitle: 'Uploaded and marked as “For Sale” lately',
    Icon: TradeIcon,
  },
  {
    to: SEARCH_ARTWORKS,
    title: 'Paintings by style',
    subtitle: 'Artwork with multiple sales on Draint',
  },
  {
    to: SEARCH_ARTWORKS,
    title: 'Paintings by price',
    subtitle: 'Buy & Sell Art, initially purchased on Draint',
  },
];

export const artistLinks = isArtist => [
  // {
  //   to: '/features/artists',
  //   title: 'Draint Profile Features',
  //   subtitle: 'All you need to know as an Artist to join us',
  //   icon: NewIcon,
  // },
  { to: '/mission', title: 'Our Mission - Statement', subtitle: '' },
  {
    to: isArtist ? PROFILE_SUBSCRIPTIONS : ARTIST_SIGN_UP,
    title: 'Upgrade your Profile',
    subtitle: 'Simple Subscription plans for you as an Artist. Grow as you go',
  },
];

export const artistDashboardLinks = [
  {
    to: PROFILE_GALLERY,
    label: 'Your Public Page',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: PROFILE_CONTACTS,
    label: 'Manage Customers',
    Icon: Icons.DashboardCustomers,
  },
  {
    to: PROFILE_SALES,
    label: 'Sales Dashboard',
    Icon: Icons.DashboardSales,
  },
  {
    to: PROFILE_ORDERS,
    label: 'Orders & Offers',
    Icon: Icons.DashboardOrders,
  },
  {
    to: PROFILE_SOCIAL_MEDIA,
    label: 'Social Media',
    Icon: Icons.Instagram2,
  },
  {
    to: PROFILE_FEEDBACK,
    label: 'Feedback',
    Icon: Icons.DashboardFeedback,
  },
  {
    to: PROFILE_SETTINGS,
    label: 'Profile Settings',
    Icon: Icons.DashboardSettings,
  },
  {
    to: PROFILE_SUBSCRIPTIONS,
    label: 'Prices & Billing',
    Icon: Icons.DashboardSubscriptions,
  },
];

export const artistDashboardLinksDesktop = [
  {
    to: PROFILE_PAGE,
    label: 'Your Public Page',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: PROFILE_CONTACTS,
    label: 'Manage Customers',
    Icon: Icons.DashboardCustomers,
  },
  {
    to: PROFILE_SALES,
    label: 'Sales Dashboard',
    Icon: Icons.DashboardSales,
  },
  {
    to: PROFILE_ORDERS,
    label: 'Orders & Offers',
    Icon: Icons.DashboardOrders,
  },
  {
    to: PROFILE_SOCIAL_MEDIA,
    label: 'Social Media',
    Icon: Icons.Instagram2,
  },
  {
    to: PROFILE_FEEDBACK,
    label: 'Feedback',
    Icon: Icons.DashboardFeedback,
  },
];

export const artistProfileDropdown = [
  {
    to: PROFILE_PAGE,
    label: 'My Profile',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: PROFILE_SETTINGS,
    label: 'Profile Settings',
    Icon: Icons.DashboardSettings,
  },
  {
    to: PROFILE_SUBSCRIPTIONS,
    label: 'Prices & Billing',
    Icon: Icons.DashboardSubscriptions,
  },
  { to: LOGOUT_ROOT, label: 'Logout', Icon: Icons.SignIn },
];

export const collectorDashboardLinksDesktop = [
  {
    to: COLLECTOR_DASHBOARD_ARTWORKS,
    label: 'Your artworks',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: COLLECTOR_DASHBOARD_WATCHLIST,
    label: 'Watchlist',
    Icon: Icons.HeartBlack,
  },
  {
    to: COLLECTOR_DASHBOARD_SALES,
    label: 'Sales Dashboard',
    Icon: Icons.DashboardSales,
  },
  {
    to: COLLECTOR_DASHBOARD_OFFERS,
    label: 'Offers',
    Icon: Icons.DashboardOrders,
  },
  {
    to: COLLECTOR_DASHBOARD_ORDERS,
    label: 'Orders',
    Icon: Icons.DashboardOrders,
  },
  {
    to: COLLECTOR_DASHBOARD_FEEDBACK,
    label: 'Feedback',
    Icon: Icons.DashboardFeedback,
  },
];

export const collectorDashboardLinks = [
  {
    to: COLLECTOR_DASHBOARD_ARTWORKS,
    label: 'Your artworks',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: COLLECTOR_DASHBOARD_WATCHLIST,
    label: 'Watchlist',
    Icon: Icons.HeartBlack,
  },
  {
    to: COLLECTOR_DASHBOARD_SALES,
    label: 'Sales Dashboard',
    Icon: Icons.DashboardSales,
  },
  {
    to: COLLECTOR_DASHBOARD_OFFERS,
    label: 'Offers',
    Icon: Icons.DashboardOrders,
  },
  {
    to: COLLECTOR_DASHBOARD_ORDERS,
    label: 'Orders',
    Icon: Icons.DashboardOrders,
  },
  {
    to: COLLECTOR_DASHBOARD_SETTINGS,
    label: 'Profile Settings',
    Icon: Icons.DashboardSettings,
  },
  {
    to: COLLECTOR_DASHBOARD_FEEDBACK,
    label: 'Feedback',
    Icon: Icons.DashboardFeedback,
  },
];

export const collectorProfileDropdown = [
  {
    to: COLLECTOR_DASHBOARD,
    label: 'Your Profile',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: COLLECTOR_DASHBOARD_SETTINGS,
    label: 'Profile Settings',
    Icon: Icons.DashboardSettings,
  },
  { to: LOGOUT_ROOT, label: 'Logout', Icon: Icons.SignIn },
];

export const profileSubMenuCategory = [
  'Your Page',
  'Selling & Payout',
  'Your Account',
];

export const artistDashboardLinksMobile = [
  {
    to: PROFILE_PAGE,
    label: 'Your Public Page',
    Icon: Icons.DashboardArtworks,
    children: [
      {
        label: 'Shop my paintings',
        to: PROFILE_PAGE,
        Icon: Icons.Picture,
      },
      { label: 'My Vita', to: profileTabs.ABOUT, Icon: Icons.PersonFilled },
      { label: 'Mailing', to: profileTabs.MAILING, Icon: MailingIcon },
      { label: 'Instagram', to: profileTabs.INSTAGRAM, Icon: Icons.Instagram },
      { label: 'My Blog', to: profileTabs.BLOG, Icon: Icons.Blog },
      { label: 'My Atelier', to: profileTabs.ATELIER, Icon: AtelierIcon },
    ],
  },
  {
    to: PROFILE_CONTACTS,
    label: 'Manage Customers',
    Icon: Icons.DashboardCustomers,
  },
  {
    to: PROFILE_SALES,
    label: 'Sales Dashboard',
    Icon: Icons.DashboardSales,
  },
  {
    to: PROFILE_ORDERS,
    label: 'Orders & Offers',
    Icon: Icons.DashboardOrders,
  },
  {
    to: PROFILE_SOCIAL_MEDIA,
    label: 'Social Media',
    Icon: Icons.Instagram2,
  },
  {
    to: PROFILE_FEEDBACK,
    label: 'Feedback',
    Icon: Icons.DashboardFeedback,
  },
  {
    to: PROFILE_SETTINGS,
    label: 'Profile Settings',
    Icon: Icons.DashboardSettings,
  },
  {
    to: PROFILE_SUBSCRIPTIONS,
    label: 'Prices & Billing',
    Icon: Icons.DashboardSubscriptions,
  },
];

export const collectorDashboardLinksMobile = [
  {
    to: COLLECTOR_DASHBOARD_ARTWORKS,
    label: 'Your artworks',
    Icon: Icons.DashboardArtworks,
  },
  {
    to: COLLECTOR_DASHBOARD_WATCHLIST,
    label: 'Watchlist',
    Icon: Icons.HeartBlack,
  },
  {
    to: COLLECTOR_DASHBOARD_SALES,
    label: 'Sales Dashboard',
    Icon: Icons.DashboardSales,
  },
  {
    to: COLLECTOR_DASHBOARD_OFFERS,
    label: 'Offers',
    Icon: Icons.DashboardOrders,
  },
  {
    to: COLLECTOR_DASHBOARD_ORDERS,
    label: 'Orders',
    Icon: Icons.DashboardOrders,
  },
  {
    to: COLLECTOR_DASHBOARD_SETTINGS,
    label: 'Profile Settings',
    Icon: Icons.DashboardSettings,
  },
  {
    to: COLLECTOR_DASHBOARD_FEEDBACK,
    label: 'Feedback',
    Icon: Icons.DashboardFeedback,
  },
];
