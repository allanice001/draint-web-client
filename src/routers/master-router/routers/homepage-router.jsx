import {
  HOMEPAGE,
  JOIN_OUR,
  JOIN_US,
  MASTER_ROOT,
  NEWSLETTER_SECTION,
  REVIEWS,
  SECTIONS,
  SHIPMENT_SECTION,
  SLIDER,
  SLIDES,
} from 'constants/routes/masterModule/dashboard';
import {
  JOIN_OUR_TITLE,
  JOIN_US_TITLE,
  NEWSLETTER_SECTION_TITLE,
  SECTION_TITLE,
  SHIPMENT_SECTION_TITLE,
  SLIDES_TITLE,
  SLIDE_GENERATOR_TITLE,
} from 'constants/components/homepage';
import { Helmet } from 'react-helmet';
import { MasterHomepage } from 'views/master/homepage/masterHomepage';
import { MasterJoinOurGeneratorSections } from 'views/master/homepage/join-our/master-join-our-generator-sections';
import { MasterJoinOurSections } from 'views/master/homepage/join-our/master-join-our-sections';
import { MasterJoinUsGeneratorSections } from 'views/master/join-us/master-join-us-generator-sections';
import { MasterJoinUsSections } from 'views/master/join-us/master-join-us-sections';
import { MasterNewsletterGeneratorSections } from 'views/master/homepage/newsletter-section/master-newsletter-generator-section';
import { MasterNewsletterSections } from 'views/master/homepage/newsletter-section/master-newsletter-sections';
import { MasterReviews } from 'views/master/homepage/reviews/masterReviews';
import { MasterShipmentGeneratorSections } from 'views/master/homepage/shipment-section/master-shipment-generator-section';
import { MasterShipmentSections } from 'views/master/homepage/shipment-section/master-shipment-sections';
import { MasterSlider } from 'views/master/homepage/masterSlider';
import { MasterSlidesList } from 'views/master/homepage/slidesList';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function HomepageRouter() {
  return (
    <>
      <Route
        path={MASTER_ROOT + HOMEPAGE}
        permission={permissions.MASTER}
        render={() => <MasterHomepage />}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + SLIDER}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SLIDE_GENERATOR_TITLE}</title>
            </Helmet>
            <MasterSlider />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + SLIDER + SLIDES}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SLIDES_TITLE}</title>
            </Helmet>
            <MasterSlidesList />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + REVIEWS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <MasterReviews />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + JOIN_US}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{JOIN_US_TITLE}</title>
            </Helmet>
            <MasterJoinUsGeneratorSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + JOIN_US + SECTIONS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SECTION_TITLE}</title>
            </Helmet>
            <MasterJoinUsSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + JOIN_OUR}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{JOIN_OUR_TITLE}</title>
            </Helmet>
            <MasterJoinOurGeneratorSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + JOIN_OUR + SECTIONS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SECTION_TITLE}</title>
            </Helmet>
            <MasterJoinOurSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + SHIPMENT_SECTION}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SHIPMENT_SECTION_TITLE}</title>
            </Helmet>
            <MasterShipmentGeneratorSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + SHIPMENT_SECTION + SECTIONS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SECTION_TITLE}</title>
            </Helmet>
            <MasterShipmentSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + NEWSLETTER_SECTION}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{NEWSLETTER_SECTION_TITLE}</title>
            </Helmet>
            <MasterNewsletterGeneratorSections />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + HOMEPAGE + NEWSLETTER_SECTION + SECTIONS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>{SECTION_TITLE}</title>
            </Helmet>
            <MasterNewsletterSections />
          </>
        )}
      />
    </>
  );
}
