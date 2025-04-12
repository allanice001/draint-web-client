import { ARTISTS, ARTWORKS } from 'constants/routes/masterModule/artists';
import {
  ATELIER,
  BLOG,
  FAQ,
  FEATURES,
  FEEDBACK,
  HASHTAGS,
  HOMEPAGE,
  INVITES,
  LEGAL,
  MASTER_ROOT,
  OFFERS,
  OPTIONS,
  ORDERS,
  PAYOUTS_REQUESTS,
  PAYOUTS_REQUESTS_HISTORY,
  PERMISSION,
  SHIPPING_REQUESTS,
  SHIPPING_WRAPPED,
  SLIDER,
  SLIDES,
  SOCIAL_MEDIA,
} from 'constants/routes/masterModule/dashboard';
import {
  MY_VITA_PROFILES,
  MY_VITA_QUESTIONS,
  MY_VITA_ROOT,
} from 'constants/routes/masterModule/myVita';
import { Route, Switch } from 'react-router';

import ArtistsRouter from './routers/artists-router';
import BlogAtelierRouter from './routers/blog-atelier-router';
import { FB_CATALOG_ROOT } from 'constants/routes/masterModule/fbCatalog';
import FaceBookRouter from './routers/facebook-router';
import { Helmet } from 'react-helmet';
import HomepageRouter from './routers/homepage-router';
import LegalFaqRouter from './routers/legal-faq-router';
import { MODALS_ROOT } from 'constants/routes/masterModule/modal';
import MasterArtistsFeatures from 'views/master/artists-features';
import { MasterDashboard } from 'views/master/dashboard';
import MasterFeedback from 'views/master/feedback';
import MasterFeedbackOptions from 'views/master/feedback-options';
import { MasterHashtags } from 'views/master/hashtags/hashtags';
import { MasterLayout } from 'components/lib';
import MasterOffers from 'views/master/master-offers';
import { MasterOrders } from 'views/master/master-orders';
import MasterPayoutsHistory from 'views/master/master-payouts-history';
import MasterPayoutsRequests from 'views/master/master-payouts-requests';
import ModalRoute from './routers/modals-router';
import MyVitaRouter from './routers/my-vita-router';
import { NEWSLETTER_ROOT } from 'constants/routes/masterModule/newsletter';
import NewsletterRouter from './routers/newsletter-router';
import NotFoundPage from 'pages/not-found';
import PermissionRouter from './routers/permission-router';
import React from 'react';
import ShippingRouter from './routers/shipping-router';
import SocialMediaMaster from 'views/master/socialMedia';
import { permissions } from 'constants/permissions';

export default function MasterRouter() {
  return (
    <MasterLayout>
      <Switch>
        <Route
          exact
          path={MASTER_ROOT}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Master Dashboard</title>
              </Helmet>
              <MasterDashboard />
            </>
          )}
        />

        <Route path={[MASTER_ROOT + ARTISTS, MASTER_ROOT + ARTWORKS]}>
          <ArtistsRouter />
        </Route>

        <Route path={[MASTER_ROOT + PERMISSION, MASTER_ROOT + INVITES]}>
          <PermissionRouter />
        </Route>

        <Route
          path={[
            MASTER_ROOT + MY_VITA_ROOT,
            MY_VITA_PROFILES + MY_VITA_QUESTIONS,
          ]}
        >
          <MyVitaRouter />
        </Route>

        <Route path={[MASTER_ROOT + LEGAL, MASTER_ROOT + FAQ]}>
          <LegalFaqRouter />
        </Route>

        <Route path={[MASTER_ROOT + BLOG, MASTER_ROOT + ATELIER]}>
          <BlogAtelierRouter />
        </Route>

        <Route
          exact
          path={MASTER_ROOT + ORDERS}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Orders</title>
              </Helmet>
              <MasterOrders />
            </>
          )}
        />

        <Route
          exact
          path={MASTER_ROOT + OFFERS}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Offers</title>
              </Helmet>
              <MasterOffers />
            </>
          )}
        />

        <Route
          path={[
            MASTER_ROOT + SHIPPING_REQUESTS,
            MASTER_ROOT + SHIPPING_REQUESTS + SHIPPING_WRAPPED,
          ]}
        >
          <ShippingRouter />
        </Route>

        <Route
          exact
          path={MASTER_ROOT + PAYOUTS_REQUESTS}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Payouts Requests</title>
              </Helmet>
              <MasterPayoutsRequests />
            </>
          )}
        />

        <Route
          exact
          path={MASTER_ROOT + PAYOUTS_REQUESTS_HISTORY}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Payouts History</title>
              </Helmet>
              <MasterPayoutsHistory />
            </>
          )}
        />

        <Route
          path={[
            MASTER_ROOT + HOMEPAGE,
            MASTER_ROOT + HOMEPAGE + SLIDER,
            MASTER_ROOT + HOMEPAGE + SLIDER + SLIDES,
          ]}
        >
          <HomepageRouter />
        </Route>

        <Route
          exact
          path={MASTER_ROOT + HASHTAGS}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Hashtags</title>
              </Helmet>
              <MasterHashtags />
            </>
          )}
        />

        <Route
          exact
          path={MASTER_ROOT + FEEDBACK}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Feedback</title>
              </Helmet>
              <MasterFeedback />
            </>
          )}
        />

        <Route
          exact
          path={MASTER_ROOT + FEEDBACK + OPTIONS}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Feedback</title>
              </Helmet>
              <MasterFeedbackOptions />
            </>
          )}
        />

        <Route
          exact
          path={MASTER_ROOT + FEATURES}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Artists Features</title>
              </Helmet>
              <MasterArtistsFeatures />
            </>
          )}
        />

        <Route path={MASTER_ROOT + NEWSLETTER_ROOT}>
          <NewsletterRouter ROOT_PATH={MASTER_ROOT + NEWSLETTER_ROOT} />
        </Route>

        <Route path={MASTER_ROOT + MODALS_ROOT}>
          <ModalRoute ROOT_PATH={MASTER_ROOT + MODALS_ROOT} />
        </Route>

        <Route
          exact
          path={MASTER_ROOT + SOCIAL_MEDIA}
          permission={permissions.MASTER}
          render={() => (
            <>
              <Helmet>
                <title>Social Media</title>
              </Helmet>
              <SocialMediaMaster />
            </>
          )}
        />

        <Route path={MASTER_ROOT + FB_CATALOG_ROOT}>
          <FaceBookRouter ROOT_PATH={MASTER_ROOT + FB_CATALOG_ROOT} />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </MasterLayout>
  );
}
