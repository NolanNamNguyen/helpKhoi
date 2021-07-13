import { put, all, takeEvery } from 'redux-saga/effects';
// import querystring from "querystring";
import {
  updateSolveStatusSuccess,
  updateSolveStatusFailed,
} from '../actions/appAction';
import { appActions } from '../constants/appAction';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* handleUpdateSolveStatus(data) {
  const { params } = data;
  try {
    const response = yield Api.post('solvestatus/', params);
    yield put(updateSolveStatusSuccess(response.data));
  } catch (error) {
    yield put(updateSolveStatusFailed(error.response.data));
  }
}

function* authenticateSaga() {
  yield all([
    takeEvery(REQUEST(appActions.UPDATE_SOLVE_STATUS), handleUpdateSolveStatus),
  ]);
}

export default authenticateSaga;
