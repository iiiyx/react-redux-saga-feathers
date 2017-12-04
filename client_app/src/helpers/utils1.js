import consts from './consts';
import qs from 'qs';
import pathToRegexp from 'path-to-regexp';

export const getQueryTypes = search => {
  if (!search || search.length < 2) return null;
  search = search.substr(1);
  let res = qs.parse(search);
  if (!res) return null;
  return res.types;
};

//TODO: replace with matchPath
export const buildMovieUri = params => {
  if (!params) return '/';
  return (
    '/' +
    consts.uriPrefix +
    '/' +
    params.type +
    '/' +
    params.name +
    '/' +
    params.id
  );
};

//TODO: replace with matchPath
export const buildSerieUri = (params, serie) => {
  if (!params) return '/';
  const movieUri = buildMovieUri(params);
  if (!serie) return movieUri;
  return (
    movieUri +
    '/' +
    consts.seasonUri +
    serie.s +
    '/' +
    consts.episodeUri +
    serie.e
  );
};

export const episodeRegx = new RegExp(
  `^${decodeURIComponent(consts.episodeUri)}(\\d+)$`,
);

export const seasonRegx = new RegExp(
  `^${decodeURIComponent(consts.seasonUri)}(\\d+)$`,
);

export const findElementPos = element => {
  let curtop = 0;
  while (element.offsetParent) {
    curtop += element.offsetTop;
    element = element.offsetParent;
  }
  return curtop;
};

export const getUrlEncodedMoviePath = () => {
  return '/' + consts.uriPrefix + '/:type/:name/:id';
};

export const getUrlDecodedMoviePath = () => {
  return '/' + decodeURIComponent(consts.uriPrefix) + '/:type/:name/:id';
};

export const getUrlEncodedSearchPath = () => {
  return '/' + consts.searchPrefix + '/:text';
};

export const getUrlDecodedSearchPath = () => {
  return '/' + decodeURIComponent(consts.searchPrefix) + '/:text';
};

export const getUrlEncodedEpisodePath = () => {
  return getUrlEncodedMoviePath() + '/:season/:episode';
};

export const getUrlDecodedEpisodePath = () => {
  return getUrlDecodedMoviePath() + '/:season/:episode';
};

export const getCompiledSearchPath = text => {
  if (text)
    return pathToRegexp.compile(getUrlEncodedSearchPath())({
      text: text,
    });
  return '/';
};

export const getCompiledSearchPathWithTypes = (text, types) => {
  return getCompiledSearchPath(text) + (types !== '' ? '?types=' + types : '');
};
