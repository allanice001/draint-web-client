import { Artwork } from 'models';
import { ArtworkCard } from 'components/artwork/artwork-card/artwork-card';
import { Grid } from 'components/shared/grid/grid';
import React from 'react';
import useTheme from 'hooks/use-theme';

const ToDisplayArtworks = ({ first_name, username, artworks, profile }) => {
  const { isDesktop, isTablet } = useTheme();

  return (
    <>
      <h3 className="group-title">{`${first_name || username}'s artworks`}</h3>
      <Grid
        columns={isDesktop ? 4 : isTablet ? 2 : 1}
        list={artworks
          .map(el =>
            Artwork.create({
              ...el,
              profile,
            })
          )
          .slice(0, 4)}
        render={artwork => <ArtworkCard artwork={artwork} artworkMasterCard />}
      />
    </>
  );
};

export const MemoizedToDisplayArtworks = React.memo(ToDisplayArtworks);
