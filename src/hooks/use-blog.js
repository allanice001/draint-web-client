import { ARTIST, KEYWORD, PAGE, blogTabs } from 'constants/blog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { actions } from 'redux/blog';
import { resetSelectedPostToBlog } from 'redux/artist/actions/blog/actions';
import { selectCategory } from 'services/blogService';
import { useParams } from 'react-router-dom';
import useQueryParams from './useQueryParams';

export const useBlog = () => {
  const { category } = useParams();
  const queryParams = useQueryParams();
  const keyword = queryParams.get(KEYWORD);
  const artist = queryParams.get(ARTIST);
  const initialPage = queryParams.get(PAGE);

  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(+initialPage || 1);

  const categories = useSelector(state => state.blog.categories);
  const blog = useSelector(({ blog }) => blog);

  const dispatch = useDispatch();

  useEffect(() => {
    if (+initialPage) {
      setPage(+initialPage);
    }

    if (+initialPage < 1) {
      setPage(1);
    }
  }, [initialPage]);

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getPopularPosts());
    dispatch(resetSelectedPostToBlog());
    dispatch(actions.getFooterBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (!categories) {
      return;
    }

    if (category) {
      const categoryData = categories.find(({ key }) => key === category) || {};

      const categoryName = !!Object.entries(categoryData).length
        ? selectCategory(categoryData.name, ' ').toLowerCase()
        : blogTabs.MY_ATELIER;

      dispatch(
        actions.getCategoryPosts(
          {
            categoryId: categoryData.id,
            pageSize: 6,
            page,
            sortBy: sortBy === 'popular' ? 'views' : 'created_at',
            keyword,
            artist: categoryName === blogTabs.COMMUNITY ? artist : undefined,
          },
          categoryName
        )
      );
    } else {
      dispatch(actions.getPosts({ sortBy, keyword }));
    }
  }, [dispatch, category, categories, sortBy, page, keyword, artist]);

  return {
    blog,
    onSortChange: setSortBy,
    setPage,
    activeCategory: category,
    category,
    page,
  };
};
