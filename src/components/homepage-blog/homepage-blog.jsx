import { Blog } from 'models/home-blog';
import { BlogPostSlider } from './blog-posts-slider';
import BlogPostsCard from './blog-posts-card';
import BlogPostsList from './blog-posts-list';
import { HOMEPAGE_BLOG_CONTENT } from 'constants/components/home-page';
import { Link } from 'react-router-dom';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './homepage-blog.module.scss';
import { useSelector } from 'react-redux';

const HomepageBlog = () => {
  const lastBlogPosts = useSelector(state => state.home.blog.lastBlogPosts);
  const sliderBlogPosts = useSelector(state => state.home.blog.sliderBlogPosts);

  if (!lastBlogPosts.length && !sliderBlogPosts.length) return null;

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.list_wrapper}>
          <h2 className={styles.blog_title}>{HOMEPAGE_BLOG_CONTENT.title}</h2>
          <BlogPostsList list={lastBlogPosts} />
          <div className={styles.link_wrapper}>
            <Link
              className={styles.button_link}
              to={HOMEPAGE_BLOG_CONTENT.button_link}
            >
              {HOMEPAGE_BLOG_CONTENT.button_name}
            </Link>
          </div>
        </div>
        <div className={styles.slider_sections}>
          <div
            className={styles.slider_wrapper}
            style={{
              backgroundImage: `url(${staticUrls.screen.blogBG})`,
              backgroundSize: 'cover',
            }}
          >
            <BlogPostSlider
              list={sliderBlogPosts}
              Model={Blog}
              item={(post, i) => (
                <div key={i}>
                  <BlogPostsCard post={post} index={post.uuid} />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageBlog;
