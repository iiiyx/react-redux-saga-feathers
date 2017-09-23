export function fetchMovie(id) {
  return {
    type: 'MOVIE_FETCH_REQUESTED',
    id,
  };
}

export function fetchMovies(text, page, types, isMore) {
  return {
    type: 'MOVIES_FETCH_REQUESTED',
    text,
    page,
    types,
    isMore,
  };
}
