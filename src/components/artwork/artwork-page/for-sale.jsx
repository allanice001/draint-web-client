import React from 'react';
import { Skeleton } from '@material-ui/lab';
import SwitcherButton from 'components/switcher/switcherButton';
import { getValidPrice } from 'helpers/getValidPrice';
import styles from './artwork-page.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';

function ForSale() {
  const {
    forSaleStatusChange,
    isOwner,
    isSold,
    currentArtwork,
    inOrder,
    loading,
    isOwnerCanEditArtwork,
    artworkId,
    artworkPrice,
    canEditRoles,
    // subscription,
    checkRequiredInfoForSale,
    forSale,
    inOffer,
  } = useArtworkPage();

  function isCanChangeForSaleStatus() {
    return (
      isSold ||
      !getValidPrice(artworkPrice) ||
      inOrder ||
      inOffer ||
      !isOwnerCanEditArtwork ||
      !(isOwner() || canEditRoles)
    );
  }

  const { ownerAddress, ownerInfo } = currentArtwork;

  function checkAddressData() {
    if (ownerAddress) {
      const {
        country,
        city,
        state,
        zipcode: postal,
        addressLine1: streetName,
      } = ownerAddress;

      return !Boolean(country && city && state && postal && streetName);
    }

    return false;
  }

  function checkUserData() {
    if (ownerInfo) {
      const { firstName, lastName } = ownerInfo;

      return !Boolean(firstName && lastName);
    }

    return false;
  }

  return loading ? (
    <Skeleton height={30} variant="text" width="100%" />
  ) : (
    <div className={styles.for_sale}>
      <SwitcherButton
        changeData={{
          id: artworkId,
          status: forSale,
        }}
        checked={forSale}
        disabled={isCanChangeForSaleStatus()}
        handleChange={forSaleStatusChange}
        subscriptionChecked={() => {}}
        title="For Sale"
        toggle
      />
      {(checkAddressData() || checkUserData()) && !forSale ? (
        <div
          className={styles.hidden_btn}
          onClick={() => checkRequiredInfoForSale()}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default ForSale;
