import { useEffect, useState } from 'react';
import useFavorite from '../componentes/hooks/useFavorite';
import Card from '../componentes/InfoText/InfoText';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import { useAppDispatch, useAppSelector } from '../componentes/redux/hooks';
import { limpiarFavoritos } from '../componentes/redux/personajeSlice';
import { Personaje } from '../types/character.types';


const PaginaFavoritos = () => {
    const favoritos = useAppSelector((state) => state.personajes.favoritos);
    const [listFavoritos, setListFavoritos] = useState<Personaje[]>([]);
    const dispatch = useAppDispatch();
    const {onFavoriteClick} = useFavorite();

    useEffect(() => {
        if (favoritos.length > 0) {
            fetch(`https://rickandmortyapi.com/api/character/${favoritos}`)
                .then((res) => res.json())
                .then((result) => {
                    if (Array.isArray(result)) {
                        setListFavoritos(result);
                    } else {
                        setListFavoritos([result]);
                    }
                });
        }
    }, [favoritos]);

    const clearFavorites = (): void => {
        dispatch(limpiarFavoritos())
    };

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Personajes Favoritos</h3>
                <button className={!!favoritos.length ? 'danger' : 'primary'} onClick={clearFavorites} disabled={favoritos.length <= 0}>
                    Reset
                </button>
            </div>
            {favoritos.length > 0 ? (
                <GrillaPersonajes favoritos={favoritos} personajes={listFavoritos} onFavoriteClick={onFavoriteClick} />
            ) : (
                <Card text='No tiene personajes favoritos seleccionados' />
            )}
        </div>
    );
};

export default PaginaFavoritos;
