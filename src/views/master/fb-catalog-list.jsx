import './fb-catalog-list.scss';

import * as Button from 'components/shared/button';

import {
  AVAILABILITIES,
  FB_CATALOG_FORM,
  PRODUCT_CONDITION,
} from 'constants/components/master/fb-catalog';
import React, { useEffect, useMemo, useState } from 'react';
import {
  changeCatalogItem,
  closeFbCatalogSnackbar,
  createCSV,
  deletedFromList,
  getCatalog,
  getCatalogItem,
  resetCSVflag,
  setEditMode,
  updateCatalogItem,
} from 'redux/master/actions/fbCatalogActions';
import { connect, useSelector } from 'react-redux';
import { getFormSyncErrors, getFormValues } from 'redux-form';
import CatalogCard from './CatalogCard';
import FbCatalogEdit from './fbCatalogModal';
import { MasterFBCatalogNav } from 'components/nav/sub/fbCatalog';
import PaginationControlled from 'components/pagination/paginationNumbers';
import SearchBar from 'components/searchBar/searchBar';
import { bindActionCreators } from 'redux';

const settings = require('settings.json');

const api_server = settings[process.env.NODE_ENV].api_server;

const FbCatalogList = ({ actions }) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);

  const {
    catalogList,
    openEdit,
    catalogItem,
    flagCsv,
    pagination,
  } = useSelector(store => store.master.fbCatalog);

  const state = useSelector(store => store);

  const formValues = getFormValues(FB_CATALOG_FORM)(state);

  const formSyncErrors = getFormSyncErrors(FB_CATALOG_FORM)(state);

  const isDisabled = !!Object.keys(formSyncErrors).length;

  useEffect(() => {
    actions.getCatalog({ page: page, pageSize: 6, query: query });
  }, [actions, page, query]);

  useMemo(() => {
    if (!catalogList.length && pagination.page > 1) {
      actions.resetCSVflag();
      setPage(pagination.page - 1);
    }
  }, [actions, catalogList.length, pagination.page]);

  const removeFromList = id => {
    actions.deletedFromList(id, page, pagination);
  };

  const handleOpenEditModal = id => {
    actions.getCatalogItem(id);
  };

  const handleCloseEditModal = () => {
    actions.setEditMode();
  };

  const saveItem = () => {
    actions.updateCatalogItem(formValues, pagination);
    actions.setEditMode();
  };

  const createCsv = () => {
    actions.createCSV();
  };

  const handleFlagCsv = () => {
    actions.resetCSVflag();
  };

  const handleSearch = value => {
    setQuery(value);
  };

  return (
    <div>
      <FbCatalogEdit
        open={openEdit}
        catalogItem={catalogItem}
        handleClose={handleCloseEditModal}
        availabilities={AVAILABILITIES}
        productConditions={PRODUCT_CONDITION}
        saveItem={saveItem}
        isDisabled={isDisabled}
      />

      <MasterFBCatalogNav />

      <div
        className="search-bar-wrapper"
        style={{ justifyContent: 'space-between' }}
      >
        <SearchBar handleSearch={handleSearch} value={query} />
        {catalogList.length !== 0 && (
          <div className="create-button-wrapper">
            {!flagCsv ? (
              <Button.Primary className="primary-button" onClick={createCsv}>
                Create CSV
              </Button.Primary>
            ) : (
              <a
                className="primary-button"
                onClick={handleFlagCsv}
                href={`${api_server}/catalog.csv`}
              >
                Download CSV
              </a>
            )}
          </div>
        )}
      </div>

      <div id="catalog-list-wrapper">
        {pagination && (
          <PaginationControlled
            handler={setPage}
            page={page}
            style={['dark']}
            totalPages={pagination?.pageCount}
          />
        )}

        {!catalogList.length ? (
          <h2>The catalog is empty</h2>
        ) : (
          <div className="catalog-wrapper">
            {catalogList.map(catalog => (
              <CatalogCard
                key={catalog.artwork_id}
                catalog={catalog}
                handleOpenEditModal={handleOpenEditModal}
                removeFromList={removeFromList}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  fbCatalog: store.master.fbCatalog,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    {
      getCatalog,
      deletedFromList,
      getCatalogItem,
      setEditMode,
      changeCatalogItem,
      updateCatalogItem,
      createCSV,
      resetCSVflag,
      closeFbCatalogSnackbar,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(FbCatalogList);
