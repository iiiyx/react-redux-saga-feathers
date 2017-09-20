import { combineReducers } from 'redux';

import tracks from './tracks';
import playlists from './playlists';
import trackFilter from './trackFilter';

export default combineReducers({
  tracks,
  playlists,
  trackFilter,
});
