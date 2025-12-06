import { createSlice } from '@reduxjs/toolkit';

// Ładowanie ulubionych z localStorage
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

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: loadFavoritesFromStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const cityId = action.payload;
      if (state.favorites.includes(cityId)) {
        state.favorites = state.favorites.filter(id => id !== cityId);
      } else {
        state.favorites.push(cityId);
      }
      // Zapisywanie do localStorage
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
    },
    addFavorite: (state, action) => {
      const cityId = action.payload;
      if (!state.favorites.includes(cityId)) {
        state.favorites.push(cityId);
        localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const cityId = action.payload;
      state.favorites = state.favorites.filter(id => id !== cityId);
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite, addFavorite, removeFavorite } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.favorites;

export const selectIsFavorite = (cityId) => (state) => {
  return state.favorites.favorites.includes(cityId);
};

export default favoritesSlice.reducer;

