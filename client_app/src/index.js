import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';

import App from './components/App';
// import MovieList from './components/MovieList';
// import SingleMovie from './components/SingleMovie';
// import Series from './components/Series';

import './styles/index.css';

const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
