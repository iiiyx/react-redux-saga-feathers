import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';

import { fetchMovies, fetchMovie } from '../services/api';

function* fetchMovieSaga(feathersApp) {
  yield* takeEvery('MOVIE_FETCH_REQUESTED', callFetchMovie, feathersApp);
}

function* fetchMoviesSaga(feathersApp) {
  yield* takeEvery('MOVIES_FETCH_REQUESTED', callFetchMovies, feathersApp);
}

function* callFetchMovie(feathersApp, action) {
  const movie = yield call(fetchMovie, feathersApp, action.id);
  yield put({ type: 'MOVIE_FETCH_DONE', movie });
}

function* callFetchMovies(feathersApp, action) {
  const movies = yield call(
    fetchMovies,
    feathersApp,
    action.text,
    action.page,
    action.types,
  );
  yield put({
    type: action.isMore ? 'MORE_MOVIES_DONE' : 'MOVIES_FETCH_DONE',
    movies,
  });
}

export default function* root(feathersApp) {
  yield [fork(fetchMovieSaga, feathersApp), fork(fetchMoviesSaga, feathersApp)];
}
