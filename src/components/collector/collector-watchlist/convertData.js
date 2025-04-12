import moment from 'moment';

export const convertData = data => ({
  id: data.id,
  profile_id: data.profile_id,
  profile_account_id: data.profile_account_id,
  small_image: data.small_image || data.primary_image,
  primary_image: data.primary_image,
  title: data.title,
  width: data.width,
  weight: data.weight,
  height: data.height,
  thickness: data.thickness,
  style: data.styles,
  medium: data.mediums,
  surface: data.surfaces,
  created_at: data.artwork_created_at,
  ownerAddress: data.ownerAddress ? data.ownerAddress : {},
  purchaseHistory: data.purchaseHistory,
  for_sale: data.for_sale,
  inCart: data.inCart,
  inOffer: data.inOffer,
  completedFormatDate:
    !!data.completed && moment(new Date(+data.completed)).format('MM / YYYY'),
  isOwnerCanEditArtwork: data.isOwnerCanEditArtwork,
  ownerInfo: {
    profile_id: data?.ownerData.id,
    account_id: data?.ownerData.account_id,
    firstName: data?.ownerData.first_name,
    lastName: data?.ownerData.last_name,
    username: data?.ownerData.username,
    phone: data?.ownerData.phone,
    isEmployee: data?.ownerData.is_employee,
    employeeId: data?.ownerData.employee_id,
    employeeData: data.employeeData,
    location: data?.ownerData.location_id,
  },
  artist: {
    fullName:
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`
        : data.username,
    country: data.country,
  },
  price: data.price,
  prevPrice: data.prev_price,
});
