import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes.
 *
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 *
 *
 * @returns un JSX element
 */
const TarjetaPersonaje = ({ name, image, onclick, esFavorito }) => {
    return (
        <div className='tarjeta-personaje'>
            <img src={image} alt={name} />
            <div className='tarjeta-personaje-body'>
                <span>{name}</span>
                <BotonFavorito esFavorito={esFavorito} onClick={onclick} />
            </div>
        </div>
    );
};

export default TarjetaPersonaje;
