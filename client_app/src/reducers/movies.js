import { getType } from '../helpers/MovieTypeHelper';

function movies(state = { data: [] }, action) {
  switch (action.type) {
    case 'MOVIES_FETCH_DONE':
    case 'MORE_MOVIES_DONE':
      if (
        action &&
        action.movies &&
        action.movies.data &&
        action.movies.data.length
      ) {
        action.movies.data.map(movie => (movie.type = getType(movie.type)));
      }
      if (action.type === 'MORE_MOVIES_DONE')
        action.movies.data = state.data.concat(action.movies.data);
      return action.movies;

    case 'MOVIES_FETCH_REQUESTED':
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
}

export default movies;