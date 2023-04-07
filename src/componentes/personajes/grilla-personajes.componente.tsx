import { Personaje } from '../../types/character.types';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';


interface Props {
    personajes: Personaje[];
    onFavoriteClick: (id:number) => void;
    favoritos: number[];
}

/**
 * Componente de grilla de personajes
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.personajes - Array de objetos que representan a los personajes a mostrar
 * @param {Function} props.onFavoriteClick - Función para agregar/quitar un personaje de favoritos
 * @param {Array<number>} props.favoritos - Array de IDs de personajes favoritos
 * @returns {JSX.Element} Componente de grilla de personajes con las tarjetas de personajes
 */

const GrillaPersonajes = ({ personajes, onFavoriteClick, favoritos } : Props) => {

    return (
        <div className='grilla-personajes'>
            {personajes.map((personaje) => (
                <TarjetaPersonaje
                    key={personaje.id}
                    name={personaje.name}
                    image={personaje.image}
                    id={personaje.id}
                    onFavoriteclick={() => onFavoriteClick(personaje.id)}
                    esFavorito={favoritos.some(
                        (favorito) => favorito === personaje.id
                    )}
                />
            ))
            }
        </div>
    );
};



export default GrillaPersonajes;
