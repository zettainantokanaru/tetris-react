import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './app/store';
import Home from './app/containers/home';
import Game from './app/containers/game';
import './assets/scss/common.scss';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/game' component={Game} />
          <Redirect to='/' />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);


