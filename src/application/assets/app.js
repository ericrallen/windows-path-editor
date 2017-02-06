import React from 'react';

import {
  render,
} from 'react-dom';

import {
  Router,
  Route,
  browserHistory,
} from 'react-router';

import Editor from '../../components/Editor/Editor';

require('./app.scss');

render((
  <Router history={browserHistory}>
    <Route path="/" component={Editor} />
  </Router>
), document.getElementById('main'));
