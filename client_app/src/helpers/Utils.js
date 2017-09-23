import Consts from './Consts';

export const buildMovieUri = params => {
  if (!params) return '/';
  return (
    '/' +
    Consts.uriPrefix +
    '/' +
    params.type +
    '/' +
    params.name +
    '/' +
    params.id
  );
};

export const buildSerieUri = (params, serie) => {
  if (!params) return '/';
  const movieUri = buildMovieUri(params);
  if (!serie) return movieUri;
  return (
    movieUri +
    '/' +
    Consts.seasonUri +
    serie.s +
    '/' +
    Consts.episodeUri +
    serie.e
  );
};

export const episodeRegx = new RegExp(
  `^${decodeURIComponent(Consts.episodeUri)}(\\d+)$`,
);

export const seasonRegx = new RegExp(
  `^${decodeURIComponent(Consts.seasonUri)}(\\d+)$`,
);

export const findElementPos = element => {
  let curtop = 0;
  while (element.offsetParent) {
    curtop += element.offsetTop;
    element = element.offsetParent;
  }
  return curtop;
};
