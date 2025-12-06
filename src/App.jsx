import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import './App.css'
import miasta from './weatherdata.jsx'
import HomePage from './HomePage.jsx'
import CityDetailPage from './components/CityDetailPage.jsx'
import FavoritesPage from './FavoritesPage.jsx'
import { TemperatureProvider, useTemperature } from './contexts/TemperatureContext.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'


function TemperatureToggle() {
  const { unit, toggleUnit } = useTemperature();
  
  return (
    <button 
      onClick={toggleUnit}
      className="temperature-toggle"
      title={`Przełącz na ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
    >
      {unit === 'C' ? '°C' : '°F'}
    </button>
  );
}

function Navigation() {
  return (
    <nav className="main-navigation">
      <Link to="/" className="nav-link">Strona główna</Link>
      <Link to="/ulubione" className="nav-link">Ulubione</Link>
    </nav>
  );
}

function App() {

  const [wszystkieMiasta, setWszystkieMiasta] = useState([]);

  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWszystkieMiasta(miasta);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <TemperatureProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <div className="app-header">
              <Navigation />
              <TemperatureToggle />
            </div>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <div className="loading-text">Ładowanie danych pogodowych...</div>
              </div>
            ) : (
              <Routes>
                <Route path = "/" element = {<HomePage miasta={miasta}/>}></Route>
                <Route path = "/miasto/:cityId" element = {<CityDetailPage miasta={miasta}/>}></Route>
                <Route path = "/ulubione" element = {<FavoritesPage miasta={miasta}/>}></Route>
              </Routes>
            )}
          </BrowserRouter>
        </FavoritesProvider>
      </TemperatureProvider>
    </>
  )
}

export default App
