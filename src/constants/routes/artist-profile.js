import { MASTER_ROOT, PAYOUTS_REQUESTS } from './masterModule/dashboard';

export const CONTACTS = '/contacts';
export const FEEDBACK = '/feedback';
export const ORDERS = '/orders';
export const SALES_DASHBOARD = '/sales-dashboard';
export const SETTINGS = '/settings';
export const SOCIAL_MEDIA = '/social-media';
export const SUBSCRIPTIONS = '/subscriptions';
export const PAINTINGS = '/paintings';

export const PROFILE_GALLERY = '/artgallery';
export const PROFILE_PAINTINGS = PROFILE_GALLERY + PAINTINGS;
export const PROFILE_CONTACTS = PROFILE_GALLERY + CONTACTS;
export const PROFILE_FEEDBACK = PROFILE_GALLERY + FEEDBACK;
export const PROFILE_ORDERS = PROFILE_GALLERY + ORDERS;
export const PROFILE_SALES = PROFILE_GALLERY + SALES_DASHBOARD;
export const MASTER_PAYOUT_REQUESTS = MASTER_ROOT + PAYOUTS_REQUESTS;
export const PROFILE_SETTINGS = PROFILE_GALLERY + SETTINGS;
export const PROFILE_SOCIAL_MEDIA = PROFILE_GALLERY + SOCIAL_MEDIA;
export const PROFILE_SUBSCRIPTIONS = PROFILE_GALLERY + SUBSCRIPTIONS;

export const profileTabs = {
  PAINTINGS: 'paintings',
  ABOUT: 'about',
  ATELIER: 'atelier',
  BLOG: 'blog',
  INSTAGRAM: 'instagram',
  MAILING: 'mailing',
};

export const PROFILE_PAGE = PROFILE_GALLERY + '/' + profileTabs.PAINTINGS;
