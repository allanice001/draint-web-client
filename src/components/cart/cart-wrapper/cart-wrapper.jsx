import * as Button from 'components/shared/button';
import React, { useEffect } from 'react';
import ArrowIcon from 'components/icons/arrow';
import Breadcrumbs from 'components/artwork/artwork-page-breadcrumbs/artwork-page-breadcrumbs';
import { emptyRateMessage } from 'redux/cart/actions/cart-actions';
import styles from './cart-wrapper.module.scss';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWelcomeModal from 'hooks/use-welcome-modal/use-welcome-modal';

const paths = [
  { url: '/', label: 'Home' },
  { url: '/shopping-cart', label: 'Cart' },
];

export function CartWrapper(props) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const { summary, handleCheckout, isEmptyCart, items } = props;

  useWelcomeModal();

  const isRateLoad = items.filter(item => item.rateLoad === true).length !== 0;
  const isRateError = items.filter(item => item.rateError).length !== 0;

  useEffect(() => {
    if (!isRateLoad) dispatch(emptyRateMessage(isRateError));
  }, [isRateLoad, isRateError, dispatch]);

  function isDisabled() {
    return isEmptyCart || isRateLoad || isRateError;
  }

  return (
    <section>
      <Breadcrumbs list={paths} sm />
      <div className={`container ${styles.wrapper}`}>{props.children}</div>

      <div className={styles.root}>
        <section className={styles.footer_wrapper}>
          <div className="container">
            <div className={styles.footer}>
              <div className={styles.total}>Total: {`€ ${summary}`}</div>

              <Button.Primary
                className={styles.button}
                sm
                disabled={isDisabled()}
                onClick={handleCheckout}
                icon={isDesktop && <ArrowIcon />}
              >
                Checkout
              </Button.Primary>
            </div>
          </div>
        </section>

        <div className={styles.shadow} />
      </div>
    </section>
  );
}
