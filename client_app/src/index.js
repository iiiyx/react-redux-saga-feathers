import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import CardList from './components/CardList';
import Card from './components/Card';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={CardList} />
        <Route path="/card/:id" component={Card} />
      </Route>
    </Router>
  </Provider>
);

// app.authenticate().then((user) => {
//   store.dispatch(authGood(user));
//   ReactDOM.render(
//     router,
//     document.getElementById('root')
//   );
// }, () => {
ReactDOM.render(router, document.getElementById('root'));
// });
registerServiceWorker();
