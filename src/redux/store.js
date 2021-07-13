import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { createWrapper } from 'next-redux-wrapper';

import rootReducers from './rootReducer';
import rootSaga from './rootSagas';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducers, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const store = makeStore();

// export const wrapper = createWrapper(makeStore, { debug: false });
