import approvalArtistsReducer from './reducers/approvalArtistsReducer';
import approvalArtworksReduser from './reducers/approvalArtworksReducer';
import atelierReducer from './reducers/atelierReducer';
import backgroundsReducer from './reducers/backgroundsReducer';
import blogReducer from './reducers/blogReducer';
import { combineReducers } from 'redux';
import currentArtistReducer from './reducers/currentArtistReducer';
import downsizeImageReducer from './reducers/downsizeImageReducer';
import fbCatalogReducer from './reducers/fbCatalogReducer';
import featuresCardsReducer from './reducers/featuresCardsReducer';
import feedbackReducer from './reducers/feedbackReducer';
import hashtagsReducer from './reducers/hashtagsReducer';
import homepageReducer from './reducers/homepageReducer';
import masterJoinOurReducer from './reducers/master-join-our-reducer';
import masterJoinUsReducer from './reducers/master-join-us-reducer';
import masterNewsletterReducer from './reducers/master-newsletter-section-reducer';
import masterShipmentReducer from './reducers/master-shipment-section-reducer';
import modalReducer from './reducers/modalReducer';
import newslettersReducer from './reducers/newslettersReducer';
import offersReducer from './reducers/offers-reducer';
import ordersReducer from './reducers/orders-reducer';
import payoutsReducer from './reducers/payouts-reducer';
import permissionReducer from './reducers/permissionReducer';
import reviewReducer from './reducers/reviewReducer';
import shippingRequestsReducer from './reducers/shippingRequestsReducer';
import socialMediaReducer from './reducers/socialMediaReducer';
import statisticsReducer from './reducers/statisticsReducer';
import transactionsReducer from './reducers/transactionsReducer';
import vitaReducer from './reducers/vitaReducer';

const reducers = {
  orders: ordersReducer,
  offers: offersReducer,
  backgrounds: backgroundsReducer,
  hashtags: hashtagsReducer,
  modals: modalReducer,
  socialMedia: socialMediaReducer,
  transactions: transactionsReducer,
  fbCatalog: fbCatalogReducer,
  newsletters: newslettersReducer,
  downsizeImage: downsizeImageReducer,
  approvalArtists: approvalArtistsReducer,
  approvalArtworks: approvalArtworksReduser,
  shippingRequests: shippingRequestsReducer,
  featuresCards: featuresCardsReducer,
  feedback: feedbackReducer,
  statistics: statisticsReducer,
  currentArtist: currentArtistReducer,
  payoutsRequests: payoutsReducer,
  approvalBlogs: blogReducer,
  approvalAteliers: atelierReducer,
  vita: vitaReducer,
  homepage: homepageReducer,
  reviews: reviewReducer,
  joinUsSections: masterJoinUsReducer,
  joinOurSections: masterJoinOurReducer,
  shipmentSections: masterShipmentReducer,
  newsletterSections: masterNewsletterReducer,
  permission: permissionReducer,
};

const masterRootReducer = combineReducers(reducers);

export default masterRootReducer;
