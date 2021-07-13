import { appActions } from '../constants/appAction';
import { REQUEST, SUCCESS, FAILURE } from '../constants/action-type';

const initialState = {
  isLoading: false,
  currentUser: undefined,
  loginError: undefined,
  getMeFailed: false,
  currentUserDetail: undefined,
  problemList: [],
  getProblemError: undefined,
  alert: {
    state: false,
    message: undefined,
    type: '',
    cssClass: '',
  },
  submitAnswerFailed: false,
  problemDetail: undefined,
  topicList: undefined,
  enrollClassSuccess: false,
  classList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(appActions.LOGIN):
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST(appActions.LOGOUT):
      return {
        ...state,
        currentUserDetail: undefined,
        currentUser: undefined,
      };
    case SUCCESS(appActions.LOGIN):
      return {
        ...state,
        currentUser: action.data,
        isLoading: false,
      };
    case SUCCESS(appActions.GET_PROBLEM_LIST):
      return {
        ...state,
        problemList: action.data,
      };
    case REQUEST(appActions.SHOW_ALERT):
      return {
        ...state,
        alert: { ...state.alert, ...action.data },
      };
    case REQUEST(appActions.RESET_ALERT):
      return {
        ...state,
        alert: { ...state.alert, state: false },
        submitAnswerFailed: false,
        enrollClassSuccess: false,
      };
    case FAILURE(appActions.SUBMIT_ANSWER):
      return {
        ...state,
        submitAnswerFailed: true,
      };
    case SUCCESS(appActions.GET_USER_BY_EMAIL):
      return {
        ...state,
        currentUserDetail: action.data,
        getMeFailed: false,
      };
    case SUCCESS(appActions.GET_TOPIC_LIST):
      return {
        ...state,
        topicList: action.data,
      };
    case FAILURE(appActions.GET_USER_BY_EMAIL):
      return {
        ...state,
        getMeFailed: true,
      };
    case FAILURE(appActions.LOGIN):
      return {
        ...state,
        isLoading: false,
        loginError: action.error,
      };
    case REQUEST(appActions.RESET_ERROR):
      return {
        ...state,
        loginError: undefined,
      };
    case FAILURE(appActions.GET_USER):
      return {
        ...state,
        getMeFailed: action.data,
      };
    case SUCCESS(appActions.GET_PROBLEM_DETAIL):
      return {
        ...state,
        problemDetail: action.data,
      };
    case SUCCESS(appActions.GET_CLASS_LIST):
      return {
        ...state,
        classList: action.data,
      };
    case SUCCESS(appActions.ENROLL_CLASS):
      return {
        ...state,
        enrollClassSuccess: true,
      };
    case FAILURE(appActions.GET_PROBLEM_DETAIL):
      return {
        ...state,
        problemDetail: undefined,
        getProblemError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
