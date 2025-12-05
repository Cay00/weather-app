import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import miasta from './weatherdata.jsx'
import HomePage from './HomePage.jsx'
import CityDetailPage from './components/CityDetailPage.jsx'


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

  if(loading){
    return( <div className = "app-title">
              Ładowanie danych pogodowych...
            </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<HomePage miasta={miasta}/>}></Route>
          <Route path = "/miasto/:cityId" element = {<CityDetailPage miasta={miasta}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
