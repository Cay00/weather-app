import WeatherDetails from "./weatherDetails.jsx";
import {useParams} from 'react-router-dom';
function CityDetailPage({miasta}){

    const {cityId} = useParams();

    const miasto = miasta.find(x => x.id === parseInt(cityId));

    if(!miasto){
        return(
            <div>   
                <h2>Nie znaleziono miasta</h2>
            </div>
        )
    } 
    return(
        <div>   
            <WeatherDetails miasto={miasto}/>
        </div>
    )

}
export default CityDetailPage;