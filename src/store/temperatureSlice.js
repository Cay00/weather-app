import { createSlice } from '@reduxjs/toolkit';

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    unit: 'C', // 'C' for Celsius, 'F' for Fahrenheit
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C';
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

