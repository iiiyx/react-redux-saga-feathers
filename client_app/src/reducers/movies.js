import { getType } from '../helpers/movieTypeHelper';

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
      return {
        ...action.movies,
        request: state.request,
      };

    case 'MOVIES_FETCH_REQUESTED':
      if (action.isMore) return state;
      return {
        ...state,
        isFetching: true,
        request: {
          ...action,
        },
      };

    default:
      return state;
  }
}

export default movies;
