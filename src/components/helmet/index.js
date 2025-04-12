import Helmet from 'react-helmet';
import React from 'react';
import { metadata } from 'constants/meta-tags/default-meta-tags';

export default function MetaHelmet({
  title = metadata.title,
  keywords = metadata.keywords,
  type = metadata.type,
  description = metadata.description,
  url = metadata.URL,
  script,
}) {
  const metaTitle = title + metadata.titlePostfix;

  return (
    <Helmet
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: metaTitle },
        { property: 'og:description', content: description },
        { property: 'og:type', content: type },
        {
          property: 'og:image',
          content: metadata.imageUrl,
        },
        { property: 'og:url', content: url },
      ]}
      script={script}
      title={metaTitle}
    />
  );
}
