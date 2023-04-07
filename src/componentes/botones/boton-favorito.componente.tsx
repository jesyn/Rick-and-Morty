import './boton-favorito.css';
import PropTypes from "prop-types";

interface Props {
    esFavorito: boolean;
    onStarclick: () => void;
}

/**
 * Componente de botón de favorito
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.esFavorito - Indica si el botón está marcado como favorito o no
 * @param {function} props.onStarClick - Función para manejar el evento click en el botón de favorito
 * @returns {JSX.Element} Componente de botón de favorito con una imagen y una función de click
 */


const BotonFavorito = ({ esFavorito, onStarclick } : Props) => {
    const src = esFavorito ? '/imagenes/star-filled.png' : '/imagenes/star.png';

    return (
        <div className='boton-favorito' onClick={onStarclick}>
            <img src={src} alt={'favorito'} />
        </div>
    );
};

BotonFavorito.propTypes = {
    esFavorito: PropTypes.bool.isRequired,
    onStarclick: PropTypes.func.isRequired
}

export default BotonFavorito;
