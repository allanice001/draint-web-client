import { Field } from 'redux-form';
import FiltersList from './filters-list/filters-list';
import Icons from 'components/icons';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import SelectField from 'components/reduxForm/select/select';
import { TabType } from 'constants/search.constants';
import styles from '../../search-page.module.scss';

export const getFilters = ({
  type,
  isOpen,
  isOpenCountryFilter,
  filtersOptions,
  matchesMd,
  setOpenCountryFilter,
  mapOpen,
  handleChange,
}) => {
  const countryFilter = (
    <Field
      onChange={handleChange}
      arrowStyles={styles.arrow}
      component={SelectField}
      isOpen={isOpen}
      isOpenCountryFilter={isOpenCountryFilter}
      isSearch
      list={filtersOptions.country}
      matchesMd={matchesMd}
      name="country"
      placeholder="all countries"
      selectClassName={styles.select}
      setOpenCountryFilter={setOpenCountryFilter}
    />
  );

  const titleFilter = (
    <Field
      onChange={handleChange}
      label=" "
      name="title"
      endpoint={<Icons.SearchSmall className={styles.icon} />}
      className={styles.filter}
      component={Input}
      placeholder="find paintings by name"
    />
  );

  const nameFilter = (
    <Field
      onChange={handleChange}
      label=" "
      name="name"
      endpoint={<Icons.SearchSmall className={styles.icon} />}
      className={styles.filter}
      component={Input}
      placeholder="find artist by name"
    />
  );

  const list = [
    <Field
      onChange={handleChange}
      label=" "
      name="hashtag"
      endpoint={<Icons.Hashtag className={styles.icon} />}
      className={styles.filter}
      component={Input}
      placeholder="hashtag search"
    />,
    <FiltersList
      handleChange={handleChange}
      label="Price range"
      list={filtersOptions.price}
      name="price"
    />,
    <FiltersList
      handleChange={handleChange}
      label="Size"
      list={filtersOptions.size}
      name="size"
    />,
    <FiltersList
      handleChange={handleChange}
      label="Perspective"
      list={filtersOptions.orientation}
      name="orientation"
    />,
    <FiltersList
      handleChange={handleChange}
      label="Medium"
      list={filtersOptions.medium}
      name="medium"
    />,
    <FiltersList
      handleChange={handleChange}
      label="Style"
      list={filtersOptions.style}
      name="style"
    />,
    <FiltersList
      handleChange={handleChange}
      label="Surface"
      list={filtersOptions.surface}
      name="surface"
    />,
    <Field
      onChange={handleChange}
      arrowStyles={styles.arrow}
      component={SelectField}
      list={filtersOptions.completed}
      name="completed"
      placeholder="year completed"
      selectClassName={styles.select}
      yearCompleted
    />,
  ];

  if (type === TabType.Artist) {
    list.unshift(nameFilter);
  }

  if (type === TabType.Artwork) {
    list.unshift(titleFilter);
  }

  if (!mapOpen) {
    list.unshift(countryFilter);
  }

  return list;
};
