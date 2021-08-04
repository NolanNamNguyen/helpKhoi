import { globalActions } from '../constants/globalActions';

const initialState = {
  isLoading: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case globalActions.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
