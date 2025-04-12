import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from 'components/basic-modal/welcome-modal.module.scss';

export function BlockInfo() {
  return (
    <div className={styles.info}>
      <div className={styles.info__col}>
        <p>
          We never promise you to sell every single artwork you put up on here,
          because we are not like all these galleries out there. We want YOU to
          take action and to find your own customers. Don’t be lazy and think
          creating the artwork is the online thing needed to be successful.
          Create one artwork and sell it first, before starting with the second
          one!
        </p>
        <div className={styles.img}>
          <img alt="" src={staticUrls.image.addArtworkToProfile} />
        </div>
      </div>
      <div className={styles.info__col}>
        <p>
          Therefore, we give you all tools at hand. Upload your artworks with
          love and detailed descriptions, set up your „About-Page“, show your
          Vita, link your Instagram Account Feed, create an own Blog and fill it
          with life by creating daily blog posts about work being in progress,
          ideas and visions or upcoming events you participate in. Because we
          all know, <b>content is king.</b>
        </p>
        <p>
          Whenever an artwork gets re-sold between two collectors, we share our
          margin with you. This means you can earn multiple times with the same
          artwork even in 30 years from now.
        </p>
        <p>
          Lastly, with our contact tool, you can create contacts and use our
          newsletter tool to reach out to them. Become a successful advertiser
          of your own Artist Band. Ultimately Draint is a trading page for Art.
        </p>
        <p>
          Let’s get started!
          <br />
          Happy to have you with us.
        </p>
      </div>
    </div>
  );
}
