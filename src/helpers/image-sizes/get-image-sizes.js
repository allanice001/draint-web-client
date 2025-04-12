import { imageSizes } from 'constants/media-query/image-sizes';

const SM = 'sm';
const MD = 'md';
const LG = 'lg';

export const getImageSizes = maxSize => {
  switch (maxSize) {
    case SM: {
      return imageSizes.SM;
    }

    case MD: {
      return imageSizes.MD;
    }

    case LG: {
      return imageSizes.LG;
    }

    default: {
      return imageSizes.ADAPTIVE;
    }
  }
};
