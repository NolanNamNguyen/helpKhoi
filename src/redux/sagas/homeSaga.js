import { put, all, takeEvery } from 'redux-saga/effects';
// import querystring from "querystring";
import {
  getDeviceDetailSuccess,
  getDeviceDetailFailed,
  loginSuccess,
  loginlFailed,
  getMachineIdSuccess,
  getMachineIdFailed,
  markDangerousSuccess,
  markDangerousFailed,
} from '../actions/homeAction';
import { homeActions } from '../constants/homeActions';
import { LOCAL_STORAGE } from '../../constants/common';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* getDeviceDetail() {
  try {
    const response = yield Api.get('84e4c7b8-1a91-4817-b938-d9935a6b4f00');
    yield put(getDeviceDetailSuccess(response.data.images));
  } catch (error) {
    yield put(getDeviceDetailFailed(error?.response?.data || 'Error'));
  }
}

function* getMachineId() {
  try {
    const response = yield Api.get('machine/get_machines/');
    yield put(getMachineIdSuccess(response.data.machines));
  } catch (error) {
    yield put(getMachineIdFailed(error?.response?.data || 'Error'));
  }
}

function* login(data) {
  const { params, callback } = data;
  try {
    const response = yield Api.post('machine/login/', params);
    localStorage.setItem(LOCAL_STORAGE.session_id, response.data.sid);
    callback && callback();
    yield put(loginSuccess(response.data || ''));
  } catch (error) {
    yield put(loginlFailed(error.response.data || ''));
  }
}

function* decline(data) {
  const { params } = data;
  try {
    const response = yield Api.post('mark_dangerous', params);
    yield put(markDangerousSuccess(response.data || ''));
  } catch (error) {
    yield put(markDangerousFailed(error.response.data || ''));
  }
}

function* logout(data) {
  const { params } = data;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield Api.post('logout', params);
    localStorage.removeItem(LOCAL_STORAGE.session_id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function* homeSaga() {
  yield all([
    takeEvery(REQUEST(homeActions.GET_DEVICE_DETAIL), getDeviceDetail),
    takeEvery(REQUEST(homeActions.LOGIN), login),
    takeEvery(REQUEST(homeActions.LOGOUT), logout),
    takeEvery(REQUEST(homeActions.MARK_DANGEROUS), decline),
    takeEvery(REQUEST(homeActions.GET_MACHINE_ID), getMachineId),
  ]);
}

export default homeSaga;
