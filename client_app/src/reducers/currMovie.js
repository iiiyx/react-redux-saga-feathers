import { getType } from '../helpers/movieTypeHelper';

const currMovie = (state = {}, action) => {
  switch (action.type) {
    case 'MOVIE_FETCH_DONE':
      if (action.movie.length) {
        const movie = action.movie[0];
        movie.type = getType(movie.type);
        return movie;
      }
      return {};

    case 'MOVIE_FETCH_REQUESTED':
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};

export default currMovie;
