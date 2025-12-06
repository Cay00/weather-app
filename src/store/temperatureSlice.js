import { createSlice } from '@reduxjs/toolkit';

// Ładowanie jednostki temperatury z localStorage
const loadTemperatureUnitFromStorage = () => {
  try {
    const savedUnit = localStorage.getItem('temperatureUnit');
    if (savedUnit === 'C' || savedUnit === 'F') {
      return savedUnit;
    }
  } catch (e) {
    console.error('Error loading temperature unit from localStorage:', e);
  }
  return 'C'; // Domyślnie Celsius
};

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    unit: loadTemperatureUnitFromStorage(),
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C';
      // Zapisywanie do localStorage
      localStorage.setItem('temperatureUnit', state.unit);
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('temperatureUnit', state.unit);
    },
  },
});

export const { toggleUnit } = temperatureSlice.actions;

// Selectors
export const selectUnit = (state) => state.temperature.unit;

export const selectUnitSymbol = (state) => {
  return state.temperature.unit === 'C' ? '°C' : '°F';
};

export const convertTemperature = (celsius, unit) => {
  if (unit === 'F') {
    return Math.round((celsius * 9/5) + 32);
  }
  return celsius;
};

export default temperatureSlice.reducer;

