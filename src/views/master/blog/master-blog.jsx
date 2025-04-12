import * as Button from 'components/shared/button/button';

import {
  permissionsList,
  statusList,
  withImageList,
} from 'constants/masterBlog';

import { APPROVED } from 'constants/statuses';
import ArtworkVerificationButtons from 'components/artwork/artwork-master-card/artwork-verify-buttons';
import BlogPostModal from 'components/blog/blog-post-modal/blog-post-modal';
import { MasterBlogFilter } from 'components/filters/master-blogFilter';
import { MasterBlogNav } from 'components/nav/sub/masterBlogNav';
import PaginationControlled from 'components/pagination/paginationNumbers';
import React from 'react';
import SinglePostItem from 'components/blog/singlePreviewPost/single-preview-post';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { permissions } from 'constants/permissions';
import styles from 'views/master/master-blog.module.scss';
import { useMasterBlog } from 'hooks/use-master-blog';

export const MasterBlog = () => {
  const {
    open,
    setOpen,
    isDesktop,
    returnInitialState,
    handleSingleDeletePost,
    handleSavePost,
    selectedPost,
    filters,
    handleFilterChange,
    categories,
    pagination,
    handleEditModeChange,
    setPage,
    page,
    posts,
    getPostCategory,
    setSelectedPost,
    Form,
    onStatusButtonClick,
    isAnalyst,
    isAdmin,
    isEditor,
    isSuperAdmin,
    loading,
  } = useMasterBlog();
  const { MASTER, ADMIN, EDITOR } = permissions;

  if (loading) {
    return <Spinner full />;
  }

  return (
    <>
      <MasterBlogNav />
      <div className={styles.blog_wrapper}>
        <BlogPostModal
          open={open}
          handleDeletePost={
            isDesktop ? returnInitialState : handleSingleDeletePost
          }
          handleClose={() => returnInitialState()}
          handleSavePost={handleSavePost}
          post={selectedPost}
          secondButton={isDesktop ? 'Cancel' : 'Delete Post'}
          isAdmin={true}
        />
        <div className={styles.filters_container}>
          <MasterBlogFilter
            name="permission"
            inputs={permissionsList}
            handleFilterChange={handleFilterChange}
            value={filters.permission}
          />
          <MasterBlogFilter
            name="status"
            inputs={statusList}
            handleFilterChange={handleFilterChange}
            value={filters.status}
          />
          <MasterBlogFilter
            name="category"
            inputs={[
              ...categories.map(item => ({
                label: item.name,
                value: item.id,
              })),
              { label: 'All', value: '' },
            ]}
            handleFilterChange={handleFilterChange}
            value={filters.category}
          />
          <MasterBlogFilter
            name="image"
            inputs={withImageList}
            handleFilterChange={handleFilterChange}
            value={filters.image}
          />
        </div>
        {(isAdmin || isSuperAdmin || isEditor) && (
          <Button.Primary
            sm
            className={styles.create}
            onClick={() => setOpen(true)}
          >
            Add Blog By Draint
          </Button.Primary>
        )}
        {pagination && (
          <PaginationControlled
            handler={setPage}
            page={page}
            style={['dark']}
            totalPages={pagination.pageCount}
          />
        )}
        {!!posts.length && (
          <ul className={styles.posts_wrapper}>
            {posts.map(post => (
              <li key={post.uuid}>
                <SinglePostItem
                  post={post}
                  isDesktop={isDesktop}
                  isAdmin={true}
                  handleEditModeChange={() => handleEditModeChange(post)}
                  deleteSinglePostBlogPost={() => handleSingleDeletePost(post)}
                  category={getPostCategory(post.category_id)}
                  isAnalyst={isAnalyst}
                />
                {!isAnalyst && (
                  <div className={styles.post_status_container}>
                    {post.status === APPROVED && (
                      <>
                        {selectedPost?.uuid !== post.uuid ? (
                          <button
                            type="button"
                            onClick={() => setSelectedPost(post)}
                            className={styles.display_form_button}
                          >
                            Add post to category
                          </button>
                        ) : (
                          <Form
                            key={post.uuid}
                            isAdmin={
                              post?.profile?.permission === MASTER ||
                              post?.profile?.new_permission === ADMIN ||
                              post?.profile?.new_permission === EDITOR
                            }
                          />
                        )}
                      </>
                    )}
                    <ArtworkVerificationButtons
                      id={post.uuid}
                      isBlog={true}
                      onVerify={onStatusButtonClick}
                      disabled={false}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
