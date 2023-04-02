import { createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import { useAppSelector } from '../componentes/redux/hooks';

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {
    const favoritos = useAppSelector((state) => state.personajes.favoritos);
    const [listFavoritos, setListFavoritos] = useState([]);

    useEffect(() => {
        if (favoritos.length > 0) {
            fetch(`https://rickandmortyapi.com/api/character/${favoritos}`)
                .then((res) => res.json())
                .then((result) => {
                    setListFavoritos(result);
                });
        }
    }, [favoritos]);

    //console.log({ listFavoritos, favoritos });

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Personajes Favoritos</h3>
                <button className='danger'>Reset</button>
            </div>
            <GrillaPersonajes
                favoritos={favoritos}
                personajes={listFavoritos}
                onclick={onclick}
            />
        </div>
    );
};

export default PaginaFavoritos;
