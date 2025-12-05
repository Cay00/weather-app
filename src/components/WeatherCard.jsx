function WeatherCard({miasto, temperatura, pogoda, wiatr, selected, onClick}){
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
                transition: 'transform 0.2s, box-shadow 0.2s'
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
                {temperatura}°C
            </p>
            <p style={{margin: '0.5rem 0'}}>{pogoda}</p>
        </div>
    )
}

export default WeatherCard;

