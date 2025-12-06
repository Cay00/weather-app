import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import WeatherCard from './components/WeatherCard.jsx'
import WeatherDetails from './components/weatherDetails.jsx'
import { useFavorites } from './hooks/useFavorites.js'
import { useTemperature } from './hooks/useTemperature.js'

function FavoritesPage({miasta}) {
  const { favorites, isFavorite } = useFavorites();
  const { convertTemperature, getUnitSymbol } = useTemperature();

  const favoriteCities = useMemo(() => {
    return miasta.filter(miasto => favorites.includes(miasto.id));
  }, [miasta, favorites]);

  const [wybraneMiasto, setWybraneMiasto] = useState(null);

  const handleClick = (miasto) => {
    setWybraneMiasto(miasto);
  };

  // Statystyki dla ulubionych
  const najcieplejsze = useMemo(() => {
    if (favoriteCities.length === 0) return null;
    return favoriteCities.reduce((max, miasto) => 
      miasto.temperatura > max.temperatura ? miasto : max
    , favoriteCities[0]);
  }, [favoriteCities]);

  const najzimniejsze = useMemo(() => {
    if (favoriteCities.length === 0) return null;
    return favoriteCities.reduce((min, miasto) => 
      miasto.temperatura < min.temperatura ? miasto : min
    , favoriteCities[0]);
  }, [favoriteCities]);

  const sredniaTemp = useMemo(() => {
    if (favoriteCities.length === 0) return 0;
    const suma = favoriteCities.reduce((acc, m) => acc + m.temperatura, 0);
    return (suma / favoriteCities.length).toFixed(1);
  }, [favoriteCities]);

  return (
    <>
      <h1 className="app-title">Ulubione miasta</h1>
      
      {favoriteCities.length === 0 ? (
        <div className="no-results">
          <p>Nie masz jeszcze ulubionych miast.</p>
          <p>Kliknij ❤️ na karcie miasta, aby dodać je do ulubionych.</p>
          <Link to="/" className="back-button" style={{marginTop: '2rem'}}>
            ← Powrót do strony głównej
          </Link>
        </div>
      ) : (
        <>
          {/* Statystyki */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Najcieplejsze</div>
              <div className="stat-value">
                {najcieplejsze?.miasto}: {convertTemperature(najcieplejsze?.temperatura)}{getUnitSymbol()}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Najzimniejsze</div>
              <div className="stat-value">
                {najzimniejsze?.miasto}: {convertTemperature(najzimniejsze?.temperatura)}{getUnitSymbol()}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Średnia temperatura</div>
              <div className="stat-value">
                {convertTemperature(parseFloat(sredniaTemp))}{getUnitSymbol()}
              </div>
            </div>
          </div>

          <div className="cities-row">
            {favoriteCities.map((dane) => {
              return (
                <div key={dane.id} className="weather-card-wrapper">
                  <WeatherCard
                    miasto={dane.miasto}
                    temperatura={dane.temperatura}
                    pogoda={dane.pogoda}
                    wiatr={dane.wiatr}
                    selected={wybraneMiasto && wybraneMiasto.miasto === dane.miasto}
                    onClick={() => handleClick(dane)}
                    cityId={dane.id}
                  />
                  <Link 
                    to={`/miasto/${dane.id}`} 
                    className="card-link"
                    title="Zobacz szczegóły"
                  >
                    Szczegóły →
                  </Link>
                </div>
              )
            })}
          </div>

          {wybraneMiasto && (
            <WeatherDetails miasto={wybraneMiasto} />
          )}
        </>
      )}
    </>
  )
}

export default FavoritesPage

