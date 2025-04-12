import {
  GET_MASTER_STATISTICS_DATA_SUCCESS,
  SET_MASTER_STATISTICS_DATA_DATE_FILTER,
  SET_MASTER_STATISTICS_DATA_FILTER,
  SET_MASTER_STATISTICS_DATA_OPTIONS_FILTER,
  SET_MASTER_STATISTICS_INITIAL_LOADING,
  SET_MASTER_STATISTICS_LOADING,
} from 'constants/redux/masterStatistics';

const initialState = {
  initialLoading: false,

  artists: {
    loading: false,
    data: [],

    filter: {
      period: 'quarter',
    },

    options: {
      registered: true,
      deleted: true,
      recovered: true,
      login: true,
      verified: true,
      unverified: true,
    },

    date: {
      from: null,
      to: null,
    },
  },

  collectors: {
    loading: false,
    data: [],

    filter: {
      period: 'quarter',
    },

    options: {
      registered: true,
      deleted: true,
      recovered: true,
      login: true,
      verified: true,
      unverified: true,
    },

    date: {
      from: null,
      to: null,
    },
  },

  artworks: {
    loading: false,
    data: [],

    filter: {
      period: 'quarter',
      counter: '',
    },

    options: {
      created: true,
      // sold: true,
      // ordered: true,
      deleted: true,
      recovered: true,
      verified: true,
      unverified: true,
    },

    date: {
      from: null,
      to: null,
    },
  },

  subscriptions: {
    loading: false,
    data: [],

    filter: {
      period: 'quarter',
      type: 'type',
    },

    options: {
      test: true,
      all_in_one_monthly: true,
      all_in_one_yearly: true,
      basic_monthly: true,
      basic_yearly: true,
    },

    options2: {
      Test: true,
      Stripe: true,
      PayPal: true,
    },

    date: {
      from: null,
      to: null,
    },
  },
};

function statisticsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MASTER_STATISTICS_INITIAL_LOADING: {
      return {
        ...state,
        initialLoading: !state.initialLoading,
      };
    }
    case SET_MASTER_STATISTICS_LOADING: {
      return {
        ...state,

        [action.chart]: {
          ...state[action.chart],
          loading: !state[action.chart].loading,
        },
      };
    }
    case GET_MASTER_STATISTICS_DATA_SUCCESS: {
      return {
        ...state,

        [action.chart]: {
          ...state[action.chart],
          data: action.payload,
          loading: false,
        },
      };
    }
    case SET_MASTER_STATISTICS_DATA_FILTER:
    case SET_MASTER_STATISTICS_DATA_OPTIONS_FILTER:
    case SET_MASTER_STATISTICS_DATA_DATE_FILTER: {
      return {
        ...state,

        [action.chart]: {
          ...state[action.chart],
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export default statisticsReducer;
