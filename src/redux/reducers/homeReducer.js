import uuid from 'uniqid'
import { homeActions } from '../constants/homeActions';
import { REQUEST, SUCCESS, FAILED } from '../constants/action-type';

const initialState = {
  isLoading: false,
  images: [],
  listMachine: undefined,
  loadingMachineList: false,
  sessionId: undefined,
  deviceDetail: {},
  fetchImageFailed: undefined,
  newImages: undefined,
  fetchNewImage: undefined,
  imageDetail: undefined,
  loginFailed: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(homeActions.GET_DEVICE_DETAIL):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(homeActions.GET_DEVICE_DETAIL):
      return {
        ...state,
        images: action.data,
        isLoading: false,
      };
    case FAILED(homeActions.GET_DEVICE_DETAIL):
      return {
        ...state,
        images: undefined,
        isLoading: false,
        fetchImageFailed: action.error,
      };
    case REQUEST(homeActions.FETCH_IMAGE_DETAIL):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(homeActions.FETCH_IMAGE_DETAIL):
      return {
        ...state,
        imageDetail: action.data,
        isLoading: false,
      };
    case FAILED(homeActions.FETCH_IMAGE_DETAIL):
      return {
        ...state,
        imageDetail: undefined,
        isLoading: false,
      };
    case SUCCESS(homeActions.GET_NEW_IMAGE):
      return {
        ...state,
        newImages: action.data,
      };
    case FAILED(homeActions.GET_NEW_IMAGE):
      return {
        ...state,
        newImages: undefined,
        fetchNewImage: action.error,
      };
    case REQUEST(homeActions.GET_MACHINE_ID):
      return {
        ...state,
        loadingMachineList: true,
      };
    case SUCCESS(homeActions.GET_MACHINE_ID):
      return {
        ...state,
        listMachine: action.data,
        loadingMachineList: false,
      };
    case FAILED(homeActions.GET_MACHINE_ID):
      return {
        ...state,
        listMachine: undefined,
        loadingMachineList: false,
      };
    case REQUEST(homeActions.LOGIN):
      return {
        ...state,
      };
    case SUCCESS(homeActions.LOGIN):
      return {
        ...state,
        // listMachine: action.data,
        images: [],
      };
    case FAILED(homeActions.LOGIN):
      return {
        ...state,
        loginFailed: { state: action.error, renderId: uuid() },
      };
    default:
      return state;
  }
};

export default reducer;
