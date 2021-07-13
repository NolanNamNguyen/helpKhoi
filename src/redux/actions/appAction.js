import { appActions } from '../constants/appAction';
import { REQUEST, SUCCESS, FAILED } from '../constants/action-type';

export const login = (params) => ({
  type: REQUEST(appActions.LOGIN),
  params,
});

export const logOut = (params) => ({
  type: REQUEST(appActions.LOGOUT),
  params,
});

export const getUser = () => ({
  type: REQUEST(appActions.GET_USER),
});

export const getUserFailed = (data) => ({
  type: FAILED(appActions.GET_USER),
  data,
});

export const getUserByEmail = (params) => ({
  type: REQUEST(appActions.GET_USER_BY_EMAIL),
  params,
});

export const getUserByEmailSuccess = (data) => ({
  type: SUCCESS(appActions.GET_USER_BY_EMAIL),
  data,
});

export const getUserByEmailFailed = (error) => ({
  type: FAILED(appActions.GET_USER_BY_EMAIL),
  error,
});

export const loginSuccess = (data) => ({
  type: SUCCESS(appActions.LOGIN),
  data,
});

export const loginFailed = (error) => ({
  type: FAILED(appActions.LOGIN),
  error,
});

export const resetLoginError = () => ({
  type: REQUEST(appActions.RESET_ERROR),
});

export const getProblemList = (params) => ({
  type: REQUEST(appActions.GET_PROBLEM_LIST),
  params,
});

export const getProblemListSuccess = (data) => ({
  type: SUCCESS(appActions.GET_PROBLEM_LIST),
  data
});

export const getProblemListFailed = (error) => ({
  type: FAILED(appActions.GET_PROBLEM_LIST),
  error,
});

export const getProblemDetail = (params) => ({
  type: REQUEST(appActions.GET_PROBLEM_DETAIL),
  params,
});

export const getProblemDetailSuccess = (data) => ({
  type: SUCCESS(appActions.GET_PROBLEM_DETAIL),
  data
});

export const getProblemDetailFailed = (error) => ({
  type: FAILED(appActions.GET_PROBLEM_DETAIL),
  error,
});

export const submitAnswer = (params, callback) => ({
  type: REQUEST(appActions.SUBMIT_ANSWER),
  params,
  callback,
});

export const submitAnswerSuccess = (data) => ({
  type: SUCCESS(appActions.SUBMIT_ANSWER),
  data
});

export const submitAnswerFailed = (error) => ({
  type: FAILED(appActions.SUBMIT_ANSWER),
  error,
});

export const getTopicList = (params) => ({
  type: REQUEST(appActions.GET_TOPIC_LIST),
  params,
});

export const getTopicListSuccess = (data) => ({
  type: SUCCESS(appActions.GET_TOPIC_LIST),
  data
});

export const getTopicListFailed = (error) => ({
  type: FAILED(appActions.GET_TOPIC_LIST),
  error,
});

export const deleteTopic = (params) => ({
  type: REQUEST(appActions.DELETE_TOPIC),
  params,
});

export const deleteTopicSuccess = (data) => ({
  type: SUCCESS(appActions.DELETE_TOPIC),
  data
});

export const deleteTopicFailed = (error) => ({
  type: FAILED(appActions.DELETE_TOPIC),
  error,
});

export const updateTopic = (topicId, params) => ({
  type: REQUEST(appActions.UPDATE_TOPIC),
  topicId,
  params,
});

export const updateTopicSuccess = (data) => ({
  type: SUCCESS(appActions.UPDATE_TOPIC),
  data
});

export const updateTopicFailed = (error) => ({
  type: FAILED(appActions.UPDATE_TOPIC),
  error,
});

export const createTopic = (params) => ({
  type: REQUEST(appActions.CREATE_TOPIC),
  params,
});

export const createTopicSuccess = (data) => ({
  type: SUCCESS(appActions.CREATE_TOPIC),
  data
});

export const createTopicFailed = (error) => ({
  type: FAILED(appActions.CREATE_TOPIC),
  error,
});

export const verifyTopic = (params) => ({
  type: REQUEST(appActions.ADMIN_VERIFY_TOPIC),
  params,
});

export const verifyTopicSuccess = (data) => ({
  type: SUCCESS(appActions.ADMIN_VERIFY_TOPIC),
  data
});

export const verifyTopicFailed = (error) => ({
  type: FAILED(appActions.ADMIN_VERIFY_TOPIC),
  error,
});

export const showAlert = (data) => ({
  type: REQUEST(appActions.SHOW_ALERT),
  data,
});

export const resetShowAlert = (params) => ({
  type: REQUEST(appActions.RESET_ALERT),
  params,
});

export const updateExp = (params) => ({
  type: REQUEST(appActions.UPDATE_EXP),
  params,
});

export const updateExpSuccess = (data) => ({
  type: SUCCESS(appActions.UPDATE_EXP),
  data
});

export const updateExpFailed = (error) => ({
  type: FAILED(appActions.UPDATE_EXP),
  error,
});

export const getClassList = (params) => ({
  type: REQUEST(appActions.GET_CLASS_LIST),
  params,
});

export const getClassListSuccess = (data) => ({
  type: SUCCESS(appActions.GET_CLASS_LIST),
  data
});

export const getClassListFailed = (error) => ({
  type: FAILED(appActions.GET_CLASS_LIST),
  error,
});

export const enrollInClass = (params) => ({
  type: REQUEST(appActions.ENROLL_CLASS),
  params,
});

export const enrollInClassSuccess = (data) => ({
  type: SUCCESS(appActions.ENROLL_CLASS),
  data
});

export const enrollInClassFailed = (error) => ({
  type: FAILED(appActions.ENROLL_CLASS),
  error,
});

export const updateSolveStatus = (params) => ({
  type: REQUEST(appActions.UPDATE_SOLVE_STATUS),
  params,
});

export const updateSolveStatusSuccess = (data) => ({
  type: SUCCESS(appActions.UPDATE_SOLVE_STATUS),
  data
});

export const updateSolveStatusFailed = (error) => ({
  type: FAILED(appActions.UPDATE_SOLVE_STATUS),
  error,
});

