import { combineReducers } from 'redux';
import homeReducer from './reducers/homeReducer'
import globalReducer from './reducers/globalReducer'

export default combineReducers({
  homeReducer,
  globalReducer,
});
