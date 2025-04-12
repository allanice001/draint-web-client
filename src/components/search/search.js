/***
 *
 *   SEARCH
 *   Search input field.
 *
 *   PROPS
 *   callback: function to execute on change and submit
 *
 **********/

import './search.scss';

import React from 'react';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : '',
    };
  }

  change(event) {
    event.preventDefault();

    if (this.props.callback) this.props.callback(event.target.value);

    this.setState({ value: event.target.value });
  }

  search(event) {
    event.preventDefault();

    if (this.props.callback) this.props.callback(this.state.value);
  }

  render() {
    return (
      <form className="search">
        <input
          type="text"
          className="textbox"
          placeholder="Search"
          value={this.state.value}
          onChange={event => this.change(event)}
        />
        <input
          type="submit"
          value=""
          className="btn-search"
          onClick={event => this.search(event)}
        />
      </form>
    );
  }
}
