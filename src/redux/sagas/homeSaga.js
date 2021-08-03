import { put, all, takeEvery } from 'redux-saga/effects';
// import querystring from "querystring";
import {
  getAllImageSuccess,
  getAllImageFailed,
  getNewImageSuccess,
  getNewImageFailed,
  loginSuccess,
  loginlFailed,
  getMachineIdSuccess,
  getMachineIdFailed,
  markDangerousSuccess,
  markDangerousFailed,
  fetchImageDetailFailed,
  fetchImageDetailSuccess,
} from '../actions/homeAction';
import { homeActions } from '../constants/homeActions';
import { setGlobalLoadingState } from '../actions/globalActions';
import { LOCAL_STORAGE } from '../../constants/common';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* getImages(data) {
  const { params } = data;
  console.log('123', params);
  try {
    const response = yield Api.post('machine/fetch_images/', params);
    console.log('response', response.data.images);
    params.fetch_all
      ? yield put(getAllImageSuccess(response.data.images))
      : yield put(getNewImageSuccess(response.data.images));
  } catch (error) {
    params.fetch_all
      ? yield put(getAllImageFailed(error?.response?.data || 'Error'))
      : yield put(getNewImageFailed(error?.response?.data));
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
    yield put(setGlobalLoadingState(true));
    const response = yield Api.post('machine/login/', params);
    localStorage.setItem(LOCAL_STORAGE.session_id, response.data.sid);
    callback && callback();
    yield put(loginSuccess(response.data || ''));
    yield put(setGlobalLoadingState(false));
  } catch (error) {
    console.log(error.response);
    yield put(setGlobalLoadingState(false));
    yield put(loginlFailed(error.response.data || ''));
  }
}

function* handleChangeDanger(data) {
  const { params, callback } = data;
  try {
    const response = yield Api.post('machine/mark_dangerous/', params);
    callback && callback();
    yield put(markDangerousSuccess(response.data || ''));
  } catch (error) {
    yield put(markDangerousFailed(error.response?.data || ''));
  }
}

function* createSnapShot(data) {
  const { params, callback } = data;
  try {
    const response = yield Api.post('machine/create_snapshot/', params);
    callback && callback();
    yield put(markDangerousSuccess(response.data || ''));
  } catch (error) {
    yield put(markDangerousFailed(error.response?.data || ''));
  }
}

function* getImageDetail(data) {
  const { params, callback } = data;
  try {
    const response = yield Api.post('machine/image_detail/', params);
    callback && callback(response.data);
    yield put(fetchImageDetailSuccess(response.data || ''));
  } catch (error) {
    yield put(fetchImageDetailFailed(error.response?.data || ''));
  }
}

function* logout(data) {
  const { params, callback } = data;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield Api.post('machine/logout/', { sid: params });
    yield put(getAllImageSuccess(undefined))
    yield put(getNewImageSuccess(undefined));
    localStorage.removeItem(LOCAL_STORAGE.session_id);
    callback && callback();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function* homeSaga() {
  yield all([
    takeEvery(REQUEST(homeActions.GET_DEVICE_DETAIL), getImages),
    takeEvery(REQUEST(homeActions.LOGIN), login),
    takeEvery(REQUEST(homeActions.LOGOUT), logout),
    takeEvery(REQUEST(homeActions.MARK_DANGEROUS), handleChangeDanger),
    takeEvery(REQUEST(homeActions.GET_MACHINE_ID), getMachineId),
    takeEvery(REQUEST(homeActions.CREATE_SNAPSHOT), createSnapShot),
    takeEvery(REQUEST(homeActions.FETCH_IMAGE_DETAIL), getImageDetail),
  ]);
}

export default homeSaga;
