import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 *
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 *
 *
 * @returns un JSX element
 */
const Paginacion = ({
    onPreviousclick,
    onNextClick,
    disableNext,
    disablePrev,
}) => {
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

export default Paginacion;
