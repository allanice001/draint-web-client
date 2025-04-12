import { useCallback } from 'react';
import { useHistory } from 'react-router';

const getQuery = (params) => {
  if (!params) {
    return '';
  }

  const keys = Object.keys(params);

  if (!keys.length) {
    return '';
  }

  const query = Object.keys(params)
    .map((key) => [key, params[key]].join('='))
    .join('&');

  return `?${query}`;
};

const useRouter = () => {
  const history = useHistory();

  const navigate = useCallback(
    (path, params) => history.push(`${path}${getQuery(params)}`),
    [history]
  );

  return {
    navigate,
  };
};

export { useRouter };
