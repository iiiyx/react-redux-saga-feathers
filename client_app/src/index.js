import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import feathers from 'feathers-client';
// To use REST instead of WS uncomment superagent and rest and comment io
// import superagent from 'superagent';
// import rest from 'feathers-rest/client';
import io from 'socket.io-client';

import mySaga from './sagas/sagas';
import reducers from './reducers';

import './styles/index.css';

import App from './components/App';

const history = createHistory();

const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(middleware, sagaMiddleware)),
);

const host = 'http://localhost:3031';
const socket = io(host);

export const app = feathers()
  .configure(feathers.socketio(socket))
  // .superagent(superagent))
  // .configure(feathers.rest(host).superagent(superagent))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

sagaMiddleware.run(mySaga, app);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
