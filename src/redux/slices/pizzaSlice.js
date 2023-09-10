import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizza',
    async (params) => {
        const {
            currentPage,
            category,
            sortType,
            search
        } = params
        const {data} = await axios.get(`https://64c0907c0d8e251fd11231b2.mockapi.io/items?&p=${currentPage}&l=4&${category}&sortBy=${sortType.sortProp}&order=desc${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading' // loading, ok, error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading'
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = 'ok'
                state.items = action.payload
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error'
                state.items = []
                console.log(action.error.message)
            })
    }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;