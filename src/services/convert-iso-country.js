import { countryName, isoCountry } from '../components/lib';

function convertIsoCountry(country, fullName = false) {
  if (country) {
    if (fullName) {
      return countryName(country);
    }

    return isoCountry(country);
  }

  return false;
}

export default convertIsoCountry;
