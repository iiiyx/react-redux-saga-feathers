import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas/sagas';

import rootReducer from './reducers/index';

import io from 'socket.io-client';

const defaultState = {};

// const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  defaultState,
  // applyMiddleware(sagaMiddleware),
);

// const host = 'http://localhost:3000';
// const socket = io(host);

// sagaMiddleware.run(mySaga, app);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
