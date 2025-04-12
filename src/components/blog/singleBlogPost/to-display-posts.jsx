import { List, Record } from '../../shared/list';
import { PostCard } from '../post-card/post-card';
import React from 'react';
import { getUserName } from 'services/global';
import styles from './SingleBlogPost.module.scss';

const ToDisplayPosts = ({ username, posts, uuid }) => {
  if (!posts.length) {
    return null;
  }

  return (
    <>
      <h3 className="group-title">Related blog posts</h3>
      <List className={styles.list}>
        {posts.map(post => {
          return (
            <Record key={post.uuid}>
              <PostCard
                username={username}
                post={post}
                root_styles={styles}
                fullName={getUserName(post.profile)}
              />
            </Record>
          );
        })}
      </List>
    </>
  );
};

export const MemoizedToDisplayPosts = React.memo(ToDisplayPosts);
