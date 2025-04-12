import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { WRAPPED } from 'constants/master/shipping-requests';
import { WrappedOrder } from 'models/master/wrapped-order';
import WrappedSteps from './layouts/wrapped-steps';
import { getWrappedSteps } from 'redux/master/actions/shippingRequestsActions';

function WrappedStepsMain() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getWrappedSteps(currentPage, WRAPPED));
  }, [currentPage, dispatch]);

  const { wrappedSteps, total } = useSelector(
    store => store.master.shippingRequests
  );
  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  function handlePageChange(pageValue) {
    setCurrentPage(pageValue);
  }

  return (
    <section>
      <PaginationControlled
        style={['dark']}
        totalPages={total}
        page={currentPage}
        handler={handlePageChange}
      />

      <div>
        {!!wrappedSteps.length &&
          wrappedSteps.map(WrappedOrder.create).map(order => {
            return (
              <WrappedSteps
                key={order.id}
                order={order}
                isAnalyst={isAnalyst}
              />
            );
          })}
      </div>
    </section>
  );
}

export default WrappedStepsMain;
