import {
  DONT_HAVE_ANY_BLOG_POSTS,
  DONT_HAVE_ANY_PAINTINGS,
  DONT_HAVE_ANY_SOLD_ARTWORKS,
  DONT_HAVE_ANY_VERIFIED_ARTWORKS,
} from 'constants/components/artworks.contants';
import {
  GET_PREVIEW_TEMPLATE_SUCCESS,
  RESET_RECIPIENTS,
  SET_ACTIVE_MESSAGE,
  SET_ATTACHMENTS,
  SET_CONTACT,
  SET_CONTACTS,
  SET_DEFAULT_STATE,
  SET_DELETE_CONTACT,
  SET_DELETE_MESSAGE,
  SET_DELETE_MODE_FALSE,
  SET_DELETE_MODE_TRUE,
  SET_EDIT_MODE_FALSE,
  SET_EDIT_MODE_TRUE,
  SET_GALLERY_LOADING,
  SET_IS_CAN_USE,
  SET_MESSAGES,
  SET_MODAL_FALSE,
  SET_MODAL_TRUE,
  SET_PREVIEW_MODAL,
  SET_RECIPIENTS,
  SET_RESET_QUILL,
  TOGGLE_CONTACTS_LIST,
  TOGGLE_HISTORY_LIST,
  UNSET_CONTACT,
  UNSET_RECIPIENTS,
} from 'constants/redux/dashboardGallery';

import { Permissions } from 'models/user-permission';
import { Types } from 'constants/permissions';
import axios from 'dataLayer/axiosInstance';
import { deleteContact as deleteContactAction } from 'dataLayer/contact-tool/contact-tool';
import { deleteMessage as deleteMessageAction } from 'dataLayer/contact-tool/contact-tool';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getStatsError } from 'redux/master/actions/newslettersActions';

export const resetRecipients = () => ({
  type: RESET_RECIPIENTS,
});

export const resetActiveMessage = () => ({
  type: SET_DEFAULT_STATE,
});

export const setIsCanUse = payload => ({
  type: SET_IS_CAN_USE,
  payload,
});

export const setResetQuillMessage = payload => ({
  type: SET_RESET_QUILL,
  payload,
});

export const unsetRecipients = payload => ({
  type: UNSET_RECIPIENTS,
  payload,
});

export const setRecipients = payload => ({
  type: SET_RECIPIENTS,
  payload,
});

export const handleOpenModal = () => ({
  type: SET_MODAL_TRUE,
});

export const handleCloseModal = () => ({
  type: SET_MODAL_FALSE,
});

export const handlePreviewModal = payload => ({
  type: SET_PREVIEW_MODAL,
  payload,
});

export const setContact = payload => ({
  type: SET_CONTACT,
  payload,
});

export const unsetContact = payload => ({
  type: UNSET_CONTACT,
  payload,
});


export const setEditModeTrue = () => ({
  type: SET_EDIT_MODE_TRUE,
});

export const setEditDeleteTrue = () => ({
  type: SET_DELETE_MODE_TRUE,
});

export const deleteContact = contact => dispatch => {
  deleteContactAction(contact.id)
    .then(() => {
      dispatch({ type: SET_DELETE_CONTACT, payload: contact.id });
      dispatch(unsetContact());
      dispatch(displayMessage('Contact was deleted'));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const deleteMessage = id => dispatch => {
  deleteMessageAction(id)
    .then(() => {
      dispatch({ type: SET_DELETE_MESSAGE, payload: id });
      dispatch(displayMessage('Message is deleted'));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const showMessageOptionsActions = (res, template) => dispatch => {
  const { name } = template;
  const isEmpty = !res[0].value.length;

  if (isEmpty) {
    switch (name) {
      case 'new_artwork_for_sale':
        dispatch(displayMessage(DONT_HAVE_ANY_VERIFIED_ARTWORKS, 'warning'));
        break;
      case 'new_blog_post':
        dispatch(displayMessage(DONT_HAVE_ANY_BLOG_POSTS, 'warning'));
        break;
      case 'sold_artwork':
        dispatch(displayMessage(DONT_HAVE_ANY_SOLD_ARTWORKS, 'warning'));
        break;
      default:
        dispatch(displayMessage(DONT_HAVE_ANY_PAINTINGS, 'warning'));
    }
  }
};

export const closeDeleteMode = id => ({
  type: SET_DELETE_MODE_FALSE,
  payload: id,
});

export const setEditModeFalse = () => ({
  type: SET_EDIT_MODE_FALSE,
});

export const setContacts = payload => ({
  type: SET_CONTACTS,
  payload,
});

export const setHistory = payload => {
  return {
    type: SET_MESSAGES,
    payload,
  };
};

export const getPreviewTemplateSuccess = payload => ({
  type: GET_PREVIEW_TEMPLATE_SUCCESS,
  payload,
});

export const setLoading = payload => ({
  type: SET_GALLERY_LOADING,
  payload,
});

export const setAttachments = payload => ({
  type: SET_ATTACHMENTS,
  payload,
});

export const handleResetRecipients = flag => dispatch => {
  if (!flag) {
    dispatch(resetRecipients());
  }
};

export const handleRecipients = (checked, contactId) => dispatch => {
  if (checked) {
    dispatch(setRecipients(contactId));
  } else {
    dispatch(unsetRecipients(contactId));
  }
};

export const checkedPermission = () => (dispatch, getState) => {
  const state = getState();
  const permissions = Permissions.create(state.user.account);
  const check = permissions.hasAccess(Types.ContactToolEmail);
  dispatch(setIsCanUse(check));
};

export const closeEditMode = () => dispatch => {
  dispatch(setEditModeFalse());
  dispatch(unsetContact());
};

export const openEditMode = id => dispatch => {
  dispatch(setContact(id));
  dispatch(setEditModeTrue());
};

export const openDeleteMode = id => dispatch => {
  dispatch(setContact(id));
  dispatch(setEditDeleteTrue());
};

export const sendMessage = data => dispatch => {
  if (!data.recipients.length) {
    dispatch(displayMessage('Please add recipients to send email', 'error'));
  } else {
    dispatch(setLoading());
    axios
      .post('/api/contacts/send-messages', data)
      .then(() => {
        dispatch(displayMessage('Message is sent successfully'));
      })
      .then(() => {
        dispatch(getMessages(data.profile_id));
      })
      .catch(() => {
        dispatch(displayMessage('Send messages error', 'error'));
        dispatch(setLoading());
      });
  }
};

export const updateContact = data => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/contacts/update-contact', data)
    .then(res => {
      dispatch(getContacts());
      dispatch(closeEditMode());
      dispatch(displayMessage('Contact successfully updated'));
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message;
      dispatch(displayMessage(message, 'error'));
      dispatch(setLoading());
    });
};

export const createContact = data => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/contacts/create-contact', data)
    .then(res => {
      dispatch(getContacts());
      dispatch(handleCloseModal());
      dispatch(
        displayMessage(
          'Contact successfully created. Contact should confirm email address.'
        )
      );
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message;
      dispatch(displayMessage(message, 'error'));
      dispatch(setLoading());
    });
};

export const getContacts = () => (dispatch, getState) => {
  const form = getState().form.contactList;
  const profileId = getState().user.account.profile_id;

  let params = {
    search: '',
    sort: '',
    filter: '',
  };

  if (form) {
    params = { ...params, ...(getState().form.contactList?.values || {}) };
  }

  dispatch(setLoading());
  axios
    .get(
      `/api/contacts/get-contacts?profileId=${profileId}&sort=${params.sort}&filter=${params.filter}&search=${params.search}`
    )
    .then(res => {
      dispatch(setContacts(res.data.data));
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message;
      dispatch(displayMessage(message, 'error'));
      dispatch(setLoading());
    });
};

export const getMessages = () => (dispatch, getState) => {
  const form = getState().form.contactList;
  const profileId = getState().user.account.profile_id;

  let params = {
    search: '',
    sort: '',
  };

  if (form) {
    params = { ...params, ...(getState().form.contactList?.values || {}) };
  }

  dispatch(setLoading());
  axios
    .get(
      `/api/contacts/get-messages?profileId=${profileId}&sort=${params.sort}&search=${params.search}`
    )
    .then(res => {
      dispatch(setHistory(res.data));
    })
    .catch(error => {
      dispatch(displayMessage('Error receiving messages', 'error'));
      dispatch(setLoading());
    });
};

export const toggleHistory = payload => {
  return {
    payload,
    type: TOGGLE_HISTORY_LIST,
  };
};

export const toggleContacts = payload => {
  return {
    payload,
    type: TOGGLE_CONTACTS_LIST,
  };
};

// History page

export const setActiveMessage = id => ({
  type: SET_ACTIVE_MESSAGE,
  payload: id,
});

export const getTemplate = data => dispatch => {
  axios
    .post('/api/contacts/get-template', data)
    .then(res => dispatch(getPreviewTemplateSuccess(res.data)))
    .catch(err => dispatch(getStatsError(err.message)));
};
