import {
  AUTO_LETTER_DIALOG,
  FILL_FORM_ALERT,
  SELECT_ARTIST,
  SELECT_ARTWORK,
} from '../../constants/master-dashboard/automated-newslaters';
import { Card, CardContent, Paper, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  closeSnackbar,
  getCheckedArtistData,
  getCheckedArtworkData,
  getNewArtists,
  getNewArtworks,
  getTemplate,
  getWeeklyTemplateData,
  resetSelectedDateArtist,
  resetSelectedDateArtwork,
  resetTemplate,
  saveLetterDialog,
  saveLetterError,
  saveWeeklyLetter,
  setArtistsDateFrom,
  setArtistsDateSelected,
  setArtistsDateTo,
  setArtworksDateFrom,
  setArtworksDateSelected,
  setArtworksDateTo,
  setMailForm,
} from 'redux/master/actions/newslettersActions';

import { ERROR } from 'constants/components/message-statuses';
import EmailForm from './newsletter-email-form';
import EmailTemplate from './newsletter-email-template';
import MasterDateFilter from '../../components/filters/masterDateFilter';
import { MasterNewsLetterWeeklyCard } from './newsletter-weekly-cards';
import { NewsletterNav } from 'components/nav/sub/newsletter';
import SearchBar from '../../components/searchBar/searchBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import styles from './newsletter-weekly.module.scss';

const MasterNewsLetterWeekly = ({ newsletters, actions, mailForm, user }) => {
  const [initialState, setInitialState] = useState(false);
  const [checkedArtworks, setCheckedArtworks] = useState([]);
  const [checkedArtists, setCheckedArtists] = useState([]);
  const [artistsQuery, setArtistsQuery] = useState(null);
  const [artworksQuery, setArtworksQuery] = useState(null);
  const [currentTabArtists, setCurrentTabArtists] = useState(0);
  const [currentTabArtworks, setCurrentTabArtworks] = useState(0);
  const {
    artworksDateStart,
    artworksDateEnd,
    artistsDateStart,
    artistsDateEnd,
    dateArtworksSelected,
    dateArtistsSelected,
    newArtists,
    newArtworks,
    template,
    openDialog,
    loading,
    prevWeeklyTemplate,
    checkedArtworksData,
    checkedArtistsData,
  } = newsletters;

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  useEffect(() => {
    actions.setMailForm({
      title: '',
      text: '',
      img_link: '',
    });
  }, [actions]);

  useEffect(() => {
    actions.resetTemplate();
  }, [actions]);

  useEffect(() => {
    actions.getWeeklyTemplateData();
  }, [actions]);

  useEffect(() => {
    if (checkedArtists.length) {
      actions.getCheckedArtistData(checkedArtists);
    }
  }, [actions, checkedArtists]);

  useEffect(() => {
    if (checkedArtworks.length) {
      actions.getCheckedArtworkData(checkedArtworks);
    }
  }, [actions, checkedArtworks]);

  useEffect(() => {
    if (prevWeeklyTemplate) {
      const data = {
        title: prevWeeklyTemplate.title,
        img_link: prevWeeklyTemplate.img_link,
        text: prevWeeklyTemplate.text,
        template: 'newsletter-weekly',
        type: '',
        checkedArtworks: prevWeeklyTemplate.checked_artworks,
        checkedArtists: prevWeeklyTemplate.checked_artists,
      };
      actions.getTemplate(data);
    }
  }, [actions, prevWeeklyTemplate]);

  useEffect(() => {
    actions.getNewArtists(artistsDateStart, artistsDateEnd, artistsQuery);
    actions.getNewArtworks(artworksDateStart, artworksDateEnd, artworksQuery);
  }, [
    newArtists.length,
    newArtworks.length,
    actions,
    artistsDateStart,
    artworksDateStart,
    artistsDateEnd,
    artworksDateEnd,
    artistsQuery,
    artworksQuery,
  ]);

  const artistsDateChangeFrom = date => {
    const from = new Date(date).toISOString();
    actions.setArtistsDateFrom('artistsDateStart', from);
  };

  const handleChangeArtworks = (event, newValue) => {
    setCurrentTabArtworks(newValue);
  };

  const handleChangeArtists = (event, newValue) => {
    setCurrentTabArtists(newValue);
  };

  const artistsDateChangeTo = date => {
    const to = new Date(date).toISOString();
    actions.setArtistsDateTo('artistsDateEnd', to);
  };

  const handleArtistsDateSelected = data => {
    if (data === false) {
      actions.resetSelectedDateArtist();
    }
    actions.setArtistsDateSelected(data);
  };

  const handleArtworksDateSelected = data => {
    if (data === false) {
      actions.resetSelectedDateArtwork();
    }
    actions.setArtworksDateSelected(data);
  };

  const artworksDateChangeFrom = date => {
    const from = new Date(date).toISOString();
    actions.setArtworksDateFrom('artworksDateStart', from);
  };

  const artworksDateChangeTo = date => {
    const to = new Date(date).toISOString();
    actions.setArtworksDateTo('artworksDateEnd', to);
  };

  const handleInputChange = (event, field) => {
    actions.setMailForm({ ...mailForm, [field]: event.target.value });
  };

  const handleDialog = () => {
    actions.saveLetterDialog();
  };

  const handleArtistsSearch = value => {
    setArtistsQuery(value);
  };

  const handleArtworksSearch = value => {
    setArtworksQuery(value);
  };

  const handleChecked = (type, content, checked) => {
    if (type === 'checkedArtists') {
      if (checked) {
        newArtists.map(artist => {
          if (artist.id === content.id) {
            setCheckedArtists([...checkedArtists, content.id]);
          }
          return artist;
        });
      } else {
        setCheckedArtists(checkedArtists.filter(id => id !== content.id));
      }
    }
    if (type === 'checkedArtworks') {
      if (checked) {
        newArtworks.map(artwork => {
          if (artwork.id === content.id) {
            setCheckedArtworks([...checkedArtworks, content.id]);
          }
          return artwork;
        });
      } else {
        setCheckedArtworks(checkedArtworks.filter(id => id !== content.id));
      }
    }
  };

  const lettersSend = async () => {
    setInitialState(false);
    if (mailForm.title === '' || mailForm.text === String('<p><br></p>')) {
      actions.displayMessage(FILL_FORM_ALERT, ERROR);
    } else if (checkedArtworks.length < 12 || checkedArtworks.length > 12) {
      actions.displayMessage(SELECT_ARTWORK, ERROR);
    } else if (checkedArtists.length < 12 || checkedArtists.length > 12) {
      actions.displayMessage(SELECT_ARTIST, ERROR);
    } else {
      actions.saveWeeklyLetter(mailForm, checkedArtworks, checkedArtists);
    }
    handleDialog();
  };

  const getColor = length =>
    length === 12 ? { color: 'green' } : { color: 'red' };

  return (
    <>
      <NewsletterNav />

      <div className={styles.wrapper}>
        <div className={styles.list}>
          <div className={styles.list__block}>
            <SearchBar
              handleSearch={handleArtistsSearch}
              value={artistsQuery}
              customLabel={'Search artists'}
            />
            <Card>
              <CardContent>
                <h3>New Artist</h3>
                <MasterDateFilter
                  changeFrom={artistsDateChangeFrom}
                  changeTo={artistsDateChangeTo}
                  onDateSelected={handleArtistsDateSelected}
                  dateSelected={dateArtistsSelected}
                  from={artistsDateStart}
                  to={artistsDateEnd}
                  loading={loading}
                  dateOnly
                />
                <div style={{ margin: '10px' }}>
                  Artists selected:&nbsp;
                  <span style={getColor(checkedArtists.length)}>
                    {checkedArtists.length}/12
                  </span>
                </div>
                <Paper>
                  <Tabs
                    value={currentTabArtists}
                    onChange={handleChangeArtists}
                    indicatorColor="primary"
                    variant="fullWidth"
                    textColor="black"
                  >
                    <Tab label={'Artists'} index={0} />
                    <Tab label={'Artists selected'} index={1} />
                  </Tabs>
                </Paper>
                {currentTabArtists ? (
                  <div className={styles.cards_wrapper}>
                    {checkedArtistsData.length > 0 ? (
                      checkedArtistsData.map(artist => (
                        <MasterNewsLetterWeeklyCard
                          type="checkedArtists"
                          content={artist}
                          arrayChecked={checkedArtists}
                          handleChecked={handleChecked}
                        />
                      ))
                    ) : (
                      <h3>No selected artists</h3>
                    )}
                  </div>
                ) : (
                  <div className={styles.cards_wrapper}>
                    {newArtists.length > 0 ? (
                      newArtists.map(artist => (
                        <MasterNewsLetterWeeklyCard
                          type="checkedArtists"
                          content={artist}
                          arrayChecked={checkedArtists}
                          handleChecked={handleChecked}
                        />
                      ))
                    ) : (
                      <h3>No new artists for this period</h3>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className={styles.list__block}>
            <SearchBar
              handleSearch={handleArtworksSearch}
              value={artworksQuery}
              customLabel={'Search artworks'}
            />
            <Card>
              <CardContent>
                <h3>Latest Artwork</h3>
                <MasterDateFilter
                  changeFrom={artworksDateChangeFrom}
                  changeTo={artworksDateChangeTo}
                  onDateSelected={handleArtworksDateSelected}
                  dateSelected={dateArtworksSelected}
                  from={artworksDateStart}
                  to={artworksDateEnd}
                  loading={loading}
                  dateOnly
                />
                <div style={{ margin: '10px' }}>
                  Artworks selected:&nbsp;
                  <span style={getColor(checkedArtworks.length)}>
                    {checkedArtworks.length}/12
                  </span>
                </div>
                <Paper>
                  <Tabs
                    value={currentTabArtworks}
                    onChange={handleChangeArtworks}
                    indicatorColor="primary"
                    variant="fullWidth"
                    textColor="black"
                  >
                    <Tab label={'Artworks'} index={0} />
                    <Tab label={'Artworks selected'} index={1} />
                  </Tabs>
                </Paper>
                {currentTabArtworks ? (
                  <div className={styles.cards_wrapper}>
                    {checkedArtworksData.length > 0 ? (
                      checkedArtworksData.map(artwork => (
                        <MasterNewsLetterWeeklyCard
                          type="checkedArtworks"
                          content={artwork}
                          arrayChecked={checkedArtworks}
                          handleChecked={handleChecked}
                        />
                      ))
                    ) : (
                      <h3>No selected artworks</h3>
                    )}
                  </div>
                ) : (
                  <div className={styles.cards_wrapper}>
                    {newArtworks.length > 0 ? (
                      newArtworks.map(artwork => (
                        <MasterNewsLetterWeeklyCard
                          type="checkedArtworks"
                          content={artwork}
                          arrayChecked={checkedArtworks}
                          handleChecked={handleChecked}
                        />
                      ))
                    ) : (
                      <h3>No new artworks for this period</h3>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className={styles.form_block}>
          <div className={styles.form_block__form}>
            <Card>
              <CardContent>
                <h2>Newsletter Form</h2>
                <EmailForm
                  form={mailForm}
                  loading={loading}
                  openDialog={openDialog}
                  initialState={initialState}
                  dialogSettings={AUTO_LETTER_DIALOG}
                  setInitialState={() => setInitialState(true)}
                  inputChange={handleInputChange}
                  handleDialog={handleDialog}
                  lettersSend={lettersSend}
                  getPreview={actions.getTemplate}
                  templateName="newsletter-weekly"
                  checkedArtworks={checkedArtworks}
                  checkedArtists={checkedArtists}
                  isPermission={isAnalyst}
                  withButton={false}
                />
              </CardContent>
            </Card>
          </div>
          <div className={styles.form_block__preview}>
            <Card>
              <EmailTemplate html={template} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(store) {
  return {
    newsletters: store.master.newsletters,
    mailForm: store.master.newsletters.form,
    user: store.user.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getTemplate,
        getNewArtworks,
        getNewArtists,
        setMailForm,
        saveWeeklyLetter,
        saveLetterDialog,
        saveLetterError,
        closeSnackbar,
        getWeeklyTemplateData,
        setArtworksDateFrom,
        setArtworksDateTo,
        setArtistsDateFrom,
        setArtistsDateTo,
        setArtistsDateSelected,
        setArtworksDateSelected,
        displayMessage,
        resetSelectedDateArtwork,
        resetSelectedDateArtist,
        getCheckedArtistData,
        getCheckedArtworkData,
        resetTemplate,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterNewsLetterWeekly);
