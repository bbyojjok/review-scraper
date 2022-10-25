import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './modules';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: isDevelopment,
  });

const wrapper = createWrapper(store, {
  debug: isDevelopment,
});

export default wrapper;
