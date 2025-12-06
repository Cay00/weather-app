import { createSlice } from '@reduxjs/toolkit';

// Funkcja pomocnicza do ładowania ulubionych miast z localStorage przeglądarki.
const loadFavoritesFromStorage = () => {
  try {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }
  } catch (e) {
    console.error('Error loading favorites from localStorage:', e);
  }
  return [];
};

/**
 * Redux slice zarządzający stanem ulubionych miast.
 * Przechowuje listę ID miast oznaczonych jako ulubione przez użytkownika.
 * Automatycznie synchronizuje stan z localStorage przeglądarki.
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    // Stan początkowy ładuje ulubione z localStorage przy starcie aplikacji
    favorites: loadFavoritesFromStorage(),
  },
  reducers: {
    /**
     * Przełącza status ulubionego dla danego miasta.
     * Jeśli miasto jest już ulubione - usuwa je z listy.
     * Jeśli nie jest ulubione - dodaje je do listy.
     * Automatycznie zapisuje zmiany do localStorage.
     */
    toggleFavorite: (state, action) => {
      const cityId = action.payload;
      if (state.favorites.includes(cityId)) {
        // Usuń miasto z ulubionych jeśli już jest na liście
        state.favorites = state.favorites.filter(id => id !== cityId);
      } else {
        // Dodaj miasto do ulubionych jeśli nie ma go na liście
        state.favorites.push(cityId);
      }
      // Zapisanie zaktualizowanej listy do localStorage
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
    },
    
    // Dodaje miasto do ulubionych (jeśli jeszcze nie jest ulubione).
    addFavorite: (state, action) => {
      const cityId = action.payload;
      if (!state.favorites.includes(cityId)) {
        state.favorites.push(cityId);
        localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
      }
    },
    
    // Usuwa miasto z ulubionych.
    removeFavorite: (state, action) => {
      const cityId = action.payload;
      state.favorites = state.favorites.filter(id => id !== cityId);
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
    },
  },
});

// Eksport akcji Redux - można je wywołać w komponentach przez dispatch()
export const { toggleFavorite, addFavorite, removeFavorite } = favoritesSlice.actions;

// Selector zwracający całą listę ulubionych miast.
export const selectFavorites = (state) => state.favorites.favorites;

// Selector sprawdzający czy dane miasto jest ulubione.
export const selectIsFavorite = (cityId) => (state) => {
  return state.favorites.favorites.includes(cityId);
};

// Eksport reducera - używany w konfiguracji store
export default favoritesSlice.reducer;

