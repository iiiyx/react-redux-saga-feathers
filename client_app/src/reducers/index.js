import { combineReducers } from 'redux';

import movies from './movies';
import currMovie from './currMovie';

const rootReducer = combineReducers({
  currMovie,
  movies,
});

export default rootReducer;
