import React, { useEffect, useState } from 'react';

import staticUrls from 'constants/images/static-urls';
import styles from './laptop.module.scss';

function Laptop({ slide }) {
  const [activeSlide, setActiveSlide] = useState(slide);
  const { bg, point, bgfPosition, bgf } = activeSlide;

  useEffect(() => {
    const id = setTimeout(() => {
      setActiveSlide(slide);
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, [slide]);

  return (
    <div
      className={styles.laptop}
      style={{ backgroundImage: `url(${staticUrls.screen.laptop})` }}
    >
      {slide === activeSlide && <img src={bg} alt="" className={styles.view} />}
      <button
        type="button"
        className={styles.button}
        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
        }}
      >
        {point.icon()}
      </button>
      {slide === activeSlide && (
        <img
          src={bgf}
          alt=""
          className={styles.view__feature}
          style={{
            top: `${bgfPosition.y}%`,
            left: `${bgfPosition.x}%`,
          }}
        />
      )}
      {/* <div className={styles.shadow} /> */}
    </div>
  );
}

export default Laptop;
