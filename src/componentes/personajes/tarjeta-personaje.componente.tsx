import { useNavigate } from 'react-router-dom';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

interface Props {
    id: number;
    name: string;
    image: string;
    onFavoriteclick: () => void;
    esFavorito: boolean;
}

/** El componente TarjetaPersonaje muestra la información del personaje como el nombre, la imagen y el botón de favorito.
@param {Object} props - El objeto de props.
@param {number} props.id - El ID del personaje.
@param {string} props.name - El nombre del personaje.
@param {string} props.image - La URL de la imagen del personaje.
@param {Function} props.onFavoriteclick - La función que se llama cuando se hace clic en el botón de favorito.
@param {boolean} props.esFavorito - Un valor booleano que indica si el personaje es un favorito o no.
@returns {JSX.Element} - Un elemento JSX que representa el componente TarjetaPersonaje.
*/

const TarjetaPersonaje = ({ id, name, image, onFavoriteclick, esFavorito } : Props) => {

    const navigate = useNavigate();

    return (
        <div className='tarjeta-personaje'>
            <img src={image} alt={name} onClick={() => navigate(`/detalle/${id}`)}/>
            <div className='tarjeta-personaje-body'>
                <span>{name}</span>
                <BotonFavorito
                    esFavorito={esFavorito}
                    onStarclick={onFavoriteclick}
                />
            </div>
        </div>
    );
};

export default TarjetaPersonaje;
