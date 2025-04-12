import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import { CAT_TIPS, CAT_WORLD, DRAINT } from 'constants/blog';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPROVED } from 'constants/statuses';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtworkPageBreadcrumbs from 'components/artwork/artwork-page-breadcrumbs/artwork-page-breadcrumbs';
import Helmet from 'components/helmet';
import { MemoizedToDisplayArtworks } from './toDisplayArtworks';
import { MemoizedToDisplayPosts } from './to-display-posts';
import { PostContent } from 'components/blog/postsContainer/post-content';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { getBreadcrumbs } from './getBreadcrumbs';
import { getSelectedArtistPosts } from 'redux/artist/actions/artistBlogAction';
import { getUserName } from 'services/global';
import { pageScroll } from 'services/pageScroller';
import { roles } from 'helpers/get-role';
import styles from './SingleBlogPost.module.scss';
import { useParams } from 'react-router-dom';

const Analytic = AnalyticHelper.create();

const SingleBlogPost = () => {
  const dispatch = useDispatch();
  const { username, id: blogId } = useParams();
  const { post, posts } = useSelector(store => store.artist.blog.selectedPost);
  const { loading } = useSelector(store => store.artist.blog);
  const { permission, new_permission } = useSelector(
    store => store.user.account
  );

  const role = roles({ permission, new_permission });
  const rolePostProfile =
    post &&
    roles({
      permission: post.profile.permission,
      new_permission: post.profile.new_permission,
    });

  const isValidPost =
    post?.status === APPROVED ||
    role.isOwner ||
    role.isEditorOrAdmin ||
    role.isAnalyst;

  const isAdminRole =
    rolePostProfile?.isSuperAdmin ||
    rolePostProfile?.isEditor ||
    rolePostProfile?.isAdmin;

  useEffect(() => {
    if (blogId !== post?.uuid) {
      dispatch(getSelectedArtistPosts(blogId));
      pageScroll();
    }
    // eslint-disable-next-line
  }, [blogId]);

  useMemo(() => {
    if (posts) {
      Analytic.createEvent('CustomViewContent', {
        url: window.location.href,
        authorUserName: username,
        category_name: 'Blog',
      });
    }
    // eslint-disable-next-line
  }, [username]);

  function getPublisher() {
    if (post?.category) {
      const { name } = post.category;

      if (name === CAT_TIPS || name === CAT_WORLD || isAdminRole) {
        return DRAINT;
      }

      return getUserName(post.profile);
    }

    if (isAdminRole) {
      return DRAINT;
    }

    return getUserName(post.profile);
  }

  if (loading || !!!post?.uuid) {
    return <Spinner full />;
  }

  return (
    <>
      <Helmet title="Your Gallery | DRAINT™" />
      {isValidPost && (
        <div className={styles.wrapper}>
          {!isAdminRole && (
            <ArtworkPageBreadcrumbs
              list={getBreadcrumbs({
                username,
                title: post.title,
              })}
            />
          )}
          <div className={`container`}>
            <div className={`${styles.content}`}>
              <PostContent
                styles={styles}
                post={post}
                fullName={getPublisher()}
              />
            </div>
            <MemoizedToDisplayPosts
              posts={posts}
              username={username}
              uuid={post.uuid}
            />
            {!isAdminRole && !!post.artworks.length && (
              <MemoizedToDisplayArtworks
                first_name={post.first_name}
                username={username}
                artworks={post.artworks}
                profile={post.profile}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlogPost;
