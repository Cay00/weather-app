import WeatherIcon from "../WeatherIcon.jsx";
function WeatherDetails({ miasto }){
    // Guard: if no city is provided, render nothing (avoids crashes)
    if(!miasto) return null;

    return(
        <div className="card details-panel">
          <h2>Szczegóły pogody dla {miasto.miasto}</h2>
          <div className="details-row">
            <div className="details-item">
              <strong>Temperatura:</strong>
              <div>{miasto.temperatura} °C</div>
            </div>
            <div>
              <WeatherIcon condition={miasto.pogoda} size="large"></WeatherIcon>
            </div>
            <div className="details-item">
              <strong>Warunki:</strong>
              <div>{miasto.pogoda}</div>
            </div>
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
                      <div className="details-item">Temperatura: {dzień.temperatura} °C</div>
                      {dzień.kierunekWiatru && <div className="details-item">Kierunek wiatru: {dzień.kierunekWiatru}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
    )
}

export default WeatherDetails;
