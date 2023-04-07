import Filtros from '../componentes/personajes/filtros.componente';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import Paginacion from '../componentes/paginacion/paginacion.componente';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../componentes/redux/hooks';
import { actionBusqueda, getFilterPesonajes, getPesonajes, limpiarBusqueda } from '../componentes/redux/personajeSlice';
import InfoText from '../componentes/InfoText/InfoText';
import useFavorite from '../componentes/hooks/useFavorite';

const PaginaInicio = () => {
    const [page, setPage] = useState<number>(1);
    const dispatch = useAppDispatch();
    const busqueda = useAppSelector((state) => state.personajes.inputValue);
    const [search, setSearch] = useState<string>(busqueda);
    const totalPages = useAppSelector((state) => state.personajes.metaData.pages);
    const { personajes, error, favoritos, loading } = useAppSelector((state) => state.personajes);
    const inputRef = useRef<HTMLInputElement>(null);
    const { onFavoriteClick } = useFavorite();

    //TRAE LOS PERSONAJES Y FILTRAR BUSQUEDA PERSONAJES CADA MEDIO SEGUNDO
    useEffect(() => {
        const t = setTimeout(() => {
            dispatch(actionBusqueda(search));
            dispatch(getFilterPesonajes(search));
            
        }, 500);

        return () => {
            clearTimeout(t)
        }
    }, [search, dispatch]);

    //OBTENER LISTADO PERSONAJES
    useEffect(() => {
        dispatch(getPesonajes(page));
        inputRef?.current?.focus();
    }, [page, dispatch]);

    //PAGINADO
    const previousPage = () => {
        setPage((page) => page - 1);
    };
    const nextPage = () => {
        setPage((page) => page + 1);
    };

    //LIMPIAR FITRO
    const resetSearch = () => {
        setSearch('');
        dispatch(limpiarBusqueda());
        inputRef?.current?.focus();
        dispatch(getPesonajes(1));
    };

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Catálogo de Personajes</h3>
                <button className={!!search ? 'danger' : 'primary'} onClick={resetSearch} disabled={!search}>
                    Reset
                </button>
            </div>
            <Filtros
                inputRef={inputRef}
                searchCharacter={(e) => setSearch(e.target.value)}
                value={search}
            />
            {error &&  (
                <InfoText text='No encontramos el personaje buscado' />
                
            ) }
            {loading && (
                <InfoText text='cargando ...' />
            )}
            {!error && !loading && (
                <>
                    <Paginacion
                        onPreviousclick={previousPage}
                        onNextClick={nextPage}
                        disableNext={page === totalPages}
                        disablePrev={page === 1}
                    />
                    <GrillaPersonajes personajes={personajes} onFavoriteClick={onFavoriteClick} favoritos={favoritos} />
                    <Paginacion
                        onPreviousclick={previousPage}
                        onNextClick={nextPage}
                        disableNext={page === totalPages}
                        disablePrev={page === 1}
                    />
                </>
            )}
        </div>
    );
};

export default PaginaInicio;
