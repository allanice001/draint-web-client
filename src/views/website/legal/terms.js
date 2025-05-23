import './legal.scss';

import React, { useEffect } from 'react';
import { Row } from 'components/lib';
import { pageScroll } from '../../../services/pageScroller';

export function Terms() {
  useEffect(() => {
    pageScroll();
  }, []);

  return (
    <Row className="legal">
      <h1>Terms &amp; Conditions</h1>

      <p>
        The following terms and conditions (this &ldquo;TOS&rdquo;) govern the
        use of the http://draint.art website and all domains, webpages, sub
        domains and subparts therein contained (the &ldquo;WEBSITE&rdquo;). All
        services available through the WEBSITE are provided by Draint GmbH.
        (“Draint”).
      </p>

      <p>
        The WEBSITE and all services (collectively, the &ldquo;SERVICES&rdquo;)
        are offered subject to your acceptance without modification of all of
        the terms and conditions contained herein and all other operating rules,
        policies and procedures that be published from time to time on the
        WEBSITE by by Draint (collectively, &ldquo;THE AGREEMENT&rdquo;).
      </p>

      <p>
        By using or accessing any part of the WEBSITE you agree to become bound
        by all of the TOS of this agreement. If you do not agree to all of the
        TOS contained in this agreement then you may not access the WEBSITE or
        use any of its SERVICES.
      </p>

      <p>
        Draint provides a service for viewing, selling and purchasing original
        works of art and commercially exploiting digital images of works of art
        through our website, accessible at http://draint.art. Payments are
        transacted through Stripe (&ldquo;Facilitated Payment Mode&rdquo;, or
        &ldquo;FPM&rdquo;).
      </p>

      <h2>1. Modification of These Terms</h2>

      <p>
        Draint reserves the right, at its sole discretion, to modify or replace
        any part of this TOS at any time. It is your responsibility to check
        this TOS periodically for changes. Your continued use of or access to
        the WEBSITE following the posting of any changes to this TOS constitutes
        acceptance of those changes. If any change to this TOS is not acceptable
        to you, you must cease accessing the WEBSITE and its SERVICES.
      </p>

      <h2>2. Conduct</h2>
      <h3>2.1 Your use of the SERVICES</h3>

      <p>
        Draint hereby grants you a non-exclusive, non-transferable,
        non-sublicensable right to access and use the SERVICES solely for the
        purposes of viewing, selling and purchasing original works of art, in
        each case in compliance with the TOS.
      </p>

      <p>You must not:</p>

      <ul className="list">
        <li>
          Reverse engineer, disassemble, decompile or otherwise attempt to
          discover the source code or structure of all or any part of the
          SERVICES. Remove or alter any proprietary notices or labels on or in
          the SERVICES or WEBSITE content.
        </li>

        <li>
          Engage in any activity that interferes or disrupts with the SERVICES
          or engage in any fraudulent activity or activity that facilitates
          fraud.
        </li>
      </ul>

      <h3>2.2 Your Registration Obligations</h3>

      <p>By registering an account on the WEBSITE you agree to:</p>

      <p>
        Provide true, accurate, current and complete information about yourself
        as prompted by the WEBSITE registration form (the &ldquo;REGISTRATION
        DATA&rdquo;) and maintain and promptly update the REGISTRATION DATA to
        keep it true, accurate, current and complete.
      </p>

      <h3>2.3 Your Account Security</h3>

      <p>
        By registering an account on the WEBSITE, you are fully responsible for
        maintaining the security and confidentially of your account. You are
        fully responsible for all activities that occur under your account,
        including, without limitation, all actions by sub-users with access your
        account. You agree to immediately notify Draint of any unauthorised
        access to your account. Draint will not be liable for any loss, damage
        or other liability arising from your failure to comply with this section
        of the TOS or from any unauthorised access to or use of your account.
      </p>

      <h2>3. Content</h2>
      <h3>3.1 Your Content</h3>

      <p>
        If you post any links, videos, audio files, photographs, graphics or
        computer software (&ldquo;CONTENT&rdquo;) to the WEBSITE you hereby
        grant Draint a non-exclusive, worldwide, royalty-free, transferable
        sub-licensable right to use, reproduce, adapt, modify, distribute,
        translate, publish your CONTENT, in whole or in part for any purpose
        whatsoever.
      </p>

      <p>
        You are entirely responsible for your CONTENT and any harm resulting
        from your CONTENT. By making your CONTENT available through the
        SERVICES, you agree not to:
      </p>

      <ul className="list">
        <li>
          Upload, post, email, transmit or otherwise make available any CONTENT
          that us unlawful, harmful, threatening, abusive, harassing,
          pornographic, tortuous, defamatory, vulgar, obscene, libellous, racist
          or invasive of another persons privacy
        </li>

        <li>
          Make available any CONTENT that infringes any patent, trademark,
          copyright, trade secret or any other intellectual property or
          proprietary rights of any individual or organisation
        </li>

        <li>
          Upload, post, email, transmit or install any malicious software, such
          as worms, malware, spyware, Torjan horses or other destructive or
          harmful content
        </li>

        <li>
          Interfere or disrupt the SERVICES, services or networks connected to
          the SERVICES
        </li>

        <li>
          Use an account name that misleads your customers or potential
          customers into believing that you are another person or company
        </li>
      </ul>

      <p>
        Draint will not be liable for any loss, damage or harm resulting from
        the posting of your CONTENT. Draint reserves the right to, in it&apos;s
        sole discretion, refuse or remove any content that, in Draint&apos;s
        reasonable opinion, violates any Draint policy or is in any way harmful.
        Draint reserves the right to terminate or deny access to the use of the
        WEBSITE and or SERVICES to any individual or organisation for any reason
        in Draint&apos;s sole discretion.
      </p>

      <h3>3.2 Site Content</h3>

      <p>
        Draint has not reviewed, and cannot review all of the material posted to
        the WEBSITE. Draint does not represent, or imply that it endorses any
        material posted to the WEBSITE. You are responsible for taking the
        necessary precautions to protect yourself and your computer from any
        malicious software, such as worms, malware, spyware, Trojan horses or
        other destructive or harmful content.
      </p>

      <p>
        The WEBSITE may contain content that is unlawful, harmful, threatening,
        abusive, harassing, pornographic, tortuous, defamatory, vulgar, obscene,
        libellous, racist or invasive of another persons privacy as well as
        technical inaccuracies, typographical mistakes and other errors. The
        WEBSITE may also contain material that infringes any patent, trademark,
        copyright, trade secret or any other intellectual property or
        proprietary rights of any individual or organisation.
      </p>

      <p>
        Draint has not reviewed and cannot review material included on third
        party websites which is made available through the websites and webpages
        to which Draint links to. Draint does not have any control over material
        made available on websites other than the WEBSITE.
      </p>

      <p>
        Draint accepts no responsibility for any harm, loss or damage as a
        result of CONTENT posted to the WEBSITE, made available through the
        SERVICES or made available on third party websites other than the
        WEBSITE.
      </p>

      <h3>3.3 Personal Data</h3>

      <p>
        Draint accepts no responsibility for any harm, loss or damage as a
        result of you, or any other user breaching the General Data Protection
        Regulation (GDPR).
      </p>

      <h2>4. Payment</h2>

      <p>
        When using a FPM, users effect the applicable monetary payment
        transaction through the FPM service and are bound by the applicable
        terms of use governing the FPM service.
      </p>

      <p>
        Draint accepts no responsibility for any harm, loss or damage as a
        result of using third party FPM.
      </p>

      <h2>5. Termination</h2>

      <p>
        Draint, in its sole discretion, may terminate access to your account,
        accounts or any part of the SERVICES with or without cause and with or
        without notice, effective immediately. Draint may remove and discard any
        and all of your CONTENT within the SERVICES at any time and for any
        reason or no reason. If you wish to terminate this AGREEMENT, you should
        discontinue to use this WEBSITE.
      </p>

      <p>
        All provisions of this TOS that by their nature should survive
        termination of your right to use the SERVICES shall survive termination,
        including, without limitation, ownership provisions, warranty
        disclaimers, indemnity and limitations of liability.
      </p>

      <h2>6. Service Modifications</h2>

      <p>
        Draint reserves the right at any time to, and from time to time may
        modify, suspend or discontinue, temporarily or permanently, the SERVICES
        or any part thereof the SERVICES for any reason or for no reason with or
        without notice. You agree that Draint shall not be liable to you or to
        any third party for any modification, suspension or discontinuation of
        the SERVICES.
      </p>

      <h2>7. Intellectual Property</h2>

      <p>
        This AGREEMENT does not transfer from Draint to you any Draint or any
        third party intellectual property and all rights and such property will
        remain solely with Draint.
      </p>

      <h2>8. Trademarks</h2>

      <p>
        Draint are registered trademarks of Draint GmbH. Other trademarks,
        service marks, graphics and logos used in connection with the WEBSITE
        may be the trademarks of third parties. Your use of the WEBSITE grants
        you no right or license to reproduce or otherwise use any Draint or
        third-party trademarks.
      </p>

      <h2>9. Disclaimer Of Warranties</h2>

      <p>
        All SERVICES are provided &ldquo;AS IS&rdquo;. Draint hereby disclaims
        all warranties of any kind, express or implied, including, without
        limitation, the warranties of merchantability, fitness for a particular
        purpose and non-infringement. Draint makes any warranty that the WEBSITE
        or SERVICES will be error-free or that access to the SERVICES will be
        continuous or uninterrupted. You obtain content or services through, the
        WEBSITE at your own discretion and risk.
      </p>

      <h2>10. Limitation of Liability</h2>

      <p>
        Draint and it&apos;s suppliers or licensors shall not be liable with
        respect to any subject matter of this AGREEMENT under any circumstances,
        contract, negligence strict liability or other legal theory for:
      </p>

      <ul className="list">
        <li>
          Any special, indirect, incidental or consequential, punitive or
          exemplary damages including, but not limited to, damages for loss of
          profits, goodwill, use, data or other intangible losses
        </li>

        <li>
          The cost of procurement for substitute products or services for the
          interruption or discontinuance of use or loss of or corruption of data
          for any amounts
        </li>

        <li>Any matters beyond Draint&apos;s reasonable control</li>

        <li>Your content or any content of any other users of the SERVICES</li>
      </ul>

      <h2>11. Indemnity</h2>

      <p>
        You agree to defend, indemnify and hold Draint and its affiliates,
        suppliers, contractors and licensors and their respective directors,
        officers, employees and agents and other partners from and against all
        claims and expenses, including attorneys&apos; fees, accounting fees
        arising out of your use of the WEBSTE, including but not limited to your
        violation of this AGREEMENT.
      </p>

      <p>
        Draint reserves the right to modify these terms at any time. Changes
        will be made available on this page.
      </p>
    </Row>
  );
}
