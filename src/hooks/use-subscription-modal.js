import { TEST } from 'constants/components/pricing';
import { VERIFIED } from 'constants/statuses';
import { roles } from 'helpers/get-role';
import { useSelector } from 'react-redux';

export const useSubscriptionModal = user => {
  const {
    planName,
    isHaveVerifiedArtworks,
    verification,
    permission,
    new_permission,
  } = user;
  const { subscriptionModal } = useSelector(store => store.notification);
  const { isAnyAdmins } = roles({
    permission: permission,
    new_permission: new_permission,
  });

  if (subscriptionModal) {
    return (
      (planName === TEST && verification === VERIFIED && !!!isAnyAdmins) ||
      (planName === TEST && isHaveVerifiedArtworks && !!!isAnyAdmins)
    );
  }
};
