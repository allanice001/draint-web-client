import { Field, reduxForm } from 'redux-form';
import { INVENTORY, SALE } from 'constants/artwork-sale-statuses';
import {
  OFFER,
  PRICE,
  RESALE,
} from 'constants/components/artwork-gallery/constants';
import React, { useEffect, useRef, useState } from 'react';
import {
  changeArtworkSalePrice,
  changeArtworkSaleStatus,
  getUserArtworks,
} from 'redux/dashboard/actions/gallaryActions';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { Artwork } from 'models/artwork';
import { COLLECTOR_ARTWORKS_FORM } from 'constants/components/forms';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import { LIST_OF_PAGE_SIZE } from 'constants/components/homepage';
import NumberInput from 'components/reduxForm/input/number-input';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { pageScroll } from 'services/pageScroller';
import { price } from 'components/reduxForm/validators';
import { setPrevPrice } from 'helpers/artowork-card/set-prev-price';
import styles from './collector-artworks.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

const priceKey = id => `${PRICE}-${id}`;
const resaleKey = id => `${RESALE}-${id}`;
const offerKey = id => `${OFFER}-${id}`;

const Analytic = AnalyticHelper.create();

const getIdFromKey = key => ({
  id: key.slice(key.indexOf('-') + 1, key.length),
  type: key.slice(0, key.indexOf('-')),
});

function CollectorArtworks(props) {
  const {
    artworks,
    getUserArtworks,
    accountLoading,
    artworkPagination: pagination,
    formError,
  } = props;
  const [pageSize, setPageSize] = useState(6);
  const titleClasses = classnames('group-title', styles.title);
  const collectorArtworksRef = useRef();
  useCollectorTheme(collectorArtworksRef);

  useEffect(() => {
    getUserArtworks();
    Analytic.createEvent('PageView');
  }, [getUserArtworks]);

  function onPriceBlur(event) {
    const { name: inputName, value: newPrice } = event.target;
    const { id } = getIdFromKey(inputName);
    const [artwork] = artworks.filter(val => val.id === id);
    const prevPrice = setPrevPrice(newPrice, artwork.price);

    if (!formError[`${PRICE}-${id}`]) {
      Analytic.createEvent('CollectorChangeArtworkPrice', {
        value: newPrice,
        old_value: artwork.price,
      });

      props.changeArtworkSalePrice(id, newPrice, prevPrice);
    }
  }

  const artworkForm = artwork => {
    return (
      <div className={styles.artwork__form} ref={collectorArtworksRef}>
        <div className={styles.sale_statuses}>
          <span className={styles.sale_text}>
            Status:{' '}
            <span className={styles.sale_status}>
              {!artwork.isOwnerCanEditArtwork ? INVENTORY : SALE}
            </span>
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Set price</span>
          <Field
            component={NumberInput}
            className={styles.input}
            classNameWrapper={styles.input_wrapper_width}
            classNameEndPoint={styles.endpoint}
            classNameError={styles.error}
            endpoint="€"
            handleOnBlur={onPriceBlur}
            name={priceKey(artwork.id)}
            disabled={props.loading || !artwork.isOwnerCanEditArtwork}
            validate={[price]}
            formName={COLLECTOR_ARTWORKS_FORM}
          />
        </div>
      </div>
    );
  };

  const artworksView = artworks.map(Artwork.create).map(artwork => (
    <li className={styles.artwork} key={artwork.id}>
      <CollectorArtwork artwork={artwork}>
        {artworkForm(artwork)}
      </CollectorArtwork>
    </li>
  ));

  function handlePage(page) {
    pageScroll(100);
    getUserArtworks(page, pageSize);
  }

  function handelPageSize(limit) {
    pageScroll(100);
    setPageSize(limit);
    getUserArtworks(1, limit);
  }

  if (accountLoading) return <Spinner full />;

  return (
    <section className={styles.artworks}>
      <div className="container">
        <h3 className={titleClasses}>My artwork</h3>
        <form onSubmit={props.handleSubmit}>
          <ul>{artworksView}</ul>
        </form>

        {pagination.rowCount > 6 && (
          <div className={styles.pagination_wrapper}>
            <Pagination
              listOfPageSize={LIST_OF_PAGE_SIZE}
              page={pagination.page}
              maxCount={pagination.rowCount}
              pages={pagination.pageCount}
              setPage={page => {
                handlePage(page);
              }}
              setCount={limit => {
                handelPageSize(limit);
              }}
              count={artworks.length}
            />
          </div>
        )}
      </div>
    </section>
  );
}

const mapStateToProps = state => {
  const { account = {} } = state.user;
  const { artworks = [], artworkPagination } = state.dashboard.gallery;
  const initialValues = {};

  if (artworks.length) {
    artworks.forEach(el => {
      const resale = el.for_sale;
      const { price } = el;
      const offer = el.for_sale;

      initialValues[resaleKey(el.id)] = resale;
      initialValues[priceKey(el.id)] = price;
      initialValues[offerKey(el.id)] = offer;
    });
  }

  return {
    username: account.username,
    accountLoading: account.loading,
    loading: state.dashboard.gallery.loading,
    formError: state?.form.collectorArtworks?.syncErrors || [],
    artworks,
    artworkPagination,
    initialValues,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeArtworkSaleStatus,
      getUserArtworks,
      changeArtworkSalePrice,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: COLLECTOR_ARTWORKS_FORM,
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmit: () => null,
  })(CollectorArtworks)
);
