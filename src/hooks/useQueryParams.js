import { useLocation } from 'react-router';

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default useQueryParams;
