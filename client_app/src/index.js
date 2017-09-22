import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import store, { history } from './store';

import App from './components/App';
import MovieList from './components/MovieList';
import SingleMovie from './components/SingleMovie';

import './styles/index.css';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MovieList} />
        <Route
          path="/%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/:type/:name/:id"
          component={SingleMovie}
        />
        <Route
          path="/смотерть-онлайн/:type/:name/:id"
          component={SingleMovie}
        />
        <Route
          path="/%D0%B8%D1%81%D0%BA%D0%B0%D1%82%D1%8C/:text"
          component={MovieList}
        />
        <Route path="/искать/:text" component={MovieList} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
