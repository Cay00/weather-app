import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureSlice';
import favoritesReducer from './favoritesSlice';

/**
 * Główny Redux store aplikacji.
 * Łączy wszystkie reducery w jeden globalny stan.
 * 
 * Struktura store:
 * - temperature: Zarządza jednostką temperatury (Celsius/Fahrenheit)
 * - favorites: Zarządza listą ulubionych miast
 * 
 * Store jest opakowany w Provider w App.jsx, co umożliwia dostęp
 * do globalnego stanu we wszystkich komponentach aplikacji.
 */
export const store = configureStore({
  reducer: {
    // Reducer zarządzający jednostką temperatury
    temperature: temperatureReducer,
    // Reducer zarządzający ulubionymi miastami
    favorites: favoritesReducer,
  },
});

