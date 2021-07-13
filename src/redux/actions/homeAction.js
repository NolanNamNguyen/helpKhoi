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
