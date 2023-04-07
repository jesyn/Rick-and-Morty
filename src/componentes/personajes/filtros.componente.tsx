import './filtros.css';
import PropTypes from "prop-types";

interface Props {
    inputRef: React.RefObject<HTMLInputElement>;
    searchCharacter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

/**
 * Componente de filtros de búsqueda
 * @param {Object} props - Propiedades del componente
 * @param {React.RefObject<HTMLInputElement>} props.inputRef - Referencia al elemento de entrada de texto
 * @param {Function} props.searchCharacter - Función para buscar personajes
 * @param {string} props.value - Valor del campo de entrada de texto
 * @returns {JSX.Element} Componente de filtros de búsqueda con el campo de entrada de texto y el botón de búsqueda
 */

const Filtros = ({ inputRef, searchCharacter, value} : Props) => {


    return (
        <div className='filtros'>
            <label htmlFor='nombre'>Filtrar por nombre:</label>
            <input
                type='text'
                placeholder='Rick, Morty, Beth, Alien, ...etc'
                name='nombre'
                value={value}
                onChange={searchCharacter}
                autoComplete='off'
                ref={inputRef}
            />
        </div>
    );
};

Filtros.propTypes = {
    inputRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
    searchCharacter: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default Filtros;
