import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Info, Personaje } from "../../types/character.types";

interface initialType {
    inputValue: string;
    metaData: Info;
    personajes: Personaje[];
    favoritos: number[];
    loading: boolean;
    error: boolean;
} 


//TRAER TODOS LOS PERSONAJES
export const getPesonajes = createAsyncThunk(
    'personajes',
    async (page: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        if(res.ok) {
            return await res.json()
        }else {
            throw new Error('Pagina no encontrada')
        }
    }
)

//FILTRAR PERSONAJES POR NOMBRE
export const getFilterPesonajes = createAsyncThunk(
    'personaje',
    async (name: string) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
        if(res.ok){
            return await res.json()
        }else {
            throw new Error('Pagina no encontrada')
        }
    }
)

const initialState: initialType = {
    inputValue: "",
    metaData: {count: 0, pages: 1, next: "", prev: ""},
    personajes: [],
    favoritos: [],
    loading: false,
    error: false,
}

const personajesSlice = createSlice({
    name: 'personajes',
    initialState,
    reducers: {
        actionBusqueda: (state, action) => {
            state.inputValue = action.payload
        },
        updateFavoritos: (state, action) => {
            state.favoritos = action.payload
        },
        limpiarBusqueda: (state) => {
            state.inputValue= ""
        },
        limpiarFavoritos: (state) => {
            state.favoritos= []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPesonajes.pending, (state) => {
                state.loading = true
                state.error = false
                state.personajes = []
            })
            .addCase(getPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.personajes= action.payload.results
                state.metaData= action.payload.info
            })
            .addCase(getPesonajes.rejected, (state) => {
                state.loading = false
                state.error = true
                state.personajes = []
            }) 
            .addCase(getFilterPesonajes.pending, (state) => {
                state.loading = true
                state.error = false
                state.personajes = []
            })
            .addCase(getFilterPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.personajes= action.payload.results
                state.metaData= action.payload.info
            })
            .addCase(getFilterPesonajes.rejected, (state, action) => {
                state.metaData.pages = 1
                state.loading = false
                state.error = true
                state.personajes = []
            })
    }
})
export const { actionBusqueda , updateFavoritos, limpiarBusqueda, limpiarFavoritos} = personajesSlice.actions

export default personajesSlice.reducer
