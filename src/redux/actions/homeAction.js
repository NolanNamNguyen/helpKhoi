import { homeActions } from '../constants/homeActions';
import { REQUEST, SUCCESS, FAILED } from '../constants/action-type';

export const getDeviceDetail = (params) => ({
  type: REQUEST(homeActions.GET_DEVICE_DETAIL),
  params,
});

export const getDeviceDetailSuccess = (data) => ({
  type: SUCCESS(homeActions.GET_DEVICE_DETAIL),
  data,
});

export const getDeviceDetailFailed = (error) => ({
  type: FAILED(homeActions.GET_DEVICE_DETAIL),
  error,
});

export const login = (params, callback) => ({
  type: REQUEST(homeActions.LOGIN),
  params,
  callback,
});

export const loginSuccess = (data) => ({
  type: SUCCESS(homeActions.LOGIN),
  data,
});

export const loginlFailed = (error) => ({
  type: FAILED(homeActions.LOGIN),
  error,
});

export const logout = (params, callback) => ({
  type: REQUEST(homeActions.LOGOUT),
  params,
  callback,
});

export const getMachineId = (params) => ({
  type: REQUEST(homeActions.GET_MACHINE_ID),
  params,
});

export const getMachineIdSuccess = (data) => ({
  type: SUCCESS(homeActions.GET_MACHINE_ID),
  data,
});

export const getMachineIdFailed = (error) => ({
  type: FAILED(homeActions.GET_MACHINE_ID),
  error,
});

export const getUserFromSession = (params) => ({
  type: REQUEST(homeActions.GET_USER_FROM_SESSION),
  params,
});

export const getUserFromSessionSuccess = (data) => ({
  type: SUCCESS(homeActions.GET_USER_FROM_SESSION),
  data,
});

export const getUserFromSessionFailed = (error) => ({
  type: FAILED(homeActions.GET_USER_FROM_SESSION),
  error,
});

export const markDangerous = (params) => ({
  type: REQUEST(homeActions.MARK_DANGEROUS),
  params,
});

export const markDangerousSuccess = (data) => ({
  type: SUCCESS(homeActions.MARK_DANGEROUS),
  data,
});

export const markDangerousFailed = (error) => ({
  type: FAILED(homeActions.MARK_DANGEROUS),
  error,
});

export const createSnapShot = (params) => ({
  type: REQUEST(homeActions.CREATE_SNAPSHOT),
  params,
});

export const createSnapShotSuccess = (data) => ({
  type: SUCCESS(homeActions.CREATE_SNAPSHOT),
  data,
});

export const createSnapShotFailed = (error) => ({
  type: FAILED(homeActions.CREATE_SNAPSHOT),
  error,
});
