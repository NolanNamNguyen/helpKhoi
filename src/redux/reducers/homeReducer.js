import { homeActions } from '../constants/homeActions';
import { REQUEST, SUCCESS, FAILED } from '../constants/action-type';

const initialState = {
  isLoading: false,
  images: undefined,
  listMachine: undefined,
  loadingMachineList: false,
  sessionId: undefined,
  deviceDetail: {},
  fetchImageFailed: undefined,
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
        fetchImageFailed: action.error
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
        loadingMachineList: true,
      };
    case SUCCESS(homeActions.LOGIN):
      return {
        ...state,
        // listMachine: action.data,
        loadingMachineList: false,
      };
    case FAILED(homeActions.LOGIN):
      return {
        ...state,
        // listMachine: undefined,
        loadingMachineList: false,
      };
    default:
      return state;
  }
};

export default reducer;
