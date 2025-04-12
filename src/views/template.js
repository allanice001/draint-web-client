import Axios from 'axios';
import React from 'react';
import { ViewContext } from 'components/lib';
const Settings = require('settings.json');

export class ViewTemplate extends React.Component {
  constructor(properties) {
    super(properties);
    this.api_server = Settings[process.env.NODE_ENV].api_server;
  }

  async componentDidMount() {
    try {
      await Axios.get(`${this.api_server}/api/endpint`);
    } catch (error) {
      this.context.handleError(error);
    }
  }

  render() {
    return <></>;
  }
}

ViewTemplate.contextType = ViewContext;
