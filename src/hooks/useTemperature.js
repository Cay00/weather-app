import { useSelector, useDispatch } from 'react-redux';
import { selectUnit, selectUnitSymbol, convertTemperature as convertTemp, toggleUnit } from '../store/temperatureSlice';

/**
 * Custom hook do zarządzania jednostką temperatury w komponentach.
 * 
 * Hook łączy komponenty z Redux store, umożliwiając:
 * - Odczyt aktualnej jednostki temperatury
 * - Przełączanie między Celsius a Fahrenheit
 * - Konwersję temperatury
 * - Pobieranie symbolu jednostki
 * 
 * @returns {Object} Obiekt zawierający:
 *   - unit: Aktualna jednostka ('C' lub 'F')
 *   - toggleUnit: Funkcja do przełączania jednostki
 *   - convertTemperature: Funkcja konwertująca temperaturę
 *   - getUnitSymbol: Funkcja zwracająca symbol jednostki ('°C' lub '°F')
 * 
 * @example
 * const { convertTemperature, getUnitSymbol } = useTemperature();
 * const tempInSelectedUnit = convertTemperature(20); // 20°C lub 68°F
 */
export const useTemperature = () => {
  // Hook do wysyłania akcji do Redux store
  const dispatch = useDispatch();
  
  // Hook do odczytywania danych ze store
  const unit = useSelector(selectUnit);
  const unitSymbol = useSelector(selectUnitSymbol);

  /**
   * Funkcja przełączająca jednostkę temperatury.
   * Wysyła akcję toggleUnit do Redux store.
   */
  const toggle = () => {
    dispatch(toggleUnit());
  };

  /**
   * Konwertuje temperaturę z Celsius na wybraną jednostkę.
   * 
   * @param {number} celsius - Temperatura w Celsiusach
   * @returns {number} Temperatura w wybranej jednostce
   */
  const convertTemperature = (celsius) => {
    return convertTemp(celsius, unit);
  };

  /**
   * Zwraca symbol aktualnej jednostki temperatury.
   * 
   * @returns {string} '°C' lub '°F'
   */
  const getUnitSymbol = () => {
    return unitSymbol;
  };

  return {
    unit,
    toggleUnit: toggle,
    convertTemperature,
    getUnitSymbol,
  };
};

