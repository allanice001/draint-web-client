import React, { useEffect, useState } from 'react';
import {
  changeCollectorsOfferStatus,
  getFullSalesOffers,
  getInComingSalesOffers,
  getOutComingSalesOffers,
} from 'redux/dashboard/actions/salesActions';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import AuctionModal from 'components/order/auction-modal/auction-modal';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import InComingItem from './components/offerItems/in-coming-item';
import { Offer } from 'models/offer';
import OutComingItem from './components/offerItems/out-coming-item';
import Pagination from './components/pagination/pagination';
import PropTypes from 'prop-types';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './collector-offers.module.scss';

const Analytic = AnalyticHelper.create();

function CollectorOffers({
  inComing,
  outComing,
  actions,
  accountLoading,
  isOpen,
}) {
  const [inComingPage, setInComingPage] = useState(1);
  const [inComingCount, setInComingCount] = useState(2);
  const [outComingCount, setOutComingCount] = useState(2);
  const [outComingPage, setOutComingPage] = useState(1);
  const titleClasses = classnames('group-title', styles.title);

  useEffect(() => {
    actions.getFullSalesOffers(1, 1);
    Analytic.createEvent('PageView');
  }, [actions]);

  const setInComingPagination = page => {
    actions.getInComingSalesOffers(page, inComingCount);
    setInComingPage(page);
  };

  const setInComingPaginationCount = count => {
    actions.getInComingSalesOffers(1, count);
    setInComingCount(count);
  };

  const setOutComingPagination = page => {
    actions.getOutComingSalesOffers(page, outComingCount);
    setOutComingPage(page);
  };

  const setOutComingPaginationCount = count => {
    actions.getOutComingSalesOffers(1, count);
    setOutComingCount(count);
  };

  if (accountLoading) return <Spinner full />;

  return (
    <>
      <section className={styles.wrapper}>
        <div className="container">
          <h3 className={`group-title ${styles.title}`}>Incoming offers</h3>

          <ul className={styles.list}>
            {inComing?.data
              .map(item => Offer.create(item))
              .map(offer => (
                <li key={offer.id} className={styles.offer}>
                  <CollectorArtwork artwork={offer.artwork} inComing />
                  <InComingItem
                    changeOfferStatus={param => {
                      Analytic.createEvent('CollectorOfferStatusChanged');
                      actions.changeCollectorsOfferStatus(param);
                    }}
                    offer={offer}
                    page={inComingPage}
                    pageCount={inComingCount}
                  />
                </li>
              ))}
          </ul>
          <Pagination
            count={inComing?.data.length}
            maxCount={inComing.pagination?.rowCount}
            page={inComingPage}
            pages={inComing.pagination?.pageCount}
            setCount={setInComingPaginationCount}
            setPage={setInComingPagination}
            type="in"
          />
        </div>
      </section>

      <section className={styles.wrapper}>
        <div className="container">
          <h3 className={titleClasses}>Outcoming offers</h3>
          <ul className={styles.list}>
            {outComing?.data
              .map(item => Offer.create(item))
              .map(offer => (
                <li key={offer.id} className={styles.offer}>
                  <CollectorArtwork artwork={offer.artwork} inComing />
                  <OutComingItem
                    offer={offer}
                    page={outComingPage}
                    pageCount={outComingCount}
                  />
                </li>
              ))}
          </ul>
          <Pagination
            count={outComing?.data.length}
            maxCount={outComing.pagination?.rowCount}
            page={outComingPage}
            pages={outComing.pagination?.pageCount}
            setCount={setOutComingPaginationCount}
            setPage={setOutComingPagination}
            type="out"
          />
        </div>
      </section>

      {isOpen && <AuctionModal />}
    </>
  );
}

CollectorOffers.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.func).isRequired,
  inComing: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    pagination: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  outComing: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    pagination: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const { inComing, outComing } = state.dashboard.sales.collectorsOffers;
  const user = state.user.account;

  return {
    accountLoading: user.loading,
    isOpen: state.dashboard.orders.auctionModal,

    inComing: {
      data: inComing?.data,
      pagination: inComing?.pagination,
    },

    outComing: {
      data: outComing?.data,
      pagination: outComing?.pagination,
    },
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getFullSalesOffers,
      changeCollectorsOfferStatus,
      getInComingSalesOffers,
      getOutComingSalesOffers,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectorOffers);
