import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import movies from './movies';
import currMovie from './currMovie';

const rootReducer = combineReducers({
  routing: routerReducer,
  currMovie,
  movies,
});

export default rootReducer;
