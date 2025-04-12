import { CONNECT } from 'constants/routes/masterModule/modal';
import { Helmet } from 'react-helmet';
import Modal from 'views/master/modal';
import ModalConnect from 'views/master/modal-connect';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function ModalRouter({ ROOT_PATH }) {
  return (
    <>
      <Route
        exact
        path={ROOT_PATH}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Upload Examples</title>
            </Helmet>
            <Modal />
          </>
        )}
      />
      <Route
        exact
        path={ROOT_PATH + CONNECT}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Connect to Modal</title>
            </Helmet>
            <ModalConnect />
          </>
        )}
      />
    </>
  );
}
