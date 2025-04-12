import { combineReducers } from 'redux';
import homepageBlogReducer from 'redux/master/reducers/hamepage-blog-reducer';
import homepageJoinOurReducer from 'redux/master/reducers/homepage-join-our-section-reducer';
import homepageJoinUsReducer from 'redux/master/reducers/homepage-join-us-section-reducer';
import homepageNewsletterReducer from 'redux/master/reducers/homepage-newsletter-section-reducer';
import homepagePaintingsByArtistsReducer from 'redux/master/reducers/homepage-paintings-by-artist-reducer';
import homepageReducer from './reducers/homepageReducer';
import homepageReviewsReducer from 'redux/master/reducers/homepage-reviews-reduser';
import homepageShipmentReducer from 'redux/master/reducers/homepage-shipment-section-reducer';

const reducers = {
  homepage: homepageReducer,
  blog: homepageBlogReducer,
  reviews: homepageReviewsReducer,
  joinUsSection: homepageJoinUsReducer,
  joinOurSection: homepageJoinOurReducer,
  shipmentSection: homepageShipmentReducer,
  newsletterSection: homepageNewsletterReducer,
  paintings: homepagePaintingsByArtistsReducer,
};

const homepageRootReducer = combineReducers(reducers);

export default homepageRootReducer;
