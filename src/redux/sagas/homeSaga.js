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

function* getDeviceDetail(data) {

  try {
    const response = yield Api.post('machine/fetch_images/', data.params);
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
  console.log('ok');
  const { params } = data;
  console.log('params', params);
  try {
    const response = yield Api.post('machine/mark_dangerous/', params);
    yield put(markDangerousSuccess(response.data || ''));
  } catch (error) {
    yield put(markDangerousFailed(error.response?.data || ''));
  }
}

function* createSnapShot(data) {
  console.log('ok');
  const { params } = data;
  console.log('params', params);
  try {
    const response = yield Api.post('machine/create_snapshot/', params);
    yield put(markDangerousSuccess(response.data || ''));
  } catch (error) {
    yield put(markDangerousFailed(error.response?.data || ''));
  }
}

function* logout(data) {
  const { params, callback } = data;
  try {
    console.log('im in');
    // eslint-disable-next-line no-unused-vars
    const response = yield Api.post('machine/logout/', params);
    localStorage.removeItem(LOCAL_STORAGE.session_id);
    callback && callback();
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
    takeEvery(REQUEST(homeActions.CREATE_SNAPSHOT), createSnapShot),
  ]);
}

export default homeSaga;
