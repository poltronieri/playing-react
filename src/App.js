import React from 'react';
import { Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { Router } from 'react-router';

import Template from './pages/Template';

import IndexPage from './pages/IndexPage';

import './assets/css/play.css';

const history = createHashHistory();

const App = () => {
  return (
    <Router history={history}>
      <Template>
        <Route component={IndexPage} exact path="/" />
      </Template>
    </Router>
  );
};

export default App;
