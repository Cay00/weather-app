import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    temperature: temperatureReducer,
    favorites: favoritesReducer,
  },
});

