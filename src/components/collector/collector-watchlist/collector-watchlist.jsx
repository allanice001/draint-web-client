import {
  ARTWORKS_WAS_NOT_ADDED_TO_WATCHLIST,
  ON_THE_RESALE_TITLE,
  ON_THE_SALE_TITLE,
  OPTION_TO_SORT_IN_WATCHLIST,
  SORT,
} from 'constants/components/collector-watchlist';
import React, { useEffect, useRef, useState } from 'react';
import {
  deleteFromWatchlist,
  getWatchlistData,
} from 'redux/dashboard/actions/watchlistActions';
import { useDispatch, useSelector } from 'react-redux';
import ArtworkOfferModal from 'components/artwork/artwork-page-offer-modal/artwork-page-offer-modal';
import ArtworkSalesHistory from 'views/website/artworks/layouts/artwork-sales-history';
import AuctionModal from 'components/order/auction-modal/auction-modal';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import Pagination from './components/pagination/pagination';
import SelectCustomized from 'components/select-customized/select-customized';
import { Spinner } from 'components/lib';
import WatchlistButtons from './components/WatchlistButtons';
import classnames from 'classnames';
import { convertData } from './convertData';
import { initialRequest } from 'redux/artwork/actions/artworkActions';
import { pageScroll } from 'services/pageScroller';
import styles from './collector-watchlist.module.scss';

function CollectorWatchlist() {
  const { sale, resale } = useSelector(
    state => state.dashboard.watchlist.watchlist
  );
  const [salePage, setSalePage] = useState(sale.pagination.page || 1);
  const [resalePage, setResalePage] = useState(resale.pagination.page || 1);
  const [saleFilter, setSaleFilter] = useState(
    sale.pagination.filter || OPTION_TO_SORT_IN_WATCHLIST[0].key
  );
  const [resaleFilter, setResaleFilter] = useState(
    resale.pagination.filter || OPTION_TO_SORT_IN_WATCHLIST[0].key
  );
  const ratesFetching = useSelector(
    store => store.artwork.artworkData.currentArtwork.ratesFetching
  );
  const user = useSelector(store => store.user.account);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const titleClasses = classnames('group-title', styles.title);
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const scrollToRef = ref => pageScroll(ref.current.offsetTop);

  useEffect(() => {
    dispatch(
      getWatchlistData({ salePage, resalePage, saleFilter, resaleFilter })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentArtwork) {
      dispatch(
        initialRequest({
          id: currentArtwork.id,
          cartHash: localStorage.cartId,
        })
      );
    }
  }, [currentArtwork, dispatch]);

  const setSalePagination = page => {
    pageScroll(0);
    dispatch(getWatchlistData({ salePage: page, saleFilter, resalePage: '' }));
    setSalePage(page);
  };

  const setResalePagination = page => {
    scrollToRef(myRef);
    dispatch(
      getWatchlistData({ resalePage: page, resaleFilter, salePage: '' })
    );
    setResalePage(page);
  };

  const setSaleFiltration = filter => {
    pageScroll(0);
    dispatch(
      getWatchlistData({ salePage: 1, saleFilter: filter, resalePage: '' })
    );
    setSaleFilter(filter);
  };

  const setResaleFiltration = filter => {
    scrollToRef(myRef);
    dispatch(
      getWatchlistData({ resalePage: 1, resaleFilter: filter, salePage: '' })
    );
    setResaleFilter(filter);
  };

  const removeFromWatchlist = ({ artworkId, isSale, filter, page }) => {
    let correctPage = page;
    if (isSale) {
      pageScroll(0);
      if (sale.data.length === 1 && salePage > 1) {
        correctPage = page - 1;
      }
      dispatch(
        deleteFromWatchlist({
          artworkId,
          salePage: correctPage,
          resalePage: '',
          saleFilter: filter,
        })
      );
    } else {
      if (resale.data.length === 1 && resalePage > 1) {
        correctPage = page - 1;
      }
      dispatch(
        deleteFromWatchlist({
          artworkId,
          resalePage: correctPage,
          salePage: '',
          resaleFilter: filter,
        })
      );
    }
  };

  if (user.loading) return <Spinner full />;

  return (
    <>
      <ArtworkOfferModal isWatchList watchListArtwork={currentArtwork} />

      <section className={styles.wrapper}>
        <div className="container">
          <div className={styles.header}>
            <h3 className={titleClasses}>{ON_THE_SALE_TITLE}</h3>
            <div className={styles.select_wrapper}>
              {!!sale.data.length && (
                <SelectCustomized
                  valueToSet={sale.pagination.filter}
                  setFilter={setSaleFiltration}
                  options={OPTION_TO_SORT_IN_WATCHLIST}
                  label={SORT}
                />
              )}
            </div>
          </div>
          <ul className={styles.list}>
            {sale.data.length
              ? sale.data.map(artwork => {
                  const artworkConverted = convertData(artwork);
                  return (
                    <li
                      key={artworkConverted.id}
                      className={styles.watchlistElement}
                    >
                      <CollectorArtwork artwork={artworkConverted} sale />
                      <WatchlistButtons
                        sale
                        artworkConverted={artworkConverted}
                        removeFromWatchlist={removeFromWatchlist}
                        page={salePage}
                        filter={saleFilter}
                        setCurrentArtwork={setCurrentArtwork}
                        ratesFetching={ratesFetching}
                      />
                    </li>
                  );
                })
              : ARTWORKS_WAS_NOT_ADDED_TO_WATCHLIST}
          </ul>
          {!!sale.data.length && (
            <Pagination
              page={sale.pagination.page}
              pages={sale.pagination?.pageCount}
              setPage={setSalePagination}
            />
          )}
        </div>
      </section>
      <section className={styles.wrapper} ref={myRef}>
        <div className="container">
          <div className={styles.header}>
            <h3 className={titleClasses}>{ON_THE_RESALE_TITLE}</h3>
            <div className={styles.select_wrapper}>
              {!!resale.data.length && (
                <SelectCustomized
                  valueToSet={resale.pagination.filter}
                  setFilter={setResaleFiltration}
                  options={OPTION_TO_SORT_IN_WATCHLIST}
                  label={SORT}
                />
              )}
            </div>
          </div>
          <ul className={styles.list}>
            {resale.data.length
              ? resale.data.map(artwork => {
                  const artworkConverted = convertData(artwork);
                  return (
                    <li
                      key={artworkConverted.id}
                      className={styles.watchlistElement}
                    >
                      <CollectorArtwork artwork={artworkConverted} resale />
                      <div className={styles.sales_history_wrapper}>
                        <ArtworkSalesHistory
                          purchaseHistory={artworkConverted.purchaseHistory}
                          inWatchlist
                        />
                      </div>
                      <WatchlistButtons
                        artworkConverted={artworkConverted}
                        removeFromWatchlist={removeFromWatchlist}
                        page={resalePage}
                        filter={resaleFilter}
                        setCurrentArtwork={setCurrentArtwork}
                        ratesFetching={ratesFetching}
                      />
                    </li>
                  );
                })
              : ARTWORKS_WAS_NOT_ADDED_TO_WATCHLIST}
          </ul>
          {!!resale.data.length && (
            <Pagination
              page={resale.pagination.page}
              pages={resale.pagination?.pageCount}
              setPage={setResalePagination}
            />
          )}
        </div>
      </section>
      <AuctionModal />
    </>
  );
}

export default CollectorWatchlist;
