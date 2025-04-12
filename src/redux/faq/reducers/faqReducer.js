import {
  CREATE_QUESTION,
  CREATE_TOPIC,
  DELETE_QUESTION,
  DELETE_TOPIC,
  EDIT_CATEGORY,
  EDIT_QUESTION,
  SET_CATEGORIES,
  SET_FAQ_DATA,
  UPDATE_TOPIC,
} from 'constants/redux/faq';
import { error, initialState, success } from 'helpers/redux-helpers/helper';

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAQ_DATA:
    case SET_CATEGORIES:
    case UPDATE_TOPIC:
    case DELETE_TOPIC:
    case EDIT_CATEGORY:
    case EDIT_QUESTION:
    case DELETE_QUESTION:
    case CREATE_TOPIC:
    case CREATE_QUESTION:
      return {
        ...state,
        loader: true,
      };
    case success(SET_FAQ_DATA):
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case success(SET_CATEGORIES):
      return {
        ...state,
        categories: action.payload,
        loader: false,
      };
    case success(CREATE_TOPIC):
      return {
        ...state,
        data: {
          ...state.data,
          topics: [...state.data.topics, { ...action.payload, questions: [] }],
        },
      };
    case success(CREATE_QUESTION):
      return {
        ...state,
        data: {
          ...state.data,
          topics: state.data.topics.map(item =>
            item.id === action.payload.topic_id
              ? {
                  ...item,
                  questions: [...item.questions, action.payload],
                }
              : item
          ),
        },
      };
    case success(UPDATE_TOPIC):
      return {
        ...state,
        data: {
          ...state.data,
          topics: state.data.topics.map(topic =>
            topic.id === action.payload.id
              ? {
                  ...action.payload,
                  questions: topic.questions,
                }
              : topic
          ),
        },
        loader: false,
      };
    case success(EDIT_CATEGORY):
      return {
        ...state,
        categories: state.categories.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case success(DELETE_TOPIC):
      return {
        ...state,
        data: {
          ...state.data,
          topics: state.data.topics.filter(
            topic => topic.id !== action.payload
          ),
        },
        loader: false,
      };
    case success(EDIT_QUESTION):
      return {
        ...state,
        data: {
          ...state.data,
          topics: state.data.topics.map(topic =>
            topic.id === action.payload.topicId
              ? {
                  ...topic,
                  questions: topic.questions.map(question =>
                    question.id === action.payload.id
                      ? {
                          id: action.payload.id,
                          title: action.payload.title,
                          content: action.payload.content,
                        }
                      : question
                  ),
                }
              : topic
          ),
        },
        loader: false,
      };
    case success(DELETE_QUESTION):
      return {
        ...state,
        data: {
          ...state.data,
          topics: state.data.topics.map(topic =>
            topic.id === action.payload.topicId
              ? {
                  ...topic,
                  questions: topic.questions.filter(
                    item => item.id !== action.payload.questionId
                  ),
                }
              : topic
          ),
        },
      };
    case error(SET_FAQ_DATA):
    case error(SET_CATEGORIES):
    case error(UPDATE_TOPIC):
    case error(DELETE_TOPIC):
    case error(EDIT_CATEGORY):
    case error(EDIT_QUESTION):
    case error(DELETE_QUESTION):
    case error(CREATE_TOPIC):
    case error(CREATE_QUESTION):
      return {
        ...state,
        loader: false,
        error: true,
      };
    default:
      return state;
  }
};

export default faqReducer;
