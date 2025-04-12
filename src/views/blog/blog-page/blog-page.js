import React, { useEffect } from 'react';

import { BlogPageCategoryPosts } from '../blog-page-category-posts/blog-page-category-posts';
import { BlogPageMainPost } from '../blog-page-main-post/blog-page-main-post';
import { BlogPagePopularList } from '../blog-page-popular-list/blog-page-popular-list';
import { BlogPageTabs } from '../blog-page-tabs/blog-page-tabs';
import { BlogPageTitle } from '../blog-page-title/blog-page-title';
import { BlogSearch } from '../blog-search/blog-search';
import { Container } from 'components/shared/container/container';
import { DRAINT_NAME } from 'constants/global';
import Helmet from 'components/helmet';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import cx from 'classnames';
import { permissions } from 'constants/permissions';
import staticUrls from 'constants/images/static-urls';
import styles from './blog-page.module.scss';
import { useBlog } from 'hooks/use-blog';
import { useScroll } from 'hooks/use-scroll';

export const BlogPage = () => {
  const { blog, page, setPage, activeCategory, onSortChange } = useBlog();
  const { myRef, scrollToStart } = useScroll();
  const {
    community,
    tips,
    world,
    atelier,
    main,
    popular,
    categories,
    pagination,
    loading,
  } = blog;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet />
      <Container>
        <div className={styles.root}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.title}>
                <BlogPageTitle />
              </div>
              {main && (
                <BlogPageMainPost
                  src={main.primary_image}
                  title={main.title}
                  description={main.content}
                  postId={main.uuid}
                  username={
                    main.profile.permission !== permissions.MASTER
                      ? main.profile.username
                      : DRAINT_NAME
                  }
                />
              )}
            </div>
            {popular && (
              <div className={cx(styles.col, styles.popular)}>
                <BlogPagePopularList list={popular} />
              </div>
            )}
          </div>
          {categories && (
            <div className={styles.tabs} ref={myRef}>
              <BlogPageTabs
                categories={categories}
                onSortChange={onSortChange}
                activeCategory={activeCategory}
                setPage={setPage}
              />
            </div>
          )}

          <BlogSearch currentPage={page} />

          <div className={styles.content}>
            <BlogPageCategoryPosts
              categories={categories}
              posts={{ atelier, community, tips, world }}
              activeCategory={activeCategory}
              defaultBlogImage={staticUrls.image.defaultPost}
              loading={loading}
            />
          </div>
          {activeCategory && pagination.pageCount > 1 && (
            <div className={styles.pagination_container}>
              <Pagination
                page={page}
                maxCount={pagination.rowCount}
                pages={pagination.pageCount}
                setPage={pages => {
                  scrollToStart(myRef.current);
                  setPage(pages);
                }}
                count={pagination.pageSize}
                countForm={true}
                type="blog"
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
