import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateFavoritos } from "../redux/personajeSlice";

/**
 * Hook para manejar favoritos de personajes
 * @returns {Object} Objeto con funciones para manejar la lista de favoritos
 * @property {function} onFavoriteClick - Función para manejar el evento click en un botón de favorito
 * @property {function} checkFavorites - Función para verificar si un personaje está en la lista de favoritos
 */

const useFavorite = () => {
    const dispatch = useAppDispatch();
    const favoritos = useAppSelector((state) => state.personajes.favoritos)

    /**
     * Maneja el evento click en un botón de favorito
     * @param {number} id - ID del personaje a marcar/desmarcar como favorito
     */
    const onFavoriteClick = (id: number) => {
        const idExist = favoritos.some((favorito) => favorito === id);
        if (idExist) {
            const updateId = favoritos.filter((favorito) => favorito !== id);
            dispatch(updateFavoritos(updateId));
        } else {
            dispatch(updateFavoritos([...favoritos, id]));
        }
    };
    
    /**
     * Verifica si un personaje está en la lista de favoritos
     * @param {number} id - ID del personaje a verificar
     * @returns {boolean} Indica si el personaje está en la lista de favoritos
     */
    const  checkFavorites = (id : number) => favoritos.some((favorito) => favorito === id)


    return { onFavoriteClick, checkFavorites }


}

export default useFavorite;