import { useState, useMemo, useCallback } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard.jsx'
import WeatherDetails from './components/weatherDetails.jsx' 


function HomePage({miasta}) {

  const [wybraneMiasto, setWybraneMiasto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleClick = useCallback((miasto) => {
    setWybraneMiasto(miasto);
  }, []);

  const filteredMiasta = useMemo(() => 
    {
      return miasta.filter(miasto =>
        miasto.miasto.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [miasta, searchTerm]);


  return (
    <>
      <h1 className="app-title">Pogoda</h1>
      <div>
        <input
          type="text"
          placeholder="Wyszukaj miasto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
      <div className="cities-row">
        {filteredMiasta.map((dane) => {
          return (
            <WeatherCard
              key={dane.miasto}
              miasto={dane.miasto}
              temperatura={dane.temperatura}
              pogoda={dane.pogoda}
              wiatr={dane.wiatr}
              selected={wybraneMiasto && wybraneMiasto.miasto === dane.miasto}
              onClick={() => handleClick(dane)}
            />
          )
        })}
      </div>

      {wybraneMiasto && (
        <WeatherDetails miasto={wybraneMiasto} />
      )}
    </>
  )
}

export default HomePage
