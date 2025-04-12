import React from 'react';
import staticUrls from 'constants/images/static-urls';

export const EmptyBlogProfile = props => {
  const { imgClass, containerClass, postTitleClass, isOwnBlogPost } = props;

  return (
    <div className={containerClass}>
      <img
        alt="No posts"
        className={imgClass}
        src={staticUrls.image.manageBilling}
        title="No posts"
      />
      {isOwnBlogPost && <h2 className={postTitleClass}> No blog posts yet </h2>}
    </div>
  );
};
