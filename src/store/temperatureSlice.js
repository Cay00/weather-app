import { createSlice } from '@reduxjs/toolkit';

/**
 * Funkcja pomocnicza do ładowania wybranej jednostki temperatury z localStorage.
 * Sprawdza czy zapisana wartość jest poprawna ('C' lub 'F').
 * W przypadku błędu lub braku danych zwraca domyślną wartość 'C' (Celsius).
 * 
 * @returns {string} 'C' dla Celsius lub 'F' dla Fahrenheit
 */
const loadTemperatureUnitFromStorage = () => {
  try {
    const savedUnit = localStorage.getItem('temperatureUnit');
    // Walidacja - tylko 'C' lub 'F' są dozwolone
    if (savedUnit === 'C' || savedUnit === 'F') {
      return savedUnit;
    }
  } catch (e) {
    console.error('Error loading temperature unit from localStorage:', e);
  }
  return 'C'; // Domyślnie Celsius
};

/**
 * Redux slice zarządzający jednostką temperatury w aplikacji.
 * Przechowuje informację czy temperatura ma być wyświetlana w Celsiusach czy Fahrenheitach.
 * Automatycznie synchronizuje stan z localStorage przeglądarki.
 */
const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    // Stan początkowy ładuje jednostkę z localStorage przy starcie aplikacji
    unit: loadTemperatureUnitFromStorage(),
  },
  reducers: {
    /**
     * Przełącza jednostkę temperatury między Celsius a Fahrenheit.
     * Automatycznie zapisuje zmianę do localStorage.
     * 
     * @param {Object} state - Aktualny stan Redux
     */
    toggleUnit: (state) => {
      // Przełączanie między 'C' a 'F'
      state.unit = state.unit === 'C' ? 'F' : 'C';
      // Zapisanie wybranej jednostki do localStorage
      localStorage.setItem('temperatureUnit', state.unit);
    },
    
    /**
     * Ustawia jednostkę temperatury na konkretną wartość.
     * 
     * @param {Object} state - Aktualny stan Redux
     * @param {Object} action - Akcja zawierająca jednostkę ('C' lub 'F') w payload
     */
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('temperatureUnit', state.unit);
    },
  },
});

// Eksport akcji Redux - można je wywołać w komponentach przez dispatch()
export const { toggleUnit } = temperatureSlice.actions;

/**
 * Selector zwracający aktualną jednostkę temperatury.
 * 
 * @param {Object} state - Stan Redux
 * @returns {string} 'C' lub 'F'
 */
export const selectUnit = (state) => state.temperature.unit;

/**
 * Selector zwracający symbol jednostki temperatury do wyświetlenia.
 * 
 * @param {Object} state - Stan Redux
 * @returns {string} '°C' lub '°F'
 */
export const selectUnitSymbol = (state) => {
  return state.temperature.unit === 'C' ? '°C' : '°F';
};

/**
 * Funkcja pomocnicza konwertująca temperaturę z Celsius na Fahrenheit.
 * Jeśli jednostka to 'F', wykonuje konwersję: F = (C × 9/5) + 32
 * Jeśli jednostka to 'C', zwraca wartość bez zmian.
 * 
 * @param {number} celsius - Temperatura w Celsiusach
 * @param {string} unit - Jednostka docelowa ('C' lub 'F')
 * @returns {number} Temperatura w wybranej jednostce (zaokrąglona do liczby całkowitej)
 */
export const convertTemperature = (celsius, unit) => {
  if (unit === 'F') {
    // Konwersja na Fahrenheit: F = (C × 9/5) + 32
    return Math.round((celsius * 9/5) + 32);
  }
  return celsius;
};

// Eksport reducera - używany w konfiguracji store
export default temperatureSlice.reducer;

