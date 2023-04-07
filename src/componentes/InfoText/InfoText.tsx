import './card.css'
import PropTypes from "prop-types";

interface Props {
    text: string
}

/**
 * Componente de texto de información
 * @param {Object} props - Propiedades del componente
 * @param {string} props.text - Texto a mostrar en el componente
 * @returns {JSX.Element} Componente de texto de información con el texto proporcionado
 */

function InfoText({text}: Props) {
  return (
    <div className='card-container'>
        <p className='card-text'>{text}</p>
    </div>
  )
}

InfoText.propTypes = {
  text: PropTypes.string.isRequired,
  
}


export default InfoText;