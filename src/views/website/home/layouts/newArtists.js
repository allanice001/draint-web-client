import '../home.scss';

import { countryName, isoCountry } from 'components/lib';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Flag from 'react-flags';
import { Link } from 'react-router-dom';
import PaginationControlled from 'components/pagination/paginationNumbers';
import React from 'react';
import { checkBackground } from 'services/backGroundService';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';

export default function NewArtists(props) {
  const {
    newArtists,
    totalPages,
    currentPage,
    onPageChanged,
    type,
    onShowMore,
  } = props;
  const totalArtwork = newArtists.length;
  if (totalArtwork === 0) return null;
  return (
    <>
      {newArtists.length > 0 && (
        <div className="card-wrapper-home-new">
          <div className="filtered-header-new">NEW ARTISTS</div>
          <div className="filtered-header-new">
            <PaginationControlled
              totalPages={totalPages}
              page={currentPage}
              handler={onPageChanged}
              type={type}
            />
          </div>
          {newArtists.map(artist => {
            let { username } = artist;
            if (username.includes('/')) {
              const position = username.indexOf('/');
              username = `${username.substr(0, position)}%2F${username.substr(
                position + 1
              )}`;
            }
            return (
              <Card key={`new-artists-${artist.id}`} className="card-home-new">
                <CardActionArea>
                  <Link to={getArtistGalleryURL(username)}>
                    {checkBackground(artist.small_avatar) ? (
                      <img
                        src={artist.small_avatar}
                        className="artist-img-home"
                        alt={artist.username}
                        title={artist.username}
                      />
                    ) : checkBackground(artist.featured_background_url) ? (
                      <img
                        src={artist.featured_background_url}
                        className="artist-img-home"
                        alt={artist.username}
                        title={artist.username}
                      />
                    ) : checkBackground(artist.avatar_url) ? (
                      <img
                        src={artist.avatar_url}
                        className="artist-img-home"
                        alt={artist.username}
                        title={artist.username}
                      />
                    ) : (
                      <div className="artist-img-home" />
                    )}
                  </Link>
                  <div className="card-content">
                    <div className="artists-name-home">
                      {artist.first_name} {artist.last_name}
                    </div>
                    <div className="artists-card-country">
                      {isoCountry(countryName(artist.country)) ? (
                        <Flag
                          country={isoCountry(countryName(artist.country))}
                          format="png"
                          pngSize={24}
                          shiny
                          basePath="./img/flags"
                          className="d-block h-100"
                        />
                      ) : null}
                      {isoCountry(countryName(artist.country)) ? (
                        <div className="artists-country-name">
                          {countryName(artist.country)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </CardActionArea>
              </Card>
            );
          })}
          <div className="filtered-header-new">
            <Button
              style={currentPage === totalPages ? { display: 'none' } : {}}
              variant="outlined"
              onClick={() => onShowMore(currentPage, type)}
            >
              Show more
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
