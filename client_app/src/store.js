import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import feathers from 'feathers-client';
// To use REST instead of WS uncomment superagent and rest and comment io
import superagent from 'superagent';
import rest from 'feathers-rest/client';
// import io from 'socket.io-client';

import mySaga from './sagas/sagas';
import rootReducer from './reducers/index';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, routeMiddleware)),
);

const host = 'http://localhost:3031';
// const socket = io(host);

export const app = feathers()
  // .configure(feathers.socketio(socket))
  .configure(feathers.rest(host).superagent(superagent))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

sagaMiddleware.run(mySaga, app);

export default store;
