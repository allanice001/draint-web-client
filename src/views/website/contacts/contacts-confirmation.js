import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import AnalyticHelper from '../../../helpers/analytic/AnalyticHelper';
import Home from '../home/home';
import { confirmContactToolSubscription } from '../../../dataLayer/contact-tool/contact-tool';
import displayMessage from '../../../redux/global/notiifcation/actions/displayMessage';
import { getStringSearchParameter } from '../../../services/global';
import { useDispatch } from 'react-redux';

const Analytic = AnalyticHelper.create();

const ContactConfirmation = () => {
  const params = useParams();
  const token = getStringSearchParameter('token');
  const dispatch = useDispatch();
  const history = useHistory();
  const { type } = params;

  const handleSubscription = useCallback(async () => {
    try {
      const analyticEvents = {
        subscribe: 'ContactSubscribed',
        unsubscribe: 'ContactUnSubscribed',
      };
      await confirmContactToolSubscription(params.id, token, type);
      Analytic.createEvent(analyticEvents[type]);
      return {
        message: `You have been ${type}d successfully`,
        type: 'success',
      };
    } catch (err) {
      const dataMessage = { type: 'error' };
      dataMessage.message = err?.response.data.message
        ? err?.response.data.message
        : 'Please try later';
      return dataMessage;
    }
  }, [params.id, token, type]);

  useEffect(() => {
    handleSubscription().then(val => {
      dispatch(displayMessage(val.message, val.type));
      history.push('/');
    });
  }, [dispatch, handleSubscription, history]);

  return <Home />;
};

export default ContactConfirmation;
