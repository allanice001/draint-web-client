import {
  changeArtistStatus,
  getArtistAccount,
  updateArtistAccount,
  uploadArtistAvatar,
} from 'redux/artist/actions/artistProfileActions';

import { Account } from './artistProfile/account';
import { ArtistAvatar } from './artistProfile/avatar';
import React from 'react';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class ArtistProfile extends React.Component {
  changeAccount = (param, id) => {
    const { account } = this.props.artist;
    this.props.actions.updateArtistAccount(param, id, account);
  };

  changeAccountStatus = (data, status) => {
    const { account } = this.props.artist;
    this.props.actions.changeArtistStatus(data, status, account);
  };

  changeAccountAvatar = (data, size) => {
    const { account } = this.props.artist;
    this.props.actions.uploadArtistAvatar(data, size, account);
  };

  render() {
    const { artist, isOwner, isMaster } = this.props;
    if (artist.loading) return <Spinner full />;
    return (
      <div className="account-preferences-container">
        <div className="preferences-block">
          <ArtistAvatar themeData={artist.account} />
          <Account
            isMaster={isMaster}
            isOwner={isOwner}
            data={artist.account}
            changeAccount={this.changeAccount}
            changeAccountStatus={this.changeAccountStatus}
            changeAccountAvatar={this.changeAccountAvatar}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    artist: store.artist.currentArtist,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getArtistAccount,
        updateArtistAccount,
        changeArtistStatus,
        uploadArtistAvatar,
      },
      dispatch
    ),
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArtistProfile)
);
