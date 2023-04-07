import './tarjeta-episodio.css';
import PropTypes from "prop-types";

interface Props {
    name: string;
    date: string;
    episode: string;
}

/**
 * Componente de tarjeta de episodio
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre del episodio
 * @param {string} props.date - Fecha de lanzamiento del episodio
 * @param {string} props.episode - Número y temporada del episodio
 * @returns {JSX.Element} Componente de tarjeta de episodio con información sobre el episodio
 */

const TarjetaEpisodio = ({ name, date, episode }: Props) => {
    return (
        <div className='tarjeta-episodio'>
            <h4>{name}</h4>
            <div>
                <span>{episode}</span>
                <span>Lanzado el: {date}</span>
            </div>
        </div>
    );
};

TarjetaEpisodio.propType = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    episode: PropTypes.string.isRequired
}

export default TarjetaEpisodio;
