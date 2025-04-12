import '../home.scss';

import AmericanContinent from './artistsByAmericanContinent';
import AustralianContinents from './artistsByOceanicContinent';
import ButtonBase from '@material-ui/core/ButtonBase';
import EuropeanContinent from './artistsByEuropianContinent';
import React from 'react';

export default class Continents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'america',
    };
  }

  handleContent = (e, value) => {
    document
      .querySelectorAll('div.button-holder')
      .forEach(element => element.classList.remove('selected-continent'));
    e.target.closest('div.button-holder').classList.add('selected-continent');
    this.setState({ content: value });
  };

  render() {
    const {
      oceania,
      america,
      europe,
      newArtists,
      totalPages,
      currentPages,
      onPageChanged,
      onShowMore,
    } = this.props;
    const { content } = this.state;
    const totalArtwork = newArtists.length;
    if (totalArtwork === 0) return null;
    return (
      <>
        <div className="continents-button-wrapper">
          <div className="button-holder">
            <ButtonBase onClick={e => this.handleContent(e, 'america')}>
              <div className="continents-button-title-wrapper america">
                <div className="button-title">AMERICAN CONTINENT</div>
              </div>
            </ButtonBase>
          </div>
          <div className="button-holder">
            <ButtonBase onClick={e => this.handleContent(e, 'europe')}>
              <div className="continents-button-title-wrapper europe">
                <div className="button-title">EUROPEAN CONTINENT</div>
              </div>
            </ButtonBase>
          </div>
          <div className="button-holder">
            <ButtonBase onClick={e => this.handleContent(e, 'australia')}>
              <div className="continents-button-title-wrapper australia">
                <div className="button-title">AUSTRALIAN CONTINENT</div>
              </div>
            </ButtonBase>
          </div>
        </div>

        {content === 'america' && (
          <AmericanContinent
            america={america}
            totalPages={totalPages.america}
            currentPage={currentPages.america}
            onPageChanged={onPageChanged}
            onShowMore={onShowMore}
            type="america"
          />
        )}
        {content === 'europe' && (
          <EuropeanContinent
            europe={europe}
            totalPages={totalPages.europe}
            currentPage={currentPages.europe}
            onPageChanged={onPageChanged}
            onShowMore={onShowMore}
            type="europe"
          />
        )}
        {content === 'australia' && (
          <AustralianContinents
            oceania={oceania}
            totalPages={totalPages.oceania}
            currentPage={currentPages.oceania}
            onPageChanged={onPageChanged}
            onShowMore={onShowMore}
            type="oceania"
          />
        )}
      </>
    );
  }
}
