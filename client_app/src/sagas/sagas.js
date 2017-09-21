import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';

import { fetchMovies, fetchMovie } from '../services/api';

// import { getQueryTypes } from '../helpers/Utils';

// function* fetchDataByPath(feathersApp) {
//   yield* takeEvery(
//     '@@router/LOCATION_CHANGE',
//     callFetchDataByPath,
//     feathersApp,
//   );
// }

function* fetchMovieSaga(feathersApp) {
  yield* takeEvery('MOVIE_FETCH_REQUESTED', callFetchMovie, feathersApp);
}

function* fetchMoviesSaga(feathersApp) {
  yield* takeEvery('MOVIES_FETCH_REQUESTED', callFetchMovies, feathersApp);
}

// function* callFetchDataByPath(feathersApp, action) {
//   console.log('callFetchDataByPath', action);
//   if (action.payload.pathname === '/') {
//     const types = getQueryTypes(action.payload.search);
//     const movies = yield call(fetchMovies, feathersApp, null, 0, types);
//     yield put({
//       type: 'MOVIES_FETCH_DONE',
//       movies,
//     });
//   }
// }

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
  yield [
    fork(fetchMovieSaga, feathersApp),
    fork(fetchMoviesSaga, feathersApp),
    // fork(fetchDataByPath, feathersApp),
  ];
}
