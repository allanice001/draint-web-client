import PropTypes from 'prop-types';
import React from 'react';

const OnSwipeDownWrapper = ({ children, action }) => {
  let swipe = {};
  const minDistance = 150;

  const onTouchStart = e => {
    const touch = e.touches[0];
    swipe = {
      y: touch.clientY,
      start: e.target.id,
    };
  };

  const onTouchMove = e => {
    if (e.changedTouches && e.changedTouches.length) {
      swipe.swiping = true;
      const touch = e.changedTouches[0];
      const absX = Math.round(touch.clientY - swipe.y);
      const isStart =
        swipe.start === 'search-header' || swipe.start === 'search-form';
      if (absX > minDistance && isStart) {
        action();
      }
    }
  };
  return (
    <div onTouchMove={onTouchMove} onTouchStart={onTouchStart}>
      {children}
    </div>
  );
};

OnSwipeDownWrapper.propTypes = {
  action: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OnSwipeDownWrapper;
