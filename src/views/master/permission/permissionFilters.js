import { permissionsFilterList, usersStatus } from 'constants/permissions';

import { MasterBlogFilter } from 'components/filters/master-blogFilter';
import React from 'react';

export const PermissionFilters = props => {
  const { className, handleFilterChange, filters } = props;

  return (
    <div className={className}>
      <MasterBlogFilter
        name="permission"
        inputs={permissionsFilterList}
        handleFilterChange={handleFilterChange}
        value={filters.permission}
      />
      <MasterBlogFilter
        name="status"
        inputs={usersStatus}
        handleFilterChange={handleFilterChange}
        value={filters.status}
      />
    </div>
  );
};
