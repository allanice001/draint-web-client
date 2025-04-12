import React, { useMemo } from 'react';

import { BlogPageCategoryPost } from './blog-page-category-post';
import { List } from 'components/shared/list';
import { MY_ATELIER_TITLE } from 'constants/atelier';
import { Spinner } from 'components/lib';
import { blogTabs } from 'constants/blog';
import { selectCategory } from 'services/blogService';
import styles from './blog-page-category-posts.module.scss';

export const BlogPageCategoryPosts = ({
  posts,
  categories,
  defaultBlogImage,
  activeCategory,
  loading,
}) => {
  const view = useMemo(() => {
    if (!categories) {
      return [];
    }

    if (activeCategory && activeCategory !== blogTabs.MY_ATELIER) {
      const category = categories.find(item => item.key === activeCategory);
      const activeCategoryName = selectCategory(
        activeCategory,
        '-'
      ).toLowerCase();

      return [{ ...category, posts: posts[activeCategoryName] || [] }];
    }

    if (activeCategory === blogTabs.MY_ATELIER) {
      return [
        { title: MY_ATELIER_TITLE, posts: posts[blogTabs.MY_ATELIER] || [] },
      ];
    }

    return categories.map(category => {
      // Remove My Atelier category from Show All tab
      if (category.key === blogTabs.MY_ATELIER) {
        return { posts: [] };
      }

      const currentCategory = selectCategory(category.name, ' ').toLowerCase();

      return { ...category, posts: posts[currentCategory] || [] };
    });
  }, [activeCategory, categories, posts]);

  if (view.every(category => !category.posts.length)) {
    return <h3 className={styles.notFound}>Sorry, no results found</h3>;
  }

  return view.map(category => {
    if (!category?.posts.length) {
      return null;
    }

    return (
      <div className={styles.root} key={category.key}>
        <h2 className={styles.title}>{category.name}</h2>
        <List className={styles.list}>
          {loading && category.title === MY_ATELIER_TITLE ? (
            <Spinner full />
          ) : (
            category.posts.map(post => (
              <BlogPageCategoryPost
                post={post}
                category={category}
                defaultBlogImage={defaultBlogImage}
              />
            ))
          )}
        </List>
      </div>
    );
  });
};
