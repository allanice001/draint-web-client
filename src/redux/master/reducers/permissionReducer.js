import {
  SET_ACCESS_FILTERS,
  SET_PERMISSION_FILTERS,
  SET_PERMISSION_USERS,
  SET_SEARCH_FILTERS,
  UPDATE_USER_PERMISSION,
} from 'constants/redux/masterPermissions';
import { error, success } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  users: [],
  role: '',
  access: [],
  permissions: [],
  filters: {
    status: 'active',
    permission: '',
  },
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERMISSION_USERS:
      return {
        ...state,
        loading: true,
      };

    case success(UPDATE_USER_PERMISSION):
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
      };

    case success(SET_PERMISSION_USERS):
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        pagination: action.payload.pagination,
      };

    case SET_PERMISSION_FILTERS: {
      const { role } = action.payload;

      return {
        ...state,
        role: role && role,
      };
    }

    case SET_ACCESS_FILTERS: {
      return {
        ...state,
        access: action.payload,
      };
    }

    case SET_SEARCH_FILTERS: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }

    case error(UPDATE_USER_PERMISSION):
    case error(SET_PERMISSION_USERS):
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default permissionReducer;
