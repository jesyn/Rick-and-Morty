import Filtros from '../componentes/personajes/filtros.componente';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import Paginacion from '../componentes/paginacion/paginacion.componente';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../componentes/redux/hooks';
import {
    actionBusqueda,
    getFilterPesonajes,
    getPesonajes,
    updateFavoritos,
} from '../componentes/redux/personajeSlice';

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 *
 * Uso:
 * ``` <PaginaInicio /> ```
 *
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    let busqueda = useAppSelector((state) => state.personajes.inputValue);
    const personajes = useAppSelector((state) => state.personajes.personajes);
    const favoritos = useAppSelector((state) => state.personajes.favoritos);
    const inputRef = useRef(null);
    const totalPages = useAppSelector(
        (state) => state.personajes.metaData.pages
    );
    //console.log({ page, totalPages });

    //FILTRAR BUSQUEDA PERSONAJES
    const onBuscarPersonaje = (e) => {
        busqueda = e.target.value;
        dispatch(actionBusqueda(busqueda));
        dispatch(getFilterPesonajes(busqueda));
        inputRef.current.focus();
    };

    //OBTENER LISTADO PERSONAJES
    useEffect(() => {
        dispatch(getPesonajes(page));
    }, [page, dispatch]);

    //PAGINADO
    const previousPage = () => {
        setPage((page) => page - 1);
    };
    const nextPage = () => {
        setPage((page) => page + 1);
    };

    //ACTUALIZAR FAVORITOS
    const onFavoriteClick = (id) => {
        const idExist = favoritos.some((favorito) => favorito === id);
        if (idExist) {
            const updateId = favoritos.filter((favorito) => favorito !== id);
            dispatch(updateFavoritos(updateId));
        } else {
            dispatch(updateFavoritos([...favoritos, id]));
        }
    };

    console.log(favoritos);

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Catálogo de Personajes</h3>
                <button className='danger'>Test Button</button>
            </div>
            <Filtros inputRef={inputRef} searchCharacter={onBuscarPersonaje} />
            <Paginacion
                onPreviousclick={previousPage}
                onNextClick={nextPage}
                disableNext={page === totalPages}
                disablePrev={page === 1}
            />
            <GrillaPersonajes
                personajes={personajes}
                onclick={onFavoriteClick}
                favoritos={favoritos}
            />
            <Paginacion
                onPreviousclick={previousPage}
                onNextClick={nextPage}
                disableNext={page === totalPages}
                disablePrev={page === 1}
            />
        </div>
    );
};

export default PaginaInicio;
