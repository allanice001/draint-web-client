import { APPROVED, DISAPPROVED, UNVERIFIED } from 'constants/statuses';
import { Field, reduxForm } from 'redux-form';
import React, { useEffect, useState } from 'react';
import {
  deletePostByAdmin,
  saveBlogPostByMaster,
  setBlogCategories,
  setFilteredPosts,
  setFilters,
  updatePost,
} from 'redux/master/actions/blogActions';
import {
  getDataFromStorage,
  setStorageData,
} from '../services/local-storage-service';
import { useDispatch, useSelector } from 'react-redux';

import CheckIcon from '@material-ui/icons/Check';
import { MASTER_BLOG_PAGE } from '../constants/components/master/local-storage-names';
import SelectField from 'components/reduxForm/select/select';
import classnames from 'classnames';
import { permissions } from 'constants/permissions';
import store from 'redux/store';
import styles from 'views/master/master-blog.module.scss';
import theme from 'config/mui-theme';
import { useMediaQuery } from '@material-ui/core';

export const useMasterBlog = () => {
  const blogPageStorage = getDataFromStorage(MASTER_BLOG_PAGE);
  const [page, setPage] = useState(blogPageStorage?.page || 1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { posts, filters, pagination, categories, loading } = useSelector(
    store => store.master.approvalBlogs
  );
  const { account: user } = useSelector(store => store.user);

  const { profile_id: profileId, new_permission, permission } = user;

  const isSuperAdmin = permission === permissions.MASTER;
  const isAnalyst = new_permission === permissions.ANALYST && !isSuperAdmin;
  const isAdmin = new_permission === permissions.ADMIN && !isSuperAdmin;
  const isEditor = new_permission === permissions.EDITOR && !isSuperAdmin;

  const isDesktop = useMediaQuery(
    theme.breakpoints.up(theme.breakpoints.values.md)
  );

  useEffect(() => {
    dispatch(setBlogCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //initial request
  useEffect(() => {
    setStorageData(MASTER_BLOG_PAGE, { page });
    dispatch(setFilteredPosts({ ...filters, page: page, pageSize: 6 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, filters]);

  const handleFilterChange = (event, filter) => {
    setPage(1);
    dispatch(setFilters({ [filter]: event.target.value }));
  };

  const onStatusButtonClick = (id, type) => {
    const status = type === UNVERIFIED ? DISAPPROVED : APPROVED;

    if (status === DISAPPROVED) {
      dispatch(
        updatePost(id, {
          status: status,
          category_id: null,
          is_community: false,
        })
      );
      return returnInitialState();
    }

    dispatch(updatePost(id, { status: status }));

    returnInitialState();
  };

  const handleEditModeChange = post => {
    if (isAnalyst) {
      return null;
    }

    setSelectedPost(post);
    setOpen(true);
  };

  const returnInitialState = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleSingleDeletePost = async post => {
    if (isAnalyst) {
      return null;
    }

    dispatch(deletePostByAdmin(post.uuid));
    returnInitialState();

    if (!posts.length) setPage(page === 1 ? 2 : 1);
  };

  const handleSavePost = Data => {
    if (selectedPost) {
      dispatch(updatePost(selectedPost.uuid, Data));
    } else {
      dispatch(saveBlogPostByMaster(profileId, Data));
    }
    returnInitialState();
  };

  const handleSubmitCategory = () => {
    const { blogCategory } = store.getState()?.form;
    dispatch(
      updatePost(selectedPost.uuid, {
        category_id: blogCategory?.values?.category,
        is_community: '1',
      })
    );
    returnInitialState();
  };

  const getPostCategory = categoryId => {
    return categories.find(category => category.id === categoryId)?.name;
  };

  const parseCategories = (categories, isAdmin) => {
    return categories
      .filter(category =>
        isAdmin ? category.name !== 'Community' : category.name === 'Community'
      )
      .map(category => ({
        label: category.name,
        key: category.id,
        id: category.id,
        value: category.id,
      }));
  };

  const Form = reduxForm({
    form: 'blogCategory',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })(({ isAdmin, pristine }) => {
    return (
      <form className={styles.select_form} key={selectedPost.uuid}>
        <Field
          name="category"
          component={SelectField}
          placeholder="Select category"
          list={parseCategories(categories, isAdmin)}
        />
        <button
          type="button"
          onClick={handleSubmitCategory}
          className={classnames(styles.button, styles.submitButton)}
          disabled={pristine}
        >
          <CheckIcon className={styles.icon} />
        </button>
      </form>
    );
  });

  return {
    open,
    setOpen,
    isDesktop,
    returnInitialState,
    handleSingleDeletePost,
    handleSavePost,
    selectedPost,
    filters,
    handleFilterChange,
    categories,
    pagination,
    handleEditModeChange,
    setPage,
    page,
    posts,
    getPostCategory,
    setSelectedPost,
    Form,
    onStatusButtonClick,
    isAnalyst,
    isSuperAdmin,
    isAdmin,
    isEditor,
    loading,
  };
};
