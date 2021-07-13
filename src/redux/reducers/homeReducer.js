import { homeActions } from '../constants/homeActions';
import { REQUEST, SUCCESS, FAILED } from '../constants/action-type';

const initialState = {
  isLoading: false,
  images: undefined,
  deviceDetail: {},
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
      };
    default:
      return state;
  }
};

export default reducer;
