import { useEffect, useState } from 'react';

import { ArtworkService } from '../services/artwork-service';
import { getCountries } from 'redux/master/actions/approvalArtistsActions';
import { getYearsList } from '../helpers/search/get-years-list';
import { initialMediumList } from 'constants/search/medium-list';
import { initialOrientationList } from 'constants/search/orientation-list';
import { initialPriceList } from 'constants/search/price-list';
import { initialSizeList } from 'constants/search/size-list';
import { initialStyleList } from 'constants/search/style-list';
import { initialSurfaceList } from 'constants/search/surface-list';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const artworkService = new ArtworkService();

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const convertQueryToFormValues = (queryObject, filtersOptions) => {
  const result = {};

  Object.keys(queryObject).forEach(key => {
    switch (key) {
      case 'medium':
      case 'surface':
      case 'style':
      case 'size':
      case 'price':
      case 'orientation':
      case 'completed': {
        const item = filtersOptions[key].find(
          el =>
            el.label.toString() === queryObject[key] ||
            el.key.toString() === queryObject[key]
        );

        result[key] = `${key}-${item?.id}`;
        break;
      }
      case 'page': {
        result[key] = +queryObject[key];
        break;
      }
      default: {
        if (!!queryObject[key]) {
          result[key] = queryObject[key];
        }
      }
    }
  });

  return result;
};

const initialFiltersOptions = {
  style: initialStyleList,
  medium: initialMediumList,
  surface: initialSurfaceList,
  country: [],
  completed: [],
  price: initialPriceList,
  size: initialSizeList,
  orientation: initialOrientationList,
};

export const useSearch = () => {
  const [error, setError] = useState('');
  const [filtersOptions, setFiltersOptions] = useState(initialFiltersOptions);
  const queries = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    Promise.all([
      artworkService.getStyles(),
      artworkService.getMediums(),
      artworkService.getSurfaces(),
    ])
      .then(([style, medium, surface]) => {
        setFiltersOptions({
          style,
          medium,
          surface,
          price: initialPriceList,
          size: initialSizeList,
          orientation: initialOrientationList,
          country: artworkService.getCountries(),
          completed: getYearsList(),
        });
      })
      .catch(err => setError(err));
  }, [dispatch]);

  const filtersFormValue = convertQueryToFormValues(
    Object.fromEntries(queries.entries()),
    filtersOptions
  );

  return {
    filtersOptions,
    filtersFormValue,
    error,
  };
};
