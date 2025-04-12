import { onPublicPage, statusList } from 'constants/masterAtelier';

import { AtelierPosts } from 'views/atelier/atelier-posts/atelier-posts';
import { MasterAtelierForm } from './masterAtelierForm';
import { MasterBlogFilter } from 'components/filters/master-blogFilter';
import { MasterBlogNav } from 'components/nav/sub/masterBlogNav';
import PaginationControlled from 'components/pagination/paginationNumbers';
import React from 'react';
import styles from 'views/master/master-blog.module.scss';
import { useMasterAtelier } from 'hooks/use-master-atelier';

export const MasterAtelier = () => {
  const {
    filters,
    handleFilterChange,
    pagination,
    setPage,
    page,
    posts,
    onStatusButtonClick,
    handleCategoryChange,
    handleTitlesSubmit,
    titles,
    editField,
    setEditField,
    fields,
    isAnalyst,
  } = useMasterAtelier();

  return (
    <>
      <MasterBlogNav />
      <div className={styles.blog_wrapper}>
        {!isAnalyst && (
          <MasterAtelierForm
            fields={fields}
            onSubmit={handleTitlesSubmit}
            titles={titles}
            setEditField={setEditField}
            editField={editField}
          />
        )}
        <div className={styles.filters_container}>
          <MasterBlogFilter
            name="status"
            inputs={statusList}
            handleFilterChange={handleFilterChange}
            value={filters.status}
          />
          <MasterBlogFilter
            name="public"
            inputs={onPublicPage}
            handleFilterChange={handleFilterChange}
            value={filters.public}
          />
        </div>
        {pagination && (
          <PaginationControlled
            handler={setPage}
            page={page}
            style={['dark']}
            totalPages={pagination.pageCount}
          />
        )}
        <AtelierPosts
          onStatusButtonClick={onStatusButtonClick}
          posts={posts}
          isAdmin={true}
          isAdminPage={true}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </>
  );
};
