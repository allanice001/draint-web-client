import 'react-app-polyfill/ie9';
import 'styles/normalize.scss';
import 'styles/typography.scss';
import 'styles/index.scss';

import App from './app';
import History from './routers/history';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import io from 'socket.io-client';
import store from './redux/store/index';

const Settings = require('settings.json');

const socket = io.connect(Settings[process.env.NODE_ENV].api_server, {
  pingInterval: 1000,
});
window.Echo = socket;

ReactDOM.render(
  <Provider store={store}>
    <Router history={History}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
