import './pagination.scss';

import Pagination from 'react-js-pagination';
import React from 'react';
import { setStorageData } from '../../services/local-storage-service';

export default function PaginationControlled({
  pageName = null,
  totalPages = 1,
  page = 1,
  handler,
  style = 'light',
  type = 'default',
}) {
  const handleChange = page => {
    pageName && setStorageData(pageName, { page });
    handler(page, type);
  };

  return (
    <div
      className="pagination"
      style={totalPages <= 1 ? { display: 'none' } : {}}
    >
      <Pagination
        pageRangeDisplayed={5}
        itemsCountPerPage={1}
        activePage={page}
        totalItemsCount={totalPages}
        onChange={handleChange}
        innerClass="pagination"
        activeClass={`active ${style}`}
        itemClass={`pag-item ${style}`}
        linkClass={`pag-link ${style}`}
        prevPageText={'<'}
        firstPageText={'<<'}
        lastPageText={'>>'}
        nextPageText={'>'}
      />
    </div>
  );
}
