import { NAVBAR_COUNTRIES_COUNT } from 'constants/navbar';
import { isoCountries } from 'components/countries/list';

export const getRandomCountries = () => {
  let countries = [];
  for (let i = 0; i < NAVBAR_COUNTRIES_COUNT; i++) {
    countries.push(
      isoCountries[Math.floor(Math.random() * isoCountries.length)]
    );
  }

  return countries;
};
