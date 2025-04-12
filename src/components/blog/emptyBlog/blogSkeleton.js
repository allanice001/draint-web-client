import ArtistBlogPostSkeleton from '../../skeletons/artist-blog-post/artist-blog-post-sk';
import React from 'react';

export const BlogSkeleton = props => (
  <div className={props.skeletonWrapper}>
    {Array.from(new Array(2)).map((item, index) => (
      <ArtistBlogPostSkeleton key={index} />
    ))}
  </div>
);
