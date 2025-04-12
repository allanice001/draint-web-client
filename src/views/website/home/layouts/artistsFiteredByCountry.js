import './style/continents.scss';

import { countryName, isoCountry } from 'components/lib';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Flag from 'react-flags';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import PaginationControlled from 'components/pagination/paginationNumbers';
import React from 'react';
import Select from '@material-ui/core/Select';
import { checkBackground } from 'services/backGroundService';

export default function ArtistsFilteredByCountry(props) {
  const {
    countries,
    country,
    artistsByCountries,
    handleSelectCounty,
    totalPages,
    currentPage,
    onPageChanged,
    type,
    onShowMore,
  } = props;
  const totalArtwork = artistsByCountries.length;
  if (totalArtwork === 0) return null;
  return (
    <>
      <div className="country-filtered-wrapper">
        <div className="filtered-header">FILTERED BY COUNTRY</div>
        <div className="filtered-header">
          <PaginationControlled
            totalPages={totalPages}
            page={currentPage}
            handler={onPageChanged}
            type={type}
          />
        </div>
        <div className="filter-wrapper">
          <div className="filter-container">
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={country}
                onChange={handleSelectCounty(country)}
              >
                <MenuItem value="Other">Other</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText FormHelperText>
                Sorting by Countries
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="card-wrapper-continents">
          {artistsByCountries.map(artist => {
            let { username } = artist;
            if (username.includes('/')) {
              const position = username.indexOf('/');
              username = `${username.substr(0, position)}%2F${username.substr(
                position + 1
              )}`;
            }
            return (
              <Card key={`filter-by-county-${artist.id}`} className="card-home">
                <CardActionArea>
                  <Link
                    to={
                      artist.username
                        ? `/artist/${username}/artist`
                        : `/artist/id/${artist.account_id}/artist`
                    }
                  >
                    {checkBackground(artist.featured_background_url) ? (
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
      </div>
    </>
  );
}
