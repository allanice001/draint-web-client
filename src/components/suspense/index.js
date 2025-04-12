import { Spinner } from 'components/loader/spinner-loader/spinner';
import { Suspense } from 'react';

const MySuspense = ({ children }) => {
  return <Suspense fallback={<Spinner full />}>{children}</Suspense>;
};

export default MySuspense;
