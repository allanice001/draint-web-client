import { MasterSliderNav } from 'components/nav/sub/masterSliderNav';
import React from 'react';
import { SliderForm } from './sliderForm';
import styles from './homepage.module.scss';
import { useMasterHomepage } from 'hooks/useMasterHomepage';

export const MasterSlider = () => {
  const {
    handleCreateSlideSubmit,
    disableArtwork,
    disableCustomFields,
    isDesktop,
  } = useMasterHomepage();

  return (
    <div className={styles.wrapper}>
      <MasterSliderNav />
      <SliderForm
        onCreateSliderClick={handleCreateSlideSubmit}
        disableArtwork={disableArtwork}
        disableCustomFields={disableCustomFields}
        isMobile={!isDesktop}
      />
    </div>
  );
};
