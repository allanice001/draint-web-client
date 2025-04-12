import './style/artworksContainer.scss';

import { countryName, isoCountry } from 'components/lib';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Flag from 'react-flags';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';

export default function ArtworkFilteredByStyle(props) {
  const { styles, artStyle, artworkByStyle, handleSelectStyle } = props;
  const totalArtwork = artworkByStyle.length;
  if (totalArtwork === 0) return null;
  return (
    <>
      <div className="country-filtered-wrapper">
        <div className="filtered-header">SORTING BY ARTWORK STYLE</div>
        <div className="filter-wrapper">
          <div className="filter-container">
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">
                Style
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={artStyle}
                onChange={handleSelectStyle(artStyle)}
              >
                <MenuItem value="All">All</MenuItem>
                {styles.map(style => (
                  <MenuItem
                    key={`search-${style.style}-${style.id}`}
                    value={style}
                  >
                    {style}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Sorting by Artworks Style</FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="artworks-wrapper-container">
          {artworkByStyle.slice(0, 9).map(artwork => (
            <Card key={`search-by-style-${artwork.id}`} className="card">
              <CardActionArea>
                <Link
                  to={getArtworkUrl(
                    artwork.id,
                    artwork.title,
                    artwork.username
                  )}
                >
                  <img
                    alt={artwork.username}
                    className="artworks-img"
                    src={artwork.primary_image}
                    title={artwork.username}
                  />
                </Link>
                <CardContent>
                  <div>
                    <div className="artist-name">
                      {artwork.first_name} {artwork.last_name}
                    </div>
                    <div className="artist-name">
                      {artwork.username ? `(${artwork.username})` : null}
                    </div>
                  </div>
                  <div>
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
                      <div className="artworks-country-name">
                        {countryName(artwork.country)}
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
