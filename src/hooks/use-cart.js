import {
  calculateCartTotal,
  removeCatItem,
  setCartItems,
} from 'redux/cart/actions/cart-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { COLLECTOR_SIGN_UP } from 'constants/links';
import getCartItemsResponse from 'redux/cart/thunks/get-cart-items-request';
import handleCheckUnfinishedOrders from 'redux/cart/thunks/check-unfinished-orders';
import proceedToCheckoutChange from 'redux/checkout/actions/proceedToCheckoutChange';
import { setInitialCheckoutStep } from 'redux/checkout/actions/set-initial-checkout-step';
import { useHistory } from 'react-router-dom';

export const useCart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartId = localStorage.getItem('cartId');
  const cartItems = useSelector(store => store.cart.cartData.cartItems);
  const loading = useSelector(store => store.cart.cartData.fetchItems);
  const loadCartItems = useSelector(store => store.cart.cartData.loadCartItems);
  const { cartTotal } = useSelector(store => store.cart.cartData);
  const [openModal, setOpenModal] = useState(false);
  const isEmptyCart = Boolean(cartItems.length === 0);
  const user = useSelector(store => store.user.account);
  const checkout = useSelector(store => store.checkout);

  useEffect(() => {
    if (cartId) {
      dispatch(setCartItems([]));
      dispatch(getCartItemsResponse());
    }
  }, [dispatch, cartId]);

  useMemo(() => {
    dispatch(setInitialCheckoutStep());
  }, [dispatch]);

  useMemo(() => {
    if (cartItems.length && user.id) dispatch(handleCheckUnfinishedOrders());
  }, [user, cartItems, dispatch]);

  useMemo(() => {
    dispatch(calculateCartTotal(cartItems));
  }, [dispatch, cartItems]);

  useMemo(() => {
    !Boolean(cartItems.length) && dispatch(proceedToCheckoutChange(false));
  }, [dispatch, cartItems]);

  useMemo(() => {
    if (user.id) {
      setOpenModal(false);
    }
  }, [user.id]);

  function proceedToCheckout() {
    dispatch(proceedToCheckoutChange(true));
    setOpenModal(false);
  }

  async function handleProceedToCheckout() {
    if (cartItems.length && user.id) {
      const isUnfinished = await dispatch(handleCheckUnfinishedOrders());

      if (isUnfinished) {
        dispatch(setCartItems([]));
        return dispatch(getCartItemsResponse());
      }
    }

    if (user.token && !user.is_artist) {
      return proceedToCheckout();
    }

    setOpenModal(true);
  }

  function removeItem(artworkId, sellerId) {
    const buyerId = user.profile_id;
    dispatch(removeCatItem(cartId, artworkId, buyerId, sellerId));
  }

  function handleCloseDialogue() {
    setOpenModal(false);
  }

  function handleProceedWithoutAccount() {
    setOpenModal(false);
    history.push(COLLECTOR_SIGN_UP);
  }

  function changeSummaryInfo(cartItems) {
    dispatch(calculateCartTotal(cartItems));
  }

  return {
    checkout,
    cartItems,
    cartTotal,
    changeSummaryInfo,
    removeItem,
    loading,
    handleProceedToCheckout,
    isEmptyCart,
    loadCartItems,
    openModal,
    handleCloseDialogue,
    handleProceedWithoutAccount,
  };
};
