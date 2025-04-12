import {
  createNewSlideByAdmin,
  deleteSlide,
  getAllSlides,
  updateSlideByAdmin,
  updateSlideStatus,
} from 'redux/master/actions/homepageActions';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from 'constants/components/message-statuses';
import { LIMIT_OF_SLIDES_MESSAGE } from 'constants/messages';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { parseArtworkURL } from '../helpers/homepage/parseArtworkURL';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useMasterHomepage = () => {
  const dispatch = useDispatch();
  const { homepageSlider } = useSelector(state => state.form);
  const { allSlides } = useSelector(state => state.master.homepage);

  const disableArtwork =
    !!homepageSlider?.values?.image ||
    !!homepageSlider?.values?.author ||
    !!homepageSlider?.values?.imageTitle;
  const disableCustomFields = !!homepageSlider?.values?.artworkId;

  const isDesktop = useMediaQuery('(min-width: 960px)');

  useEffect(() => {
    dispatch(getAllSlides());
  }, [dispatch]);

  const handleUpdateSlideSubmit = values => {
    dispatch(
      updateSlideByAdmin({
        ...values,
        artworkId: parseArtworkURL(values.artworkId),
      })
    );
  };

  const handleCreateSlideSubmit = () => {
    const artworkUrl = homepageSlider.values?.artworkId;

    const values = {
      ...homepageSlider.values,
      artworkId: parseArtworkURL(artworkUrl),
    };
    homepageSlider.values && dispatch(createNewSlideByAdmin(values));
  };

  const roleBySlideId = slideId =>
    allSlides.find(({ id }) => id === slideId).show_for_role;

  const slidesFilteredByRole = role =>
    allSlides.filter(({ show_for_role }) => show_for_role === role);

  const disableChangeStatus = useCallback(
    slideId => {
      if (allSlides.length === 0) {
        return false;
      }
      const showFor = roleBySlideId(slideId);
      const slidesForRole = slidesFilteredByRole(showFor);
      return (
        !!slidesForRole.length &&
        slidesForRole.filter(({ is_active }) => is_active).length >= 4
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allSlides]
  );

  const handleChangeStatus = useCallback(
    (id, status) => {
      const active = status === 'verified';
      if (disableChangeStatus(id) && active) {
        return dispatch(displayMessage(LIMIT_OF_SLIDES_MESSAGE, ERROR));
      }
      dispatch(updateSlideStatus(id, { status: active }));
    },
    [disableChangeStatus, dispatch]
  );

  const handleDeleteSlide = useCallback(
    id => {
      dispatch(deleteSlide(id));
    },
    [dispatch]
  );

  return {
    isDesktop,
    handleUpdateSlideSubmit,
    handleCreateSlideSubmit,
    disableArtwork,
    disableCustomFields,
    disableChangeStatus,
    handleChangeStatus,
    handleDeleteSlide,
    allSlides,
  };
};
