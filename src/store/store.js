import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureSlice';

export const store = configureStore({
  reducer: {
    temperature: temperatureReducer,
  },
});

