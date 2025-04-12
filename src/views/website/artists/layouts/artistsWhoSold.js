import { countryName, isoCountry } from 'components/lib';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Flag from 'react-flags';
import { Link } from 'react-router-dom';
import React from 'react';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';

export default function ArtistsWhoSold(props) {
  const checkBackground = image => {
    if (!image) return false;
    const avatar = image.includes('user_theme');
    return avatar || image;
  };

  const { currentSeller } = props;

  return (
    <div>
      <div className="card-wrapper">
        {currentSeller.slice(0, 16).map(artist => (
          <Card key={artist.artist_id} className="card">
            <CardActionArea>
              <Link to={getArtistGalleryURL(artist.username)}>
                {checkBackground(artist.featured_background_url) ? (
                  <img
                    alt={artist.username}
                    className="artist-img"
                    src={artist.featured_background_url}
                    title={artist.username}
                  />
                ) : checkBackground(artist.avatar_url) ? (
                  <img
                    alt={artist.username}
                    className="artist-img"
                    src={artist.avatar_url}
                    title={artist.username}
                  />
                ) : (
                  <div className="artist-img" />
                )}
              </Link>
              <CardContent>
                <div className="artists-name">
                  {artist.first_name} {artist.last_name}
                </div>
                <div>
                  {isoCountry(countryName(artist.locations.country)) ? (
                    <Flag
                      country={isoCountry(
                        countryName(artist.locations.country)
                      )}
                      format="png"
                      pngSize={32}
                      shiny
                      basePath="./img/flags"
                      className="d-block h-100"
                    />
                  ) : (
                    <div className="empty-flag" />
                  )}
                  {isoCountry(countryName(artist.locations.country)) ? (
                    <div className="artists-country-name">
                      {countryName(artist.locations.country)}
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
