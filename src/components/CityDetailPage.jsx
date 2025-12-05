import WeatherDetails from "./weatherDetails.jsx";
import {useParams, Link} from 'react-router-dom';
function CityDetailPage({miasta}){

    const {cityId} = useParams();

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
            <Link to="/" className="back-button">← Powrót do strony głównej</Link>
            <WeatherDetails miasto={miasto}/>
        </div>
    )

}
export default CityDetailPage;