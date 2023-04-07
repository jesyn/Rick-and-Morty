import './paginacion.css';
import PropTypes from "prop-types";


interface Props {
    onPreviousclick: () => void;
    onNextClick: () => void;
    disableNext: boolean;
    disablePrev: boolean;
}

/**
 * Componente de paginación para navegación entre páginas
 * @param {Object} props - Propiedades del componente
 * @param {function} props.onPreviousClick - Función para manejar el evento click en el botón de "Anterior"
 * @param {function} props.onNextClick - Función para manejar el evento click en el botón de "Siguiente"
 * @param {boolean} props.disableNext - Indica si el botón de "Siguiente" debe estar deshabilitado
 * @param {boolean} props.disablePrev - Indica si el botón de "Anterior" debe estar deshabilitado
 * @returns {JSX.Element} Componente de paginación con dos botones para navegar entre páginas
 */

const Paginacion = ({onPreviousclick,onNextClick,disableNext,disablePrev,}: Props) => {
    return (
        <div className='paginacion'>
            <button
                disabled={disablePrev}
                className={'primary'}
                onClick={onPreviousclick}
            >
                Anterior
            </button>
            <button
                disabled={disableNext}
                className={'primary'}
                onClick={onNextClick}
            >
                Siguiente
            </button>
        </div>
    );
};

Paginacion.propType = {
    onPreviousclick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    disableNext: PropTypes.bool.isRequired,
    disablePrev: PropTypes.bool.isRequired
}


export default Paginacion;
