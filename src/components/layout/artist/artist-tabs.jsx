import * as Button from 'components/shared/button';

import { List, Record } from 'components/shared/list';

import ArtistAboutMe from 'components/artist/artist-about-me/artist-about-me';
import ArtistInstagramMedia from 'views/website/artists/artistTabs/artistInstagramFeed';
import ArtworkGallery from 'components/artwork/artwork-gallery/atrwork-gallery';
import AtelierIcon from 'components/icons/atelier';
import { AtelierPage } from 'views/atelier/atelier-page/atelier-page';
import { Blog } from 'components/blog/blog';
import BlogIcon from 'components/icons/blog';
import ContactTool from 'components/layout/dashboard/contact-tool/contact-tool';
import DownloadIcon from 'components/icons/download';
import GalleryIcon from 'components/icons/shop-my-paintings';
import InstagramIcon from 'components/icons/instagram';
import { Link } from 'react-router-dom';
import MailingIcon from 'components/icons/send';
import MyVitaIcon from 'components/icons/person-filled';
import Plans from '../../pricing/plans';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { profileTabs } from 'constants/routes/artist-profile';
import styles from './artist.module.scss';
import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useRouter } from 'routers/hooks';

const Tabs = ({ list, currentTab }) => {
  const content = list.map(({ name, path, Icon }) => (
    <Record key={name}>
      <Link
        className={cx(styles.tab, {
          [styles.active]: path === currentTab,
        })}
        to={path}
        active={currentTab}
      >
        {!!Icon && <Icon className={styles.icon} />}
        <span className={styles.text}>{name}</span>
      </Link>
    </Record>
  ));

  return (
    <List className={styles.list} horizontal>
      {content}
    </List>
  );
};

export const ArtistPageTabs = ({
  hasPermission,
  username,
  canEdit,
  downloadDisabled,
  onDownload,
  isMaster,
  isOwner,
}) => {
  const {
    params: { tab: currentTab },
  } = useRouteMatch();
  const { navigate } = useRouter();

  let tabs = useMemo(
    () => [
      {
        name: 'Shop my paintings',
        path: profileTabs.PAINTINGS,
        Item: ArtworkGallery,
        Icon: GalleryIcon,
      },
      {
        name: 'My Vita',
        path: profileTabs.ABOUT,
        Item: ArtistAboutMe,
        Icon: MyVitaIcon,
      },
      {
        name: 'Mailing',
        path: profileTabs.MAILING,
        Item: ContactTool,
        Icon: MailingIcon,
      },
      {
        name: 'Instagram',
        path: profileTabs.INSTAGRAM,
        Item: ArtistInstagramMedia,
        Icon: InstagramIcon,
      },
      {
        name: 'My Blog',
        path: profileTabs.BLOG,
        Item: hasPermission ? Plans : Blog,
        Icon: BlogIcon,
      },
      {
        name: 'My Atelier',
        path: profileTabs.ATELIER,
        Item: AtelierPage,
        Icon: AtelierIcon,
      },
    ],
    [hasPermission]
  );

  if (!isOwner) {
    tabs = tabs.filter(({ path }) => path !== profileTabs.MAILING);
  }

  const tab = tabs.find(el => el.path === currentTab);

  if (!tab) {
    navigate(getArtistGalleryURL(username));
    return null;
  }

  const { Item } = tab;

  return (
    <>
      <div className={styles.tabs}>
        <Tabs list={tabs} currentTab={currentTab} />
        {canEdit && (
          <Button.Link
            className={styles.buttonThumbnail}
            type={Button.Type.Default}
            onClick={onDownload}
            disabled={downloadDisabled}
            icon={<DownloadIcon width="24" height="24" />}
          >
            Profile thumbnail
          </Button.Link>
        )}
      </div>
      <div className="children-container">
        <Item
          isMaster={isMaster}
          isOwner={isOwner}
          canEdit={canEdit}
          username={username}
        />
      </div>
    </>
  );
};
