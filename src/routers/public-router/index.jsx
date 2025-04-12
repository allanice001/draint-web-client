import {
  ARTWORK_ROOT,
  SEARCH_ARTWORKS,
  SHIPPING_ROOT,
  TRADE_ROOT,
} from 'constants/routes/publicModule/artwork';
import {
  BLOG_TITLE,
  ID_PARAMETER,
  USERNAME_PARAMETER,
} from 'constants/routes/parameters/parameters';
import {
  FORGOT_PASSWORD_ROOT,
  RECOVER_ROOT,
  RESET_PASSWORD_ROOT,
  SIGN_IN_ROOT,
  SIGN_UP_ROOT,
} from 'constants/routes/publicModule/auth';
import {
  IMPRINT_ROOT,
  PRIVACY_ROOT,
  TERMS_ROOT,
} from 'constants/routes/publicModule/policy';
import {
  PRICING_ROOT,
  SHOPPING_CART_ROOT,
} from 'constants/routes/publicModule/financials';
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import ArtworkRouter from './routers/artwork-router';
import AuthRouter from './routers/auth-router';
import { BLOG } from 'constants/routes/userModule/gallery';
import { BlogPage } from 'views/blog/blog-page/blog-page';
import { FEATURES_ROOT } from 'constants/routes/publicModule/features';
import FinancialRouter from './routers/financial-router';
import Footer from 'components/footer/footer';
import { HOME } from 'constants/routes/mainRout';
import { Helmet } from 'react-helmet';
import Home from 'views/website/home/home';
import { MAIL_ROOT } from 'constants/routes/publicModule/mail';
import { MISSION_ROOT } from 'constants/routes/publicModule/mission';
import MailRouter from './routers/public-mail-router';
import MainNavbar from 'components/nav/home/main-navbar';
import NotFoundPage from 'pages/not-found';
import { PAYPAL_ROOT } from 'constants/routes/publicModule/paypal';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import PayPalRouter from './routers/paypal-router';
import { Redirect } from 'react-router';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import { SOFORT_ROOT } from 'constants/routes/publicModule/sofort';
import { STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_ROOT } from 'constants/routes/publicModule/stripeSubscriptionCheckoutSession';
import SearchPage from '../../components/search-page/search-page';
import SingleBlogPost from 'components/blog/singleBlogPost/single-blog-post';
import SofortRouter from './routers/sofort-router';
import StripeCheckoutRouter from './routers/stripe-checkouе-router';
import Suspense from 'components/suspense';
import { ThemeProvider } from '@material-ui/core/styles';
import { getInlineTabTypes } from 'helpers/search/get-inline-tab-types';
import { permissions } from 'constants/permissions';
import theme from 'config/mui-theme';

const FaqPage = lazy(() => import('components/faq-page/faq-page'));
const MissionRouter = lazy(() => import('./routers/mission-router'));
const TradePage = lazy(() => import('components/trade/trade-page/trade-page'));
const ShippingPage = lazy(() =>
  import('components/shipping-page/shipping-page')
);
const FeaturesRouter = lazy(() => import('./routers/features-router'));
const LegalPage = lazy(() => import('components/legal-page'));
const PolicyRouter = lazy(() => import('./routers/policy-router'));
const ContactConfirmation = lazy(() =>
  import('views/website/contacts/contacts-confirmation')
);
const PersonalSubscriptionUnsubscribe = lazy(() =>
  import('views/website/personal-subscriptions/subscription-unsubscribe')
);

export default function PublicRouter() {
  return (
    <>
      <MainNavbar />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path={HOME}>
            <Home />
          </Route>

          <Route path={[ARTWORK_ROOT]}>
            <ArtworkRouter />
          </Route>

          <Route
            path={[
              SIGN_IN_ROOT,
              SIGN_UP_ROOT,
              FORGOT_PASSWORD_ROOT,
              RESET_PASSWORD_ROOT,
              RECOVER_ROOT,
            ]}
          >
            <AuthRouter />
          </Route>

          <Route path={[PRICING_ROOT, SHOPPING_CART_ROOT]}>
            <FinancialRouter />
          </Route>

          <Route path={[TERMS_ROOT, PRIVACY_ROOT, IMPRINT_ROOT]}>
            <Suspense>
              <PolicyRouter />
            </Suspense>
          </Route>

          <Route path={[FEATURES_ROOT]}>
            <Suspense>
              <FeaturesRouter ROOT_PATH={FEATURES_ROOT} />
            </Suspense>
          </Route>

          <Route path={[MISSION_ROOT]}>
            <Suspense>
              <MissionRouter ROOT_PATH={MISSION_ROOT} />
            </Suspense>
          </Route>

          <Route path={[PAYPAL_ROOT]}>
            <PayPalRouter ROOT_PATH={PAYPAL_ROOT} />
          </Route>

          <Route path={[SOFORT_ROOT]}>
            <SofortRouter ROOT_PATH={SOFORT_ROOT} />
          </Route>

          <Route path={[STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_ROOT]}>
            <StripeCheckoutRouter
              ROOT_PATH={STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_ROOT}
            />
          </Route>

          <Route path={[MAIL_ROOT]}>
            <MailRouter ROOT_PATH={MAIL_ROOT} />
          </Route>

          <Route path={[TRADE_ROOT]}>
            <Suspense>
              <TradePage />
            </Suspense>
          </Route>

          <Route path={[SHIPPING_ROOT]}>
            <>
              <Helmet>
                <title>Packaging and shipment</title>
              </Helmet>
              <Suspense>
                <ShippingPage />
              </Suspense>
            </>
          </Route>

          <Route path={'/legal/:title?'}>
            <Suspense>
              <LegalPage />
            </Suspense>
          </Route>

          {/* SEO optimization */}
          <Route path={['/artists']}>
            <Redirect to={SEARCH_ARTISTS} />
          </Route>

          {/* SEO optimization */}
          <Route path={['/artworks']}>
            <Redirect to={SEARCH_ARTWORKS} />
          </Route>

          <Route exact path={`/search/:type(${getInlineTabTypes()})`}>
            <SearchPage />
          </Route>

          <Route path={'/blog/:category?'}>
            <BlogPage />
          </Route>

          <Route
            exact
            path={
              USERNAME_PARAMETER +
              PROFILE_GALLERY +
              BLOG +
              ID_PARAMETER +
              BLOG_TITLE
            }
            permission={permissions.USER}
            render={() => <SingleBlogPost />}
          />

          <Route exact path="/contact-subscription/:type/:id">
            <Suspense>
              <ContactConfirmation />
            </Suspense>
          </Route>

          <Route exact path="/personal-subscriptions/unsubscribe/:id">
            <Suspense>
              <PersonalSubscriptionUnsubscribe />
            </Suspense>
          </Route>

          <Route exact path={'/faq/:category?/:topic?/:question?'}>
            <Suspense>
              <FaqPage />
            </Suspense>
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </ThemeProvider>
      <Footer />
    </>
  );
}
