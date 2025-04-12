import * as Button from 'components/shared/button';
import { CANT_UPLOAD_NOTIFICATION, CREATE, DELETE, EDIT } from 'constants/blog';
import React, { useEffect, useRef, useState } from 'react';
import {
  deleteSinglePostBlogPost,
  getCurrentArtistPosts,
  saveBlogPost,
  updateBlogPost,
} from 'redux/artist/actions/artistBlogAction';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { BASIC_PLAN_NAME } from 'constants/components/pricing';
import BlogPostModal from './blog-post-modal/blog-post-modal';
import { EmptyBlogProfile } from './emptyBlog';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import { SUBSCRIPTIONS_DASHBOARD } from 'constants/routes/userModule/dashboard';
import SinglePostItem from './singlePreviewPost/single-preview-post';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { WARNING } from 'constants/components/message-statuses';
import classnames from 'classnames';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { permissions } from 'constants/permissions';
import styles from './blog.module.scss';
import { useHistory } from 'react-router-dom';
import useTheme from 'hooks/use-theme';

const Analytics = AnalyticHelper.create();

const handleAnalyticEvents = (method = DELETE) => {
  const analyticEvent = {
    delete: 'BlogPostWasDeleted',
    create: 'BlogPostWasCreated',
    edit: 'BlogPostWasEdited',
  };
  Analytics.createEvent(analyticEvent[method]);
};

export const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isDesktop } = useTheme();

  const { profile_id, planName, permission } = useSelector(
    store => store.user.account
  );
  const { account: artist } = useSelector(store => store.artist.currentArtist);
  const { posts, pagination, loading } = useSelector(
    store => store.artist.blog
  );

  const ownPosts = profile_id === artist.profile_id;
  const hasLimit = planName === BASIC_PLAN_NAME && posts.length === 3;
  const isAdmin = permission === permissions.MASTER;

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState(null);
  const [page, setPage] = useState(1);

  const blogRef = useRef();
  const scrollToStart = el => {
    el.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
  };

  useEffect(() => {
    Analytics.createEvent('PageView', { url: '/blog' });
    dispatch(
      getCurrentArtistPosts(artist.profile_id, {
        pageSize: 6,
        page: page,
        all: isAdmin || ownPosts,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setPage(pagination?.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, pagination]);

  const returnInitialState = () => {
    setOpen(false);
    setPost(null);
    setEditMode(false);
  };

  const handleEditModeChange = (event, post) => {
    event.stopPropagation();
    event.preventDefault();

    setPost(post);
    setOpen(true);
    setEditMode(true);
  };

  const handleSavePost = Data => {
    if (!editMode) {
      dispatch(saveBlogPost(profile_id, Data));
      handleAnalyticEvents(CREATE);
      setOpen(false);
    }

    if (editMode) {
      dispatch(updateBlogPost(post.uuid, Data));
      handleAnalyticEvents(EDIT);
    }

    returnInitialState();
  };

  const handleSingleDeletePost = (event, post) => {
    event.stopPropagation();
    event.preventDefault();

    dispatch(deleteSinglePostBlogPost(post.uuid));
    handleAnalyticEvents();
    returnInitialState();

    if (!posts.length) {
      setPage(page === 1 ? 2 : 1);
    }
  };

  const handleCreateWithLimit = () => {
    dispatch(displayMessage(CANT_UPLOAD_NOTIFICATION, WARNING));

    return history.push(SUBSCRIPTIONS_DASHBOARD);
  };

  if (loading) {
    return <Spinner full />;
  }

  return (
    <div className={styles.blog} ref={blogRef}>
      <div className={styles.blog_title_wrapper}>
        <div className={styles.blog_title}>My Blog</div>

        {ownPosts && !isAdmin && (
          <Button.Primary
            sm
            className={styles.create}
            onClick={!hasLimit ? () => setOpen(true) : handleCreateWithLimit}
          >
            Add New Blog
          </Button.Primary>
        )}
      </div>

      <BlogPostModal
        open={open}
        handleDeletePost={handleSingleDeletePost}
        handleClose={() => returnInitialState()}
        handleSavePost={handleSavePost}
        post={post}
        handleAnalyticEvents={handleAnalyticEvents}
      />

      {!posts.length && (
        <EmptyBlogProfile
          imgClass={classnames(styles.no_post__img, {
            [styles.no_post__img__grey]: !ownPosts,
          })}
          containerClass={styles.no_post}
          postTitleClass={styles.no_post__title}
          isOwnBlogPost={ownPosts}
        />
      )}

      {!!posts.length && (
        <div className={styles.postsWrapper}>
          {posts.map(post => {
            return (
              <SinglePostItem
                isDesktop={isDesktop}
                isAdmin={isAdmin}
                post={post}
                key={post.uuid}
                handleEditModeChange={e => handleEditModeChange(e, post)}
                deleteSinglePostBlogPost={e => handleSingleDeletePost(e, post)}
              />
            );
          })}
        </div>
      )}

      {!!posts.length && pagination.pageCount > 1 && (
        <div className={styles.pagination_container}>
          <Pagination
            page={page}
            maxCount={pagination.rowCount}
            pages={pagination.pageCount}
            setPage={pages => {
              if (!isDesktop) scrollToStart(blogRef.current);
              setPage(pages);
            }}
            count={pagination.pageSize}
            countForm={true}
            type="blogs"
          />
        </div>
      )}
    </div>
  );
};
