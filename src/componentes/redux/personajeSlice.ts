import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Personaje {
    id: string
    author: string
    width: number
    height: number,
    url: string,
    download_url: string
}

/* interface Personajes {
        "info": {
          "count": number;
          "pages": number;
          "next": string;
          "prev": string;
        },
        "results": []
} */

interface initialType {
    personajes: Personaje[]
    loading: boolean
} 

export const getPesonajes = createAsyncThunk(
    'personajes',
    async (page: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&limit=9`)
        const parseRes = await res.json()
        return parseRes
    }
)

const initialState: initialType = {
    personajes: [],
    loading: false
}

const personajesSlice = createSlice({
    name: 'personajes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPesonajes.pending, (state) => {
                state.loading = true
            })
            .addCase(getPesonajes.fulfilled, (state, action) => {
                state.loading = false
                state.personajes.push(...action.payload)
            })
            .addCase(getPesonajes.rejected, (state, action) => {
                state.loading = false
            }) 
    }
})

export default personajesSlice.reducer
