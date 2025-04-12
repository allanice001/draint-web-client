import React, { useEffect } from 'react';
import BackgroundSection from './background-section/background-section';
import PackageSection from './package-section/package-section';
import PackagingInstructions from './packing-instruction-section/packing-instruction';
import ShippingFailure from './shipping-failure/shipping-failure';
import TrackSection from './track-section/track-section';
import { getLegalImprint } from 'redux/legal/actions/legalActions';
import { pageScroll } from 'services/pageScroller';
import { useDispatch } from 'react-redux';

const ShippingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLegalImprint());
    pageScroll();
  }, [dispatch]);

  return (
    <>
      <BackgroundSection />

      <PackageSection />

      <TrackSection />

      <PackagingInstructions />

      <ShippingFailure />
    </>
  );
};

export default ShippingPage;
