import './style/continents.scss';

import { countryName, isoCountry } from 'components/lib';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Flag from 'react-flags';
import { Link } from 'react-router-dom';
import PaginationControlled from 'components/pagination/paginationNumbers';
import React from 'react';
import { checkBackground } from 'services/backGroundService';

export default function EuropeanContinent(props) {
  const {
    europe,
    totalPages,
    currentPage,
    onPageChanged,
    type,
    onShowMore,
  } = props;
  const totalArtwork = europe.length;
  if (totalArtwork === 0) return null;
  return (
    <>
      {europe.length && (
        <div className="card-wrapper-continents">
          <div className="filtered-header-new">EUROPEAN CONTINENT</div>
          <div className="filtered-header-new">
            <PaginationControlled
              totalPages={totalPages}
              page={currentPage}
              handler={onPageChanged}
              type={type}
            />
          </div>
          {europe.map(artist => (
            <Card key={`europian-artist-${artist.id}`} className="card-home">
              <CardActionArea>
                <Link
                  to={
                    artist.username
                      ? `/artist/${artist.username}/artist`
                      : `/artist/id/${artist.account_id}/artist`
                  }
                >
                  {checkBackground(artist.small_avatar) ? (
                    <img
                      alt={artist.username}
                      className="artist-img-home"
                      src={artist.small_avatar}
                      title={artist.username}
                    />
                  ) : checkBackground(artist.featured_background_url) ? (
                    <img
                      alt={artist.username}
                      className="artist-img-home"
                      src={artist.featured_background_url}
                      title={artist.username}
                    />
                  ) : checkBackground(artist.avatar_url) ? (
                    <img
                      alt={artist.username}
                      className="artist-img-home"
                      src={artist.avatar_url}
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
                    ) : (
                      <div className="empty-flag-home" />
                    )}
                    {isoCountry(countryName(artist.country)) ? (
                      <div className="artists-country-name">
                        {countryName(artist.country)}
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardActionArea>
            </Card>
          ))}
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
