import AppConsts from '../helpers/Consts';

export function fetchMovie(app, id) {
  const movies = app.service('api_movies');
  return movies
    .find({
      query: {
        $limit: 1,
        sid: id,
      },
    })
    .then((data, err) => data.data);
}

export function fetchMovies(app, text, page, types) {
  const movies = app.service('api_movies');
  let qObj = {
    query: {
      $sort: {
        time: -1,
      },
      $skip: page * AppConsts.limit,
      $limit: AppConsts.limit,
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
  return movies.find(qObj).then((data, err) => data);
}
