import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Home from 'views/website/home/home';
import { unsubscribeOfArtistUnlogged } from 'redux/dashboard/actions/gallaryActions';
import { useDispatch } from 'react-redux';

const PersonalSubscriptionUnsubscribe = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleUnsubscribe = useCallback(async () => {
    return dispatch(unsubscribeOfArtistUnlogged(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    handleUnsubscribe().then(() => {
      return history.push('/');
    });
  }, [dispatch, handleUnsubscribe, history]);

  return <Home />;
};

export default PersonalSubscriptionUnsubscribe;
