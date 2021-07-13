import { put, all, takeEvery } from 'redux-saga/effects';
// import querystring from "querystring";
import {
  getDeviceDetailSuccess,
  getDeviceDetailFailed,
} from '../actions/homeAction';
import { homeActions } from '../constants/homeActions';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* getDeviceDetail() {
  try {
    const response = yield Api.get('84e4c7b8-1a91-4817-b938-d9935a6b4f00');
    yield put(getDeviceDetailSuccess(response.data.images));
  } catch (error) {
    yield put(getDeviceDetailFailed(error.response.data));
  }
}

function* homeSaga() {
  yield all([
    takeEvery(REQUEST(homeActions.GET_DEVICE_DETAIL), getDeviceDetail),
  ]);
}

export default homeSaga;
