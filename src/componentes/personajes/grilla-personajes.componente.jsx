import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';

/**
 * Grilla de personajes para la pagina de inicio
 *
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 *
 *
 * @returns un JSX element
 */
const GrillaPersonajes = ({ personajes, onclick, favoritos }) => {
    console.log(personajes);
    return (
        <div className='grilla-personajes'>
            {personajes?.map((personaje) => (
                <TarjetaPersonaje
                    key={personaje.id}
                    name={personaje.name}
                    image={personaje.image}
                    onclick={() => onclick(personaje.id)}
                    esFavorito={favoritos.some(
                        (favorito) => favorito === personaje.id
                    )}
                />
            ))}
        </div>
    );
};

export default GrillaPersonajes;
