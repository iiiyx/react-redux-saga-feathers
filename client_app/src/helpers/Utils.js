import qs from 'qs';

export const getQueryTypes = search => {
  if (!search || search.length < 2) return null;
  search = search.substr(1);
  let res = qs.parse(search);
  if (!res) return null;
  return res.types;
};
