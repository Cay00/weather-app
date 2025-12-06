import { useTemperature } from '../hooks/useTemperature.js';
import { useFavorites } from '../hooks/useFavorites.js';

function WeatherCard({miasto, temperatura, pogoda, wiatr, selected, onClick, cityId}){
    const { convertTemperature, getUnitSymbol } = useTemperature();
    const { isFavorite, toggleFavorite } = useFavorites();
    
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Zapobiega wywołaniu onClick karty
        toggleFavorite(cityId);
    };
    
    const getWeatherIcon = (pogoda) => {
        const pogodaLower = pogoda.toLowerCase();
        if (pogodaLower.includes('słonecznie')) {
            return '☀️';
        } else if (pogodaLower.includes('deszczowo')) {
            return '🌧️';
        } else if (pogodaLower.includes('wietrznie') || pogodaLower.includes('wiatr')) {
            return '💨';
        } else if (pogodaLower.includes('pochmurnie') || pogodaLower.includes('pochmurno')) {
            return '☁️';
        } else if (pogodaLower.includes('śnieg')) {
            return '❄️';
        } else {
            return '🌤️';
        }
    };

    return(
        <div 
            onClick={onClick}
            style={{
                border: selected ? '2px solid #007bff' : '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                minWidth: '200px',
                backgroundColor: selected ? '#e3f2fd' : '#f5f5f5',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
            }}
        >
            <button
                onClick={handleFavoriteClick}
                className="favorite-button"
                title={isFavorite(cityId) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    zIndex: 10
                }}
            >
                {isFavorite(cityId) ? '❤️' : '🤍'}
            </button>
            <h2 style={{
                marginTop: 0, 
                marginBottom: '1rem',
                textTransform: 'capitalize',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center'
            }}>
                {miasto}
            </h2>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center'}}>
                {getWeatherIcon(pogoda)}
            </div>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0'}}>
                {convertTemperature(temperatura)}{getUnitSymbol()}
            </p>
            <p style={{margin: '0.5rem 0'}}>{pogoda}</p>
        </div>
    )
}

export default WeatherCard;

