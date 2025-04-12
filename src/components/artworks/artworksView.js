import './ArtworksView.scss';

import { countryName, isoCountry } from '../lib';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Flag from 'react-flags';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import PaginationControlled from 'components/pagination/paginationNumbers';
import React from 'react';
import Select from '@material-ui/core/Select';
import { generateUuid } from '../../services/tokenService';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';

export default class ArtworksView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      artworks,
      title,
      styles,
      artStyle,
      handleSelectStyle,
      totalPages,
      currentPage,
      onPageChanged,
      type,
      onShowMore,
    } = this.props;
    const totalArtwork = artworks.length;
    if (totalArtwork === 0) return null;
    return (
      <>
        <div id="artworks-container-wrapper">
          <div className="artworks-title">{title}</div>
          <div className="artworks-title">
            <PaginationControlled
              totalPages={totalPages}
              page={currentPage}
              handler={onPageChanged}
              type={type}
            />
          </div>
          {styles && artStyle ? (
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
                      <MenuItem key={`artworkStyle-${style}`} value={style}>
                        {style}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Sorting by Artworks Style</FormHelperText>
                </FormControl>
              </div>
            </div>
          ) : null}

          {artworks.map(artwork => (
            <Card key={`artwork-${generateUuid()}`} className="card">
              <CardActionArea>
                <Link
                  to={getArtworkUrl(
                    artwork.id,
                    artwork.title,
                    artwork.username
                  )}
                >
                  <img
                    alt={artwork.title}
                    className="artworks-img"
                    src={artwork.small_image || artwork.primary_image}
                    title={artwork.title}
                  />
                </Link>
                <CardContent>
                  <div className="artist-card">
                    <div className="artist-name">{artwork.title}</div>
                    <Link
                      to={getArtistGalleryURL(artwork.username)}
                      className="name-link"
                    >
                      <div className="artist-name-link">
                        {' '}
                        by {artwork.first_name} {artwork.last_name}
                      </div>
                    </Link>
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
                        <div className="artist-card-price ">
                          €{artwork.price}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
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
      </>
    );
  }
}
