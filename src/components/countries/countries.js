import { isoCountries } from './list';

export function isoCountry(countryName) {
  const response = isoCountries.find(country => country['cname'] === countryName || country['ccode'] === countryName);
  return response !== undefined ? response['ccode'] : null;
}

export function countryName(isoCountry) {
  const response = isoCountries.find(country => country['cname'] === isoCountry || country['ccode'] === isoCountry);
  return response !== undefined ? response['cname'] : null;
}
