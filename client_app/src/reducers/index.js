import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import movies from './movies';
import currMovie from './currMovie';

const rootReducer = combineReducers({
  currMovie,
  movies,
  routing: routerReducer,
});

export default rootReducer;
