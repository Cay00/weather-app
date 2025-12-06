import WeatherDetails from "./weatherDetails.jsx";
import {useParams, Link} from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext.jsx';

function CityDetailPage({miasta}){

    const {cityId} = useParams();
    const { isFavorite, toggleFavorite } = useFavorites();
    const miasto = miasta.find(x => x.id === parseInt(cityId));

    if(!miasto){
        return(
            <div className="error-page">
                <h2>Nie znaleziono miasta</h2>
                <Link to="/" className="back-button">← Powrót do strony głównej</Link>
            </div>
        )
    } 
    return(
        <div>   
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <Link to="/" className="back-button">← Powrót do strony głównej</Link>
                <button
                    onClick={() => toggleFavorite(miasto.id)}
                    className="favorite-button-large"
                    title={isFavorite(miasto.id) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                >
                    {isFavorite(miasto.id) ? '❤️ Ulubione' : '🤍 Dodaj do ulubionych'}
                </button>
            </div>
            <WeatherDetails miasto={miasto}/>
        </div>
    )

}
export default CityDetailPage;