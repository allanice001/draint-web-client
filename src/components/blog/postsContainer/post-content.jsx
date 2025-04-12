import { BLOG } from 'constants/routes/userModule/gallery';
import Helmet from 'components/helmet';
import { Image } from 'components/image/image';
import { KEYWORD } from 'constants/blog';
import Parse from 'react-html-parser';
import React from 'react';
import { Tag } from 'components/shared/tag/tag';
import cx from 'classnames';
import { getFormattedDate } from 'services/global';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import { useHistory } from 'react-router';

export const PostContent = ({ styles, post, fullName }) => {
  const history = useHistory();

  const onTagClick = keyword => {
    history.push(`${BLOG}?${KEYWORD}=${keyword}`);
  };

  return (
    <>
      <Helmet
        title={post.title}
        description={post.summary}
        keywords={post.keywords?.map(kw => kw.name)}
      />
      <article className={styles.content_wrap}>
        <div className={styles.title_wrap}>
          <h1 className={styles.title}>{post.title}</h1>
          <span className={styles.sub_title}>
            {fullName && `by ${fullName},`} {getFormattedDate(post.created_at)}
          </span>
        </div>

        <section className={cx('ql-editor', styles.editor)}>
          {post.small_image && (
            <div className={styles.post_img_wrap}>
              <Image
                srcSet={post.small_image}
                defaultSrc={staticUrls.image.defaultPost}
                sizes={imageSizes.LG}
                alt="post featured"
              />
            </div>
          )}
          <div className={styles.keywordsWrapper}>
            {post.keywords?.map(keyword => (
              <Tag onClick={() => onTagClick(keyword)}>{keyword}</Tag>
            ))}
          </div>
          <div className={styles.ql_editor_content}>{Parse(post.content)}</div>
        </section>
      </article>
    </>
  );
};
