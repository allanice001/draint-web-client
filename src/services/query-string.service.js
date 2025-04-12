import queryString from 'query-string';

export const getParsedQueryParams = () => {
  return queryString.parse(window.location.search, {
    arrayFormat: 'comma',
    parseNumbers: true,
  });
};

export const transformURLStr = url => {
  const urlTrimQuestionMark = url[0] === '?' ? url.slice(1) : url;
  return urlTrimQuestionMark === 'page=1' ? '' : urlTrimQuestionMark;
};

export const updateQueryParams = ({
  parsedParams,
  path,
  history,
  savedFilter,
}) => {
  const prevPath = history.location.pathname;
  const prevSearch = transformURLStr(history.location.search);
  const newPath = !!path ? path : prevPath;

  let newSearch = savedFilter || '';

  if (parsedParams) {
    const parsedParamsToString = queryString.stringify(parsedParams, {
      skipNull: true,
      skipEmptyString: true,
      arrayFormat: 'comma',
    });
    newSearch = transformURLStr(parsedParamsToString);
  }

  if (newSearch === prevSearch && newPath === prevPath) {
    return;
  }
  return history.push({
    pathname: newPath,
    search: newSearch,
  });
};
