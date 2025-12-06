import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, selectIsFavorite, toggleFavorite } from '../store/favoritesSlice';

/**
 * Custom hook do zarządzania ulubionymi miastami w komponentach.
 * 
 * Hook łączy komponenty z Redux store, umożliwiając:
 * - Odczyt listy ulubionych miast
 * - Sprawdzanie czy miasto jest ulubione
 * - Dodawanie/usuwanie miast z ulubionych
 * 
 * @returns {Object} Obiekt zawierający:
 *   - favorites: Tablica ID ulubionych miast
 *   - isFavorite: Funkcja sprawdzająca czy miasto jest ulubione
 *   - toggleFavorite: Funkcja przełączająca status ulubionego
 * 
 * @example
 * const { favorites, isFavorite, toggleFavorite } = useFavorites();
 * const isWarsawFavorite = isFavorite(1); // sprawdza czy Warszawa (id=1) jest ulubiona
 * toggleFavorite(1); // dodaje/usuwa Warszawę z ulubionych
 */
export const useFavorites = () => {
  // Hook do wysyłania akcji do Redux store
  const dispatch = useDispatch();
  
  // Hook do odczytywania listy ulubionych ze store
  const favorites = useSelector(selectFavorites);

  /**
   * Sprawdza czy dane miasto jest w liście ulubionych.
   * 
   * @param {number} cityId - ID miasta do sprawdzenia
   * @returns {boolean} true jeśli miasto jest ulubione, false w przeciwnym razie
   */
  const isFavorite = (cityId) => {
    return favorites.includes(cityId);
  };

  /**
   * Przełącza status ulubionego dla danego miasta.
   * Jeśli miasto jest ulubione - usuwa je z listy.
   * Jeśli nie jest ulubione - dodaje je do listy.
   * Wysyła akcję toggleFavorite do Redux store.
   * 
   * @param {number} cityId - ID miasta do przełączenia
   */
  const toggle = (cityId) => {
    dispatch(toggleFavorite(cityId));
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite: toggle,
  };
};

