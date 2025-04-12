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

const initialState = {
  loading: false,
  contacts: [],
  contact: [],
  editMode: false,
  deleteMode: false,
  setOpenModal: false,
  recipients: [],
  history: [],
  attachments: [],
  previewTemplate: '',
  activeMessage: null,
  isHistory: false,
  isContacts: true,
  isCanUse: false,
  isQuillMessage: false,
  isSendMessage: false,
  closePreviewModal: false,
};

function contactToolReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_RECIPIENTS: {
      return {
        ...state,
        recipients: [],
      };
    }
    case SET_IS_CAN_USE: {
      return {
        ...state,
        isCanUse: action.payload,
      };
    }
    case SET_ATTACHMENTS: {
      return {
        ...state,
        attachments: action.payload,
      };
    }
    case SET_RESET_QUILL: {
      return {
        ...state,
        isQuillMessage: action.payload,
      };
    }
    case UNSET_RECIPIENTS: {
      state.recipients = state.recipients.filter(c => c.id !== action.payload);
      return {
        ...state,
        recipients: state.recipients,
      };
    }
    case GET_PREVIEW_TEMPLATE_SUCCESS: {
      return {
        ...state,
        previewTemplate: action.payload,
      };
    }
    case SET_RECIPIENTS: {
      state.recipients.push(
        ...state.contacts.filter(c => c.id === action.payload)
      );
      return {
        ...state,
        recipients: [...state.recipients],
      };
    }
    case SET_EDIT_MODE_TRUE: {
      return {
        ...state,
        editMode: true,
      };
    }
    case SET_DEFAULT_STATE: {
      return {
        ...state,
        activeMessage: null,
      };
    }
    case SET_DELETE_MODE_TRUE: {
      return { ...state, deleteMode: true };
    }
    case SET_DELETE_MODE_FALSE: {
      return { ...state, deleteMode: false };
    }
    case SET_EDIT_MODE_FALSE: {
      return {
        ...state,
        editMode: false,
      };
    }
    case SET_DELETE_CONTACT: {
      const contacts = state.contacts.filter(val => val.id !== action.payload);
      return { ...state, contacts: [...contacts] };
    }
    case UNSET_CONTACT: {
      return {
        ...state,
        contact: [],
      };
    }
    case SET_CONTACT: {
      return {
        ...state,
        contact: [
          ...state.contacts.filter(contact => contact.id === action.payload),
        ],
      };
    }
    case SET_CONTACTS: {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case SET_MESSAGES: {
      return {
        ...state,
        history: action.payload,
      };
    }

    case SET_MODAL_TRUE: {
      return {
        ...state,
        setOpenModal: true,
      };
    }
    case SET_MODAL_FALSE: {
      return {
        ...state,
        setOpenModal: false,
      };
    }
    case SET_PREVIEW_MODAL: {
      return {
        ...state,
        closePreviewModal: action.payload,
      };
    }

    case TOGGLE_HISTORY_LIST: {
      return {
        ...state,
        isHistory: action.payload,
      };
    }

    case TOGGLE_CONTACTS_LIST: {
      return {
        ...state,
        isContacts: action.payload,
      };
    }

    case SET_ACTIVE_MESSAGE: {
      const message =
        state.history.find(el => el.id === action.payload) || null;

      return {
        ...state,
        activeMessage: message,
      };
    }
    case SET_DELETE_MESSAGE: {
      const messages = state.history.filter(val => val.id !== action.payload);
      return { ...state, history: [...messages] };
    }
    default:
      return state;
  }
}

export default contactToolReducer;
