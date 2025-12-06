import { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext();

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};

export const TemperatureProvider = ({ children }) => {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit

  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  const convertTemperature = (celsius) => {
    if (unit === 'F') {
      return Math.round((celsius * 9/5) + 32);
    }
    return celsius;
  };

  const getUnitSymbol = () => {
    return unit === 'C' ? '°C' : '°F';
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit, convertTemperature, getUnitSymbol }}>
      {children}
    </TemperatureContext.Provider>
  );
};

