import WeatherIcon from "../WeatherIcon.jsx";
import { useTemperature } from '../hooks/useTemperature.js';

function WeatherDetails({ miasto }){
    const { convertTemperature, getUnitSymbol } = useTemperature();
    
    // Guard: if no city is provided, render nothing (avoids crashes)
    if(!miasto) return null;

    return(
        <div className="card details-panel">
          <h2>Szczegóły pogody dla {miasto.miasto}</h2>
          
          {/* Główne informacje - temperatura, ikona, warunki */}
          <div className="details-row main-info">
            <div className="details-item">
              <strong>Temperatura:</strong>
              <div>{convertTemperature(miasto.temperatura)}{getUnitSymbol()}</div>
            </div>
            <div className="weather-icon-container">
              <WeatherIcon condition={miasto.pogoda} size="large"></WeatherIcon>
            </div>
            <div className="details-item">
              <strong>Warunki:</strong>
              <div>{miasto.pogoda}</div>
            </div>
          </div>

          {/* Informacje o wietrze i zachmurzeniu */}
          <div className="details-row secondary-info">
            <div className="details-item">
              <strong>Wiatr:</strong>
              <div>{miasto.wiatr}</div>
            </div>
            <div className="details-item">
              <strong>Kierunek Wiatru:</strong>
              <div>{miasto.kierunekWiatru}</div>
            </div>
            <div className="details-item">
              <strong>Zachmurzenie:</strong>
              <div>{miasto.zachmurzenie}</div>
            </div>
          </div>

          {/* Informacje o opadach - razem w jednej sekcji */}
          <div className="details-row precipitation-info">
            <div className="details-item">
              <strong>Prawdopodobieństwo opadów:</strong>
              <div>{miasto.prawdopodobienstwoOpadow}%</div>
            </div>
            <div className="details-item">
              <strong>Rodzaj opadów:</strong>
              <div>{miasto.rodzajOpadow}</div>
            </div>
            <div className="details-item">
              <strong>Ilość opadów:</strong>
              <div>{miasto.iloscOpadow} mm/m²</div>
            </div>
          </div>

          {/* Prognoza 5-dniowa */}
          {Array.isArray(miasto.prognoza5dni) && (
            <div className="card details-panel forecast">
              <h3>5-dniowa prognoza</h3>
              <div className="forecast-row">
                {miasto.prognoza5dni.map((dzień, idx) => (
                  <div className="forecast-day" key={idx}>
                     <div>
                      <WeatherIcon condition={dzień.pogoda} size="medium"></WeatherIcon>
                    </div>
                    <div className="details-item"><strong>{dzień.dzień}</strong></div>
                    <div className="details-item">Temperatura: {convertTemperature(dzień.temperatura)}{getUnitSymbol()}</div>
                    {dzień.kierunekWiatru && <div className="details-item">Kierunek wiatru: {dzień.kierunekWiatru}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    )
}

export default WeatherDetails;
