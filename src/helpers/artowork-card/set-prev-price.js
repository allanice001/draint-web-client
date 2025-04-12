import { INT_PRICE, STR_PRICE } from 'constants/artwork';

export const setPrevPrice = (newPrice, prevPrice) => {
  if (newPrice) {
    if (newPrice !== INT_PRICE || newPrice !== STR_PRICE) {
      return Number(newPrice) !== Number(prevPrice) ? prevPrice : null;
    }

    return null;
  }

  return null;
};
