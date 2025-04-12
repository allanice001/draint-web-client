import { G_1, G_2, G_3 } from 'constants/components/artwork-gallery/constants';
import ArtworkGalleryCard from 'components/artwork/artwork-gallery-card/artwork-gallery-card';
import { Grid } from 'components/shared/grid/grid';
import React from 'react';
import UploadIcon from 'components/icons/upload';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import styles from './artwork-gallery.module.scss';
import useTheme from 'hooks/use-theme';

export function ArtworksList({ viewedArtworks, isMaster, isArtist, canEdit }) {
  const { isDesktop, isTablet } = useTheme();

  return (
    <div className={styles.list_wrapper}>
      {viewedArtworks.map(({ label, artworks, buttons }, i) => (
        <div className={styles.group} key={i}>
          {!!label && (
            <h3 className={styles.title}>
              {label} {buttons}
            </h3>
          )}

          <Grid
            columns={isDesktop ? G_3 : isTablet ? G_2 : G_1}
            list={artworks}
            render={card => {
              if (!card.upload) {
                return (
                  <ArtworkGalleryCard
                    url={getArtworkUrl(card.id, card.title, card.username)}
                    {...card}
                    fullArtworkInfo={card}
                    src={card.src}
                    key={card.id}
                    isMaster={isMaster}
                    canEdit={canEdit}
                    isArtist={isArtist}
                  />
                );
              }

              if (!isMaster) {
                return (
                  <button
                    key={card.id}
                    className={styles.uploadButton}
                    type="button"
                    onClick={card.onClick}
                  >
                    <UploadIcon />
                    <span>
                      Click here to <br /> upload new Painting
                    </span>
                  </button>
                );
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
