import { NAME, USERNAME } from 'constants/profile-settings';
import Icons from 'components/icons';
import React from 'react';
import { isoCountries as countries } from 'components/countries/list';
import moment from 'moment';

export function isURL(string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(string);
}

export const getStringSearchParameter = (
  needle,
  haystack = window.location.search
) => {
  const search = haystack
    .slice(1)
    .split('&')
    .find(v => v.includes(needle));
  return search !== undefined ? search.split('=')[1] : '';
};

export const getUserName = artist => {
  const default_name =
    artist?.first_name && artist?.last_name
      ? `${artist?.first_name} ${artist?.last_name}`
      : artist?.first_name || artist?.last_name || artist?.username;

  if (artist?.first_name && artist?.last_name && artist?.is_username === NAME)
    return `${artist?.first_name} ${artist?.last_name}`;

  if (artist?.username && artist?.is_username === USERNAME)
    return artist?.username;

  return default_name;
};

export const getAuthorName = slide => {
  if (slide.is_username === NAME) return slide.author;

  if (slide.username && slide.is_username === USERNAME) return slide.username;

  return slide.author;
};

export const getName = (
  first_name,
  last_name,
  placeholder = "Name isn't specified"
) =>
  first_name && last_name
    ? `${first_name} ${last_name}`
    : first_name || last_name || placeholder;

export const formatTitle = title => {
  return title
    .trim()
    .split(' ')
    .join('-');
};

export const getFullName = (first_name, last_name, username, isUsername) => {
  const default_name =
    first_name && last_name
      ? `${first_name} ${last_name}`
      : first_name || last_name || username;

  if (first_name && last_name && isUsername === NAME)
    return `${first_name} ${last_name}`;

  if (username && isUsername === USERNAME) return username;

  return default_name;
};

export const getLongCardName = (fullName, username, isUsername) => {
  const default_name = fullName ? fullName : username;

  if (fullName && isUsername === NAME) return fullName;

  if (username && isUsername === USERNAME) return username;

  return default_name;
};

export const getSize = (width, height, thickness) =>
  width && height
    ? `${width} W x ${height} H ${thickness ? `x ${thickness} Th` : ' '}`
    : "Size isn't specified";

export const splitHtmlTag = text => {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
};

export const getWeight = weight => (weight ? `${weight} g` : "isn't specified");

export const getDate = stringDate => {
  const date = new Date(stringDate);
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const month = date.toLocaleString('en-us', { month: 'long' });
  return `${month} ${day}. ${date.getFullYear()}`;
};

export const getFooterBlogDate = stringDate => {
  const date = new Date(stringDate);
  return moment(date).format('D MMMM YYYY');
};

export const getPointStars = points => {
  let stars = [];
  for (let i = 0; i < points; i++) {
    stars.push(
      <div style={{ marginRight: '5px' }}>
        <Icons.IconStar />
      </div>
    );
  }
  return stars;
};

export const getFormattedDate = stringDate => {
  const date = new Date(stringDate);

  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

  const monthData =
    date.getMonth() >= 10 ? date.getMonth() : `0${date.getMonth()}`;
  const correctMonth = Number(monthData) + 1;
  const month = correctMonth >= 10 ? correctMonth : `0${correctMonth}`;

  return `${day}.${month}.${date.getFullYear()}`;
};

export const sliceText = (text, quantity, replace = '') => {
  if (!text) return replace;
  let sliced = text.slice(0, quantity);
  if (sliced.length < text.length) {
    sliced += replace;
  }
  return sliced;
};

export const parseParams = (params = {}, options) => {
  const result = {};

  Object.keys(params).forEach(key => {
    if (options[key]) {
      const [name, param] = params[key].split('-');
      if (!param) {
        result[key] =
          key === 'country' && params[key] ? [params[key]] : params[key];
        return;
      }
      const value =
        params[key] && options[name].find(el => +el.id === +param)?.key;
      if (!value) {
        return;
      }

      result[key] = Array.isArray(value) ? value : [value];
    } else {
      if (!!params[key]) {
        result[key] = params[key];
      }
    }
  });

  return result;
};

export const modifyParams = params => {
  const modify = Object.entries(params || {})?.map(([key, value]) => [
    [`${value.toString().split('-').length > 1 ? value : key}`],
    value.toString().split('-').length > 1 ? true : value,
  ]);

  return Object.fromEntries(modify);
};

export const getCountryNameByCode = code => {
  return countries.find(item => item.ccode === code)?.cname || code;
};

export const getCountryCodeByName = name => {
  return countries.find(item => item.cname === name)?.ccode || name;
};

export const getInitialValues = search => {
  const result = {};

  Object.keys(search).forEach(key => {
    if (!search[key]) {
      return;
    }

    switch (key) {
      case 'style':
      case 'medium':
      case 'surface': {
        result[`${key}-${search[key]}`] = true;
        break;
      }

      default: {
        result[key] = search[key];
      }
    }
  });

  return result;
};

export const deleteSpacesFromUrl = str => {
  const urlArray = str.split(' ');

  const url = !!urlArray.length && urlArray.join('-');
  const lastElemIndex = url.length - 1;

  if (url[lastElemIndex] === '-') return url.slice(0, lastElemIndex);

  return url;
};
