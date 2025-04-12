import { DISAPPROVED, WAITING } from 'constants/statuses';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SPACE_PREFIX_REGEX } from 'constants/global';
import { TEST } from 'constants/components/pricing';
import { actions } from 'redux/artist/reducers/atelier';
import { deleteContentByMaster } from 'redux/master/actions/atelierActions';
import { reduxForm } from 'redux-form';
import { roles } from 'helpers/get-role';
import { setIsOpenModal } from 'redux/artist/reducers/atelier/actions';

export const useAtelier = () => {
  const dispatch = useDispatch();
  const atelier = useSelector(({ artist }) => artist.atelier);
  const { permission, planName, new_permission, urls } = useSelector(
    ({ user }) => user.account
  );
  const { form } = atelier;
  const forms = useSelector(state => state.form);
  const noAtelier = !atelier.id && !atelier.isOwner;
  const notVisibleStatus =
    (atelier.status === DISAPPROVED || atelier.status === WAITING) &&
    !atelier.isOwner;
  const showEmptyImage = noAtelier || notVisibleStatus;

  const role = roles({ permission, new_permission, urls });
  const { isSuperAdmin, isAdmin, isEditor, canEditArtistBlog } = role;
  const canUse = planName !== TEST || isSuperAdmin || isEditor || isAdmin;
  const canEdit =
    (isEditor && canEditArtistBlog) ||
    (isAdmin && canEditArtistBlog) ||
    isSuperAdmin;
  const owner = atelier.status !== WAITING && atelier.isOwner;

  const onSave = useCallback(
    form => e => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(actions.saveForm(form));
      return false;
    },
    [dispatch]
  );

  const handleCreateAtelier = () => {
    dispatch(actions.createAtelier());
  };

  const connectPostForm = useMemo(
    () =>
      reduxForm({
        form: form.post,
        asyncBlurFields: [],
        onSubmit: onSave(form.post),
      }),
    [form.post, onSave]
  );

  const connectNotesForm = useMemo(
    () =>
      reduxForm({
        form: form.notes,
        asyncBlurFields: [],
        enableReinitialize: true,
        destroyOnUnmount: false,
        onSubmit: onSave(form.notes),
        initialValues: {
          topContent: atelier.notes?.first_content,
          blockquote: atelier.notes?.quote,
          bottomContent: atelier.notes?.second_content,
          primary_image: atelier.notes?.primary_image,
          small_image: atelier.notes?.small_image,
        },
      }),
    [atelier.notes, form.notes, onSave]
  );

  const connectBannerForm = useMemo(
    () =>
      reduxForm({
        form: form.banner,
        asyncBlurFields: [],
        enableReinitialize: true,
        destroyOnUnmount: false,
        onSubmit: onSave(form.banner),
        initialValues: {
          lead: atelier?.banner?.title,
          primary_image: atelier.banner?.primary_image,
          small_image: atelier.banner?.small_image,
        },
      }),
    [atelier.banner, form.banner, onSave]
  );

  const connectProcessForm = useMemo(
    () =>
      reduxForm({
        form: form.process,
        asyncBlurFields: [],
        enableReinitialize: true,
        destroyOnUnmount: false,
        onSubmit: onSave(form.process),
        initialValues: {
          process: atelier.process?.first_content,
          enjoy: atelier.process?.second_content,
          primary_image: atelier.process?.primary_image,
          small_image: atelier.process?.small_image,
        },
      }),
    [atelier.process, form.process, onSave]
  );

  const setEditMode = useCallback(
    (name, value = true) => {
      dispatch(actions.setEditMode({ name, value }));
    },
    [dispatch]
  );

  const setEditType = useCallback(
    (name, value = true) => {
      dispatch(actions.setEditType({ name, value }));
    },
    [dispatch]
  );

  const isEditMode = useCallback(
    name => {
      return atelier.editMode[name];
    },
    [atelier]
  );

  useEffect(() => {
    dispatch(actions.getAtelier());

    return () => {
      dispatch(actions.unsetStore());
    };
  }, [dispatch]);

  const aboutTitles = () => {
    return {
      title: atelier.about_title,
      subtitle: atelier.about_subtitle,
    };
  };

  const onDeletePostClick = id => {
    dispatch(deleteContentByMaster(id));
  };

  const changeModalView = type => {
    dispatch(setIsOpenModal(type));
  };

  /**
   * @param {string} formName
   * @param {string[]} fieldNames
   * @returns true if all fields are valid
   */
  const validateFields = (formName, fieldNames) => {
    const fields = forms[formName]?.values;

    if (!fields) {
      return false;
    }

    return fieldNames.every(field => {
      if (!fields[field]) {
        return false;
      }

      return !SPACE_PREFIX_REGEX.test(fields[field]);
    });
  };

  return {
    isAdmin,
    atelier,
    canEdit,
    showEmptyImage,
    canUse,
    isSuperAdmin,
    isEditor,
    validateFields,
    connectPostForm,
    connectNotesForm,
    connectBannerForm,
    connectProcessForm,
    setEditMode,
    isEditMode,
    setEditType,
    handleCreateAtelier,
    aboutTitles,
    onDeletePostClick,
    changeModalView,
    owner,
  };
};
