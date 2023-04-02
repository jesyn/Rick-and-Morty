import './filtros.css';

const Filtros = ({ inputRef, searchCharacter }) => {
    return (
        <div className='filtros'>
            <label htmlFor='nombre'>Filtrar por nombre:</label>
            <input
                type='text'
                placeholder='Rick, Morty, Beth, Alien, ...etc'
                name='nombre'
                onChange={searchCharacter}
                autoComplete='on'
                ref={inputRef}
            />
        </div>
    );
};

export default Filtros;
