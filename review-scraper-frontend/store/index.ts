import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './modules';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: isDevelopment,
  });
  return store;
};

const wrapper = createWrapper(store, {
  debug: isDevelopment,
});

export default wrapper;
