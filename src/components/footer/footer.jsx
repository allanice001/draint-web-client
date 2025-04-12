import { FooterDesktop } from './footer-main/footer-desktop';
import { FooterMobile } from './footer-main/footer-mobile';
import React from 'react';
import { getFooterBlogs } from 'redux/blog/actions';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Footer() {
  const dispatch = useDispatch();
  dispatch(getFooterBlogs());

  const isDesktop = useMediaQuery('(min-width:960px)');

  return <>{isDesktop ? <FooterDesktop /> : <FooterMobile />}</>;
}
