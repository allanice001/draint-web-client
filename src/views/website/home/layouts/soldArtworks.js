import './style/artworksContainer.scss';

import { countryName, isoCountry } from 'components/lib';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Flag from 'react-flags';
import { Link } from 'react-router-dom';
import React from 'react';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';

export default function ArtworksSold(props) {
  const { soldArtworks } = props;
  const totalArtwork = soldArtworks.length;
  if (totalArtwork === 0) return null;
  return (
    <>
      <div className="filtered-header-sale">ARTWORKS RECENTLY SOLD</div>
      <div className="artworks-wrapper-container-home">
        {soldArtworks.map(artwork => (
          <Card key={`sold-artowrks-${artwork.id}`} className="card">
            <CardActionArea>
              <Link
                to={getArtworkUrl(artwork.id, artwork.title, artwork.username)}
              >
                <img
                  src={artwork.primary_image}
                  className="artworks-img"
                  alt={artwork.title}
                  title={artwork.title}
                />
              </Link>
              <CardContent>
                <div className="artist-card">
                  <div className="artist-name">{artwork.title}</div>
                  <a
                    alt="artist"
                    href={getArtistGalleryURL(artwork.username)}
                    className="name-link"
                  >
                    <div className="hovered artist-card-body ">
                      {' '}
                      by {artwork.first_name} {artwork.last_name}
                    </div>
                  </a>
                  <br />
                  {artwork.width && artwork.height ? (
                    <div className="artist-card-body">
                      Size: {artwork.width}x{artwork.height}
                    </div>
                  ) : (
                    <br />
                  )}
                  <div className="artist-card-country">
                    {isoCountry(countryName(artwork.country)) ? (
                      <Flag
                        country={isoCountry(countryName(artwork.country))}
                        format="png"
                        pngSize={24}
                        shiny
                        basePath="./img/flags"
                        className="d-block h-100"
                      />
                    ) : (
                      <div className="empty-flag" />
                    )}
                    {isoCountry(countryName(artwork.country)) ? (
                      <div className="artworks-country-name">{` ${countryName(
                        artwork.country
                      )}`}</div>
                    ) : null}
                  </div>
                  {artwork.price ? (
                    <div>
                      <div className="artist-card-price ">€{artwork.price}</div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </>
  );
}
