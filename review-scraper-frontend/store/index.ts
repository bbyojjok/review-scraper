import { Store, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import rootReducer from './modules';
import { rootSaga } from './modules/saga';

const isDevelopment = process.env.NODE_ENV === 'development';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: isDevelopment,
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(store, {
  debug: isDevelopment,
});

export default wrapper;
