import { useSelector, useDispatch } from 'react-redux';
import { selectUnit, selectUnitSymbol, convertTemperature as convertTemp, toggleUnit } from '../store/temperatureSlice';

export const useTemperature = () => {
  const dispatch = useDispatch();
  const unit = useSelector(selectUnit);
  const unitSymbol = useSelector(selectUnitSymbol);

  const toggle = () => {
    dispatch(toggleUnit());
  };

  const convertTemperature = (celsius) => {
    return convertTemp(celsius, unit);
  };

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

