import { deleteSpacesFromUrl, getFooterBlogDate } from 'services/global';
import { Link } from 'components/link/link';
import React from 'react';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { navMap } from 'constants/components/navbar/nav.helper';
import styles from '../footer.module.scss';
import { useSelector } from 'react-redux';

export function FooterList({ mobile }) {
  const { email: user, is_artist: isArtist } = useSelector(
    store => store.user.account
  );

  const { footer_blogs } = useSelector(store => store.blog) || [];

  function getArtistLinks() {
    if (!user) {
      return [
        navMap.profileOverviewArtist,
        navMap.signUpArtist,
        navMap.whyDraint,
        navMap.missionVision,
        navMap.blog,
        navMap.faq,
      ];
    }

    if (user && !isArtist) {
      return [navMap.whyDraint, navMap.missionVision, navMap.blog, navMap.faq];
    }

    return [
      navMap.profileOverviewArtist,
      navMap.whyDraint,
      navMap.missionVision,
      navMap.blog,
      navMap.faq,
    ];
  }

  function getBlogsLink() {
    const links = [];

    for (let i = 0; i < footer_blogs?.length; i++) {
      links.push({
        label: footer_blogs[i].title,
        subtitle: getFooterBlogDate(footer_blogs[i].created_at),
        url: getBlogUrl(
          footer_blogs[i].uuid,
          deleteSpacesFromUrl(footer_blogs[i].title),
          footer_blogs[i].profile.username
        ),
      });
    }

    return links;
  }

  function getCollectorsLinks() {
    if (!user) {
      return [
        navMap.tradeYourPaintings,
        navMap.signUpCollector,
        navMap.searchArtists,
        navMap.searchPaintings,
      ];
    }

    if (user && isArtist) {
      return [
        navMap.tradeYourPaintings,
        navMap.searchArtists,
        navMap.searchPaintings,
      ];
    }

    return [
      navMap.profileOverviewCollector,
      navMap.tradeYourPaintings,
      navMap.searchArtists,
      navMap.searchPaintings,
    ];
  }

  function List({ list, title }) {
    return (
      <div className={styles.list_wrapper}>
        <span className={styles.list_title}>{title}</span>
        <ul className={styles.list}>
          {list?.map(({ url, label, subtitle, Icon, social }, i) => (
            <Item
              url={url}
              label={label}
              subtitle={subtitle}
              Icon={Icon}
              social={social}
              key={i}
            />
          ))}
        </ul>
      </div>
    );
  }

  function Item({ url, label, subtitle, Icon, social }) {
    return !!Icon && !!social ? (
      <li>
        <a className={`${styles.link} ${styles.link_a_link}`} href={social}>
          <Icon param={16} />
          <span>{label}</span>
        </a>
      </li>
    ) : !!subtitle ? (
      <li>
        <Link className={styles.link} url={url}>
          <span className={styles.label}>{label}</span>

          <span className={styles.subtitle}>{subtitle}</span>
        </Link>
      </li>
    ) : (
      <li>
        <Link className={styles.link} url={url}>
          {label}
        </Link>
      </li>
    );
  }

  return (
    <>
      {!mobile ? (
        <>
          <List title="Social" list={[navMap.instagram, navMap.facebook]} />
          <List title="Artists" list={getArtistLinks()} />
          <List title="Collectors" list={getCollectorsLinks()} />
          <List title="Blog" list={getBlogsLink()} />
          <List
            title="Legal"
            list={[
              navMap.Shipping,
              navMap.termsConditions,
              navMap.privacyPolicy,
              navMap.imprint,
              navMap.legals,
              navMap.contact,
            ]}
          />
        </>
      ) : (
        <>
          <div>
            <List title="Social" list={[navMap.instagram, navMap.facebook]} />
            <List title="Artists" list={getArtistLinks()} />
            <List
              title="Legal"
              list={[
                navMap.Shipping,
                navMap.termsConditions,
                navMap.privacyPolicy,
              ]}
            />
          </div>
          <div>
            <List title="Collectors" list={getCollectorsLinks()} />
            <List title="Blog" list={getBlogsLink()} />
            <List list={[navMap.imprint, navMap.legals, navMap.contact]} />
          </div>
        </>
      )}
    </>
  );
}
