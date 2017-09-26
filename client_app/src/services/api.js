//TODO: handle errors
//TODO: check feathers `then` syntax
import consts from '../helpers/consts';

export function fetchMovie(app, id) {
  const movies = app.service(consts.moviesApi);
  return movies
    .find({
      query: {
        $limit: 1,
        sid: id,
      },
    })
    .then(data => data.data)
    .catch(err => console.log('fetchMovie', err));
}

export function fetchMovies(app, text, page, types) {
  const movies = app.service(consts.moviesApi);
  let qObj = {
    query: {
      $sort: {
        time: -1,
      },
      $skip: page * consts.limit,
      $limit: consts.limit,
    },
  };
  if (types != null) {
    qObj.query.type = {
      $in: types.split(','),
    };
  }
  if (text != null) {
    qObj.query.$or = [
      {
        ru: {
          $like: `${text}%`,
        },
      },
      {
        en: {
          $like: `${text}%`,
        },
      },
      {
        ru: {
          $like: `% ${text}%`,
        },
      },
      {
        en: {
          $like: `% ${text}%`,
        },
      },
    ];
  }
  return movies
    .find(qObj)
    .then(data => {
      return data;
    })
    .catch(err => console.log('fetchMovies', err));
}
