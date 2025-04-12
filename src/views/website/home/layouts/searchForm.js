import './style/searchForm.scss';

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@material-ui/core';

import { Logo } from 'components/lib';
import React from 'react';
import { Search } from '@material-ui/icons';

export default class HomePageSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  onHover = () => {
    this.setState(prevState => ({ hover: !prevState.hover }));
  };

  render() {
    const {
      countries,
      country,
      handleSelectCounty,
      handleScrollToCountries,
      artistName,
      handleNameSearch,
      searchByArtistName,
      background,
      searchByHashtags,
      hashtag,
      handleHashTagSearch,
    } = this.props;
    return (
      <>
        <div
          className={`home-page-search-form-nav${
            this.state.hover ? ' hover' : ''
          }`}
        >
          <div className="form-wrapper-stub">
            <Logo short />
            <span className="form-wrapper-stub text" onClick={this.onHover}>
              <Search style={{ marginRight: '2px' }} /> Add artists, artworks or
              hashtags...
            </span>
          </div>
          <div className="form-wrapper">
            <FormControl variant="outlined">
              <InputLabel htmlFor="continents">Country</InputLabel>
              <Select
                className="home-search-select"
                labelId="continents"
                id="continents"
                value={country}
                onChange={handleSelectCounty(country)}
                labelWidth={45}
              >
                <MenuItem value="Other">Other</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              <div className="search-button">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleScrollToCountries}
                >
                  Search
                </Button>
              </div>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="artist_name">Artist Name</InputLabel>
              <OutlinedInput
                id="artist_name"
                aria-describedby="artist_name_helper"
                labelWidth={63}
                value={artistName}
                onChange={handleNameSearch}
              />
              <div className="search-button">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={searchByArtistName}
                >
                  Search
                </Button>
              </div>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="hashtag">Hashtag Search</InputLabel>
              <OutlinedInput
                id="hashtag"
                aria-describedby="hashtag_helper"
                labelWidth={86}
                value={hashtag}
                onChange={handleHashTagSearch}
              />
              <div className="search-button">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={searchByHashtags}
                >
                  Search
                </Button>
              </div>
            </FormControl>
            <Button className="hide-button" onClick={this.onHover}>
              HIDE
            </Button>
          </div>
        </div>
        <div
          id={
            background
              ? 'home-page-search-form'
              : 'home-page-search-form-background'
          }
        >
          <Card>
            <CardContent>
              <Typography
                className="home-search-header"
                variant="h5"
                component="h1"
              >
                Find and buy original art from artists around the world
              </Typography>

              <div className="form-wrapper">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="continents">Country</InputLabel>
                  <Select
                    className="home-search-select"
                    labelId="continents"
                    id="continents"
                    value={country}
                    onChange={handleSelectCounty(country)}
                    labelWidth={45}
                  >
                    <MenuItem value="Other">Other</MenuItem>
                    {countries.map(country => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id="continents_helper" />
                  <div className="search-button">
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={handleScrollToCountries}
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="artist_name">Artist Name</InputLabel>
                  <OutlinedInput
                    id="artist_name"
                    aria-describedby="artist_name_helper"
                    labelWidth={63}
                    value={artistName}
                    onChange={handleNameSearch}
                  />
                  <FormHelperText id="artist_name_helper" />
                  <div className="search-button">
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={searchByArtistName}
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>

                <FormControl variant="outlined">
                  <InputLabel htmlFor="hashtag">Hashtag Search</InputLabel>
                  <OutlinedInput
                    id="hashtag"
                    aria-describedby="hashtag_helper"
                    labelWidth={86}
                    value={hashtag}
                    onChange={handleHashTagSearch}
                  />
                  <FormHelperText id="hashtag_helper" />
                  <div className="search-button">
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={searchByHashtags}
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}
