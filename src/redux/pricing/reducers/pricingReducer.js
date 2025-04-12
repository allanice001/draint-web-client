import {
  CHANGE_PAYMENT_SYSTEM,
  CHANGE_SOFORT_COUNTRY_CODE,
  CHANGE_USER_COUNTRY,
  CLOSE_PLAN_INFO_MODAL,
  CLOSE_SUBSCRIPTION_MODAL,
  GET_CHECKED_PLAN,
  GET_PAYPAL_EMAIL,
  HANDLE_SET_CHECKED_PLAN,
  OPEN_PLAN_INFO_MODAL,
  OPEN_SUBSCRIPTION_MODAL,
  SET_LOADING_FALSE,
  SET_LOADING_STATE,
  SET_LOADING_TRUE,
  SET_PLANS_FROM_QUERY,
  SET_PLAN_PERIOD,
  SET_SELECTED_PLAN,
  SET_SELECTED_PLAN_ERROR,
  SET_SUBSCRIPTION_MODAL,
  SET_SUBSCRIPTION_MODAL_TEXT,
  SET_TRIAL,
  SET_TRIAL_MONTH_ALL_IN,
  SET_TRIAL_MONTH_BASIC,
} from 'constants/redux/pricing';

const initialState = {
  modalOpen: false,
  infoModalOpen: false,
  modalInfoTitle: '',
  modalInfoDescription: '',
  modalInfoImg: '',
  checkedPlan: '',
  checkedPlanId: '',
  checkedPlanPrice: '',
  selectedPlan: undefined,
  selectedPlanError: false,
  plans: [],
  userCountry: 'Afghanistan',
  sofortCountryCode: 'AT',
  paymentSystem: '',
  load: false,
  payPalEmail: '',
  planPeriod: '',
  subscriptionCancelModal: false,
  subscriptionCancelModalText: '',
  isTrial: false,
  isBasicTrial: false,
  isAllInTrial: false,
  checkedPlanTrialId: '',
};

const pricingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAN_PERIOD: {
      return {
        ...state,
        planPeriod: action.payload,
      };
    }
    case SET_SELECTED_PLAN: {
      return {
        ...state,
        selectedPlan: action.payload,
      };
    }
    case SET_SELECTED_PLAN_ERROR: {
      return {
        ...state,
        selectedPlanError: action.payload,
      };
    }
    case HANDLE_SET_CHECKED_PLAN:
    case SET_PLANS_FROM_QUERY: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case OPEN_PLAN_INFO_MODAL: {
      return {
        ...state,
        infoModalOpen: true,
        modalInfoTitle: action.payload.name,
        modalInfoDescription: action.payload.description,
        modalInfoImg: action.payload.img,
      };
    }
    case CLOSE_PLAN_INFO_MODAL: {
      return {
        ...state,
        infoModalOpen: false,
        modalInfoTitle: '',
        modalInfoDescription: '',
        modalInfoImg: '',
      };
    }
    case OPEN_SUBSCRIPTION_MODAL: {
      return {
        ...state,
        modalOpen: true,
        checkedPlan: action.payload.name,
        checkedPlanId: action.payload.id,
        checkedPlanTrialId: action.payload.trialId,
        checkedPlanPrice: action.payload.price,
        planPeriod: action.payload.period === 'year' ? 'yearly' : 'monthly',
      };
    }
    case CLOSE_SUBSCRIPTION_MODAL: {
      return {
        ...state,
        modalOpen: false,
        isTrial: false,
        isAllInTrial: false,
        isBasicTrial: false,
      };
    }
    case CHANGE_PAYMENT_SYSTEM: {
      return {
        ...state,
        paymentSystem: action.payload || initialState.paymentSystem,
      };
    }
    case CHANGE_USER_COUNTRY: {
      return {
        ...state,
        userCountry: action.payload,
      };
    }
    case CHANGE_SOFORT_COUNTRY_CODE: {
      return {
        ...state,
        sofortCountryCode: action.payload,
      };
    }
    case SET_LOADING_TRUE: {
      return {
        ...state,
        load: true,
      };
    }
    case SET_LOADING_FALSE: {
      return {
        ...state,
        load: false,
      };
    }
    case SET_LOADING_STATE: {
      return {
        ...state,
        load: action.payload,
      };
    }
    case SET_SUBSCRIPTION_MODAL: {
      return {
        ...state,
        subscriptionCancelModal: !state.subscriptionCancelModal,
      };
    }
    case SET_SUBSCRIPTION_MODAL_TEXT: {
      return {
        ...state,
        subscriptionCancelModalText: action.payload,
      };
    }
    case GET_PAYPAL_EMAIL: {
      return {
        ...state,
        payPalEmail: action.payload,
      };
    }
    case GET_CHECKED_PLAN: {
      return {
        ...state,
        checkedPlan: action.payload.name,
        checkedPlanId: action.payload.id,
      };
    }
    case SET_TRIAL: {
      return {
        ...state,
        paymentSystem: action.payload.paymentSystem,
        isTrial: action.payload.checked,
      };
    }
    case SET_TRIAL_MONTH_BASIC: {
      return {
        ...state,
        paymentSystem: '',
        isAllInTrial: false,
        isBasicTrial: action.payload,
      };
    }
    case SET_TRIAL_MONTH_ALL_IN: {
      return {
        ...state,
        paymentSystem: '',
        isAllInTrial: action.payload,
        isBasicTrial: false,
      };
    }
    default:
      return state;
  }
};

export default pricingReducer;
