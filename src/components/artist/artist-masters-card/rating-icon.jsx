import { ACTIVE_COLOR, DEFAULT_COLOR } from 'constants/components/master/rating-icon';
import React, { useState } from 'react';

const RatingIcon = (props) => {
  const {
    iconCount = 5,
    Icon,
    rating,
    activeColor = ACTIVE_COLOR,
    defaultColor = DEFAULT_COLOR,
    setOrderRating,
  } = props;

  const [hoveringRating, setHoveringRating] = useState(0);

  const icons = Array(iconCount).fill(0);

  const getColor = (index) => {
    if (index <= (hoveringRating || rating)) {
      return activeColor;
    }
      return defaultColor;
  };

  return (
    icons.map((element, i) => i + 1)
        .map((index) => (
            <div
              onMouseEnter={() => setHoveringRating(index)}
              onMouseLeave={() => setHoveringRating(rating)}
              onClick={() => setOrderRating(index)}
            >
              <Icon fill={getColor(index)} />
            </div>
  )))
};

export default RatingIcon;
