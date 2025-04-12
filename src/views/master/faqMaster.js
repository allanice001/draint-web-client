import FaqPage from 'components/faq-page/faq-page';
import { MasterLegalNav } from 'components/nav/sub/masterLegal';
import React from 'react';
import { useLocation } from 'react-router';

export const FaqMaster = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <MasterLegalNav />
      <FaqPage masterView={pathname} />
    </div>
  );
};
