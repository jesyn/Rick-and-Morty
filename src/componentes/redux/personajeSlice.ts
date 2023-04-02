import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Personaje {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    },
    location: {
        name: string;
        url: string;
    },
    image: string;
    episode: [string];
    url: string;
    created: string;
}

interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  string;
}

interface initialType {
    inputValue: string;
    metaData: Info;
    personajes: Personaje[];
    favoritos: number[];
    loading: boolean;
} 

export const getPesonajes = createAsyncThunk(
    'personajes',
    async (page: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&limit=9`)
        const parseRes = await res.json()
        const result = parseRes
        //console.log(result)
        return result
    }
)

export const getFilterPesonajes = createAsyncThunk(
    'personaje',
    async (name: string) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
        const parseRes = await res.json()
        const result = parseRes
        return result
        
        
    }
)

const initialState: initialType = {
    inputValue: "",
    metaData: {count: 0, pages: 1, next: "", prev: ""},
    personajes: [],
    favoritos: [],
    loading: false
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPesonajes.pending, (state) => {
                state.loading = true
            })
            .addCase(getPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.personajes= action.payload.results
                state.metaData= action.payload.info
            })
            .addCase(getPesonajes.rejected, (state, action) => {
                state.loading = false
            }) 
            .addCase(getFilterPesonajes.pending, (state) => {
                state.loading = true
            })
            .addCase(getFilterPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.personajes= action.payload.results
                state.metaData= action.payload.info
            })
    }
})
export const { actionBusqueda , updateFavoritos} = personajesSlice.actions

export default personajesSlice.reducer
