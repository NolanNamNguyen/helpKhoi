import { globalActions } from '../constants/globalActions';

export const setGlobalLoadingState = (data) => ({
  type: globalActions.SET_LOADING_STATE,
  data,
});
