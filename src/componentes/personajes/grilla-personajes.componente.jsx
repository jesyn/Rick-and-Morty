import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import personajeSlice, { getPesonajes } from '../redux/personajeSlice';
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
const GrillaPersonajes = () => {
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const personajes = useAppSelector((state) => state.personajes);

    useEffect(() => {
        dispatch(getPesonajes(page));
    }, [page]);

    console.log(personajes);

    return (
        <div className='grilla-personajes'>
            {/* {personajes?.map((personaje) => (
                <TarjetaPersonaje
                    name={personaje.name}
                    image={personaje.image}
                />
            ))} */}

            <TarjetaPersonaje />
            <TarjetaPersonaje />
            <TarjetaPersonaje />
        </div>
    );
};

export default GrillaPersonajes;
