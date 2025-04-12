import './legal.scss';

import React, { useEffect } from 'react';
import { Row } from 'components/lib';
import { pageScroll } from 'services/pageScroller';

export function Privacy() {
  useEffect(() => {
    pageScroll();
  }, []);

  return (
    <Row className="legal">
      <h1>This Privacy Notice was last modified on 25th September 2018.</h1>

      <p>
        Draint (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;)
        operates http://draint.art (the “SERVICE”).
      </p>

      <p>
        This document describes the information that we collect about you, how
        it is used and shared, and your rights regarding it.
      </p>

      <p>
        We want you to know that when you use our SERVICE you can trust us with
        your information. We are determined to do nothing that would infringe
        your rights or undermine your trust. This Privacy Statement describes
        the information we collect about you, how it is used and shared, and
        your rights regarding it.
      </p>

      <h2>Data Collection</h2>

      <p>
        All the information that we hold about you is provided to us by yourself
        when you use our SERVICE. We will tell you why we need the information
        and how we will use it.
      </p>

      <h2>Our Lawful Basis for processing your information</h2>

      <p>
        The General Data Protection Regulation (GDPR) requires all organisations
        that process personal data to have a Lawful Basis for doing so.
      </p>

      <p>
        Our Lawful Basis is: performance of a contract to deliver our SERVICE to
        you and our Legitimate Interests are where you are a customer of our
        SERVICE; processing for direct marketing purposes, or to prevent fraud;
        and processing necessary to ensure network and information security,
        including preventing unauthorised access;
      </p>

      <p>
        <strong>We use your information to:</strong>
      </p>

      <ul className="list">
        <li>Provide you with access to our Service</li>
        <li>Process payments</li>
        <li>Direct your enquiries to the appropriate customer support staff</li>
        <li>Investigate and address your concerns</li>
        <li>
          Communicate with you about products, services, promotions, studies,
          surveys, news and updates relating to our service
        </li>
        <li>
          Process promotions/competitions, including prizes, and send you
          information about our services
        </li>
        <li>
          Investigate or address legal proceedings relating to your use of our
          services/products, or as otherwise allowed by applicable law
        </li>
      </ul>

      <p>
        Where any part of our processing includes automated decision-making, we
        ensure that the proposed decisions are reviewed by a member of staff
        before being applied. You will always be able to get an explanation for
        the decision and to challenge it if you are unhappy with it
      </p>

      <p>
        We collect and process both personal data and special categories of
        personal data as defined in the GDPR.
      </p>

      <p>
        <strong>This includes:</strong>
      </p>

      <ul className="list">
        <li>First Name</li>
        <li>Last Name</li>
        <li>Email</li>
      </ul>

      <p>
        <strong>We may share your personal data with:</strong>
      </p>

      <ul className="list">
        <li>Our payment processor for processing card payments</li>
        <li>
          Our legal advisors in the event of a dispute or other legal matter
        </li>
        <li>
          Law enforcement officials, government authorities, or other third
          parties to meet our legal obligations
        </li>
        <li>Any other party where we ask you and you consent to the sharing</li>
        <li>Transfers to third countries and international organisations</li>
      </ul>

      <p>
        We transfer personal data to the following third countries or
        international organisations using the identified safeguards because we
        rely on third-party services to deliver our Service.
      </p>

      <ul className="list">
        <li>Stripe (USA)</li>
        <li>Mailgun (USA & EU)</li>
        <li>Google Analytics (USA)</li>
      </ul>

      <p>
        We have satisfied ourselves that such transferred data is fully
        protected and safeguarded as required by the General Data Protection
        Regulation.
      </p>

      <p>
        We retain your personal data while you remain a customer, unless you ask
        us to delete it. Our Retention and Disposal Policy (copy available on
        request) details how long we hold data for and how we dispose of it when
        it no longer needs to be held. We will delete or anonymise your
        information at your request unless:
      </p>

      <ul className="list">
        <li>There is an unresolved issue, such as claim or dispute</li>
        <li>We are legally required to or</li>
        <li>
          There are overriding legitimate business interests, including but not
          limited to fraud prevention and protecting customers&apos;safety and
          security
        </li>
      </ul>

      <h2>Your Rights</h2>

      <p>
        The General Data Protection Regulation gives you specific rights around
        your personal data. For example, you have to be informed about the
        information we hold and what we use it for, you can ask for a copy of
        the personal information we hold about you, you can ask us to correct
        any inaccuracies with the personal data we hold, you can ask us to stop
        sending you emails, or in some circumstances ask us to stop processing
        your details.
      </p>

      <h2>Accessing and Correcting Your Information</h2>

      <p>
        You may request access to, correction of, or a copy of your information
        by contacting us at{' '}
        <a href="mailto:hello@draintart.gallery" alt="mail">
          hello@draintart.gallery
        </a>
      </p>

      <h2>Marketing Opt-Outs</h2>

      <p>
        You may opt out of receiving emails and other messages from us by
        following the instructions in those messages.
      </p>

      <h2>Cookies</h2>

      <p>
        Cookies are small text files that are stored on your browser or device
        by websites, apps, online media, and advertisements.
      </p>

      <p>
        <strong>We use cookies to:</strong>
      </p>

      <ul className="list">
        <li>Validate users</li>
        <li>Remember user preferences and settings</li>
        <li>Determine frequency of accessing our content</li>
        <li>Measure the effectiveness of advertising campaigns</li>
        <li>Analyse site visits and trends</li>
      </ul>

      <p>
        We reserve the right to update our Privacy Statement at any time. Any
        changes will be posted to this page.
      </p>
    </Row>
  );
}
