import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, selectIsFavorite, toggleFavorite } from '../store/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = (cityId) => {
    return favorites.includes(cityId);
  };

  const toggle = (cityId) => {
    dispatch(toggleFavorite(cityId));
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite: toggle,
  };
};

