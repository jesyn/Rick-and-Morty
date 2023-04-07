import './Detalle.css';
import TarjetaEpisodio from '../componentes/episodios/tarjeta-episodio.componente';
import Card from '../componentes/InfoText/InfoText';
import { useEffect, useState } from 'react';
import { Detail, Episode } from '../types/character.types';
import { useParams } from 'react-router-dom';
import BotonFavorito from '../componentes/botones/boton-favorito.componente';
import useFavorite from '../componentes/hooks/useFavorite';

const PaginaDetalle = (): JSX.Element => {
    const [detailPersonaje, setDetailPersonaje] = useState<Detail>();
    const [episodeList, setEpisodeList] = useState<Episode[]>([]);
    const EPISODE_TO_LOAD = 3; //mostrar hasta 3 episodios por personaje y si tiene mas de 3 ir agregando de a 3 cards con el botón ver más
    const [currentCounter, setCurrentCounter] = useState(EPISODE_TO_LOAD);
    const { id } = useParams();
    const numberId = Number(id as string);
    const { onFavoriteClick, checkFavorites } = useFavorite();

    useEffect(() => {
        if (id) {
            fetch(`https://rickandmortyapi.com/api/character/${id}`)
                .then((res) => res.json())
                .then((result) => {
                    setDetailPersonaje(result);
                });
        }
    }, [id]);

    useEffect(() => {
        if (!!detailPersonaje?.id) {
            const episodesId = detailPersonaje.episode.map(
                (episode) => episode.split('https://rickandmortyapi.com/api/episode/')[1]
            );
            fetch(`https://rickandmortyapi.com/api/episode/${episodesId}`)
                .then((res) => res.json())
                .then((result) => {
                    setEpisodeList(result);
                });
        }
    }, [detailPersonaje]);

    const onClickVerMas = () => {
        setCurrentCounter((counter) => counter + EPISODE_TO_LOAD);
    };

    return (
        <div className='container'>
            {!!detailPersonaje?.id ? (
                <>
                    <h3>{detailPersonaje.name}</h3>
                    <div className={'detalle'}>
                        <div className={'detalle-header'}>
                            <img src={detailPersonaje.image} alt={detailPersonaje.name} />
                            <div className={'detalle-header-texto'}>
                                <p>nombre : {detailPersonaje.name}</p>
                                <p>Planeta: {detailPersonaje.location.name}</p>
                                <p>Genero: {detailPersonaje.gender}</p>
                            </div>
                            <BotonFavorito
                                esFavorito={checkFavorites(numberId)}
                                onStarclick={() => onFavoriteClick(numberId)}
                            />
                        </div>
                    </div>
                    <h4>Lista de episodios donde apareció el personaje</h4>
                    <div className='episodios-container'>
                        <div className={'episodios-grilla'}>
                            {episodeList.slice(0, currentCounter).map((episode) => (
                                <TarjetaEpisodio
                                    key={episode.id}
                                    name={episode.name}
                                    date={episode.air_date}
                                    episode={episode.episode}
                                />
                            ))}
                        </div>
                        <button
                            className='primary'
                            onClick={onClickVerMas}
                            disabled={currentCounter >= episodeList.length}
                        >
                        Ver más
                        </button>
                    </div>
                </>
            ) : (
                <Card text='Seleccione un personaje en el inicio' />
            )}
        </div>
    );
};

export default PaginaDetalle;
