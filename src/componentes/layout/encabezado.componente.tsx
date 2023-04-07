import {Link, useParams} from "react-router-dom";
import './encabezado.css';


const Encabezado = () => {
    const { id } = useParams();

    return <header>
            <div>
                <div>
                    <h2>Examen Final de Frontend IV</h2>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/favoritos">Favoritos</Link></li>
                        <li><Link to={`/detalle/${id}`}>Detalle</Link></li>
                    </ul>
                </nav>
            </div>
    </header>
}

export default Encabezado