import { useState, useMemo, useCallback } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard.jsx'
import WeatherDetails from './components/weatherDetails.jsx' 
import { Link } from 'react-router-dom'
import { useTemperature } from './contexts/TemperatureContext.jsx'


function HomePage({miasta}) {
  const { convertTemperature, getUnitSymbol } = useTemperature();

  const [wybraneMiasto, setWybraneMiasto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nazwa'); // 'nazwa', 'temperatura-rosnąco', 'temperatura-malejąco'
  const [filterPogoda, setFilterPogoda] = useState('wszystkie');
  
  const handleClick = useCallback((miasto) => {
    setWybraneMiasto(miasto);
  }, []);

  const filteredMiasta = useMemo(() => {
    let filtered = miasta.filter(miasto =>
      miasto.miasto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrowanie po warunkach pogodowych
    if (filterPogoda !== 'wszystkie') {
      filtered = filtered.filter(miasto => {
        const pogodaLower = miasto.pogoda.toLowerCase();
        return pogodaLower.includes(filterPogoda.toLowerCase());
      });
    }

    // Sortowanie
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'nazwa') {
        return a.miasto.localeCompare(b.miasto);
      } else if (sortBy === 'temperatura-rosnąco') {
        return a.temperatura - b.temperatura;
      } else if (sortBy === 'temperatura-malejąco') {
        return b.temperatura - a.temperatura;
      }
      return 0;
    });

    return sorted;
  }, [miasta, searchTerm, sortBy, filterPogoda]);


  // Statystyki
  const najcieplejsze = useMemo(() => {
    return miasta.reduce((max, miasto) => 
      miasto.temperatura > max.temperatura ? miasto : max
    , miasta[0]);
  }, [miasta]);

  const najzimniejsze = useMemo(() => {
    return miasta.reduce((min, miasto) => 
      miasto.temperatura < min.temperatura ? miasto : min
    , miasta[0]);
  }, [miasta]);

  const sredniaTemp = useMemo(() => {
    const suma = miasta.reduce((acc, m) => acc + m.temperatura, 0);
    return (suma / miasta.length).toFixed(1);
  }, [miasta]);

  return (
    <>
      <h1 className="app-title">Pogoda</h1>
      
      {/* Statystyki */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-label">Najcieplejsze</div>
          <div className="stat-value">{najcieplejsze?.miasto}: {convertTemperature(najcieplejsze?.temperatura)}{getUnitSymbol()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Najzimniejsze</div>
          <div className="stat-value">{najzimniejsze?.miasto}: {convertTemperature(najzimniejsze?.temperatura)}{getUnitSymbol()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Średnia temperatura</div>
          <div className="stat-value">{convertTemperature(parseFloat(sredniaTemp))}{getUnitSymbol()}</div>
        </div>
      </div>

      {/* Filtry i sortowanie */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Wyszukaj miasto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filterPogoda} 
          onChange={(e) => setFilterPogoda(e.target.value)}
          className="filter-select"
        >
          <option value="wszystkie">Wszystkie warunki</option>
          <option value="słonecznie">Słonecznie</option>
          <option value="pochmurno">Pochmurno</option>
          <option value="deszczowo">Deszczowo</option>
          <option value="wiatr">Wietrznie</option>
        </select>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="nazwa">Sortuj: Nazwa</option>
          <option value="temperatura-rosnąco">Sortuj: Temperatura ↑</option>
          <option value="temperatura-malejąco">Sortuj: Temperatura ↓</option>
        </select>
      </div>

      {filteredMiasta.length === 0 ? (
        <div className="no-results">
          <p>Nie znaleziono miast spełniających kryteria wyszukiwania.</p>
        </div>
      ) : (
        <div className="cities-row">
          {filteredMiasta.map((dane) => {
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
      )}

      {wybraneMiasto && (
        <WeatherDetails miasto={wybraneMiasto} />
      )}
    </>
  )
}

export default HomePage
