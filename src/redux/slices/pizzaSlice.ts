import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TSort } from "./filterSlice";

type TFetchParams = {
    currentPage: string;
    category: string;
    sortType: TSort,
    search: string
}

type TPizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;   
    rating: number;
}

enum EStatus {
    LOADING = 'loading',
    SUCCESS = 'ok',
    ERROR = 'error',

}

interface IPizzaSliceState {
    items: TPizza[];
    status: EStatus;
}


export const fetchPizzas = createAsyncThunk<TPizza[], TFetchParams>(
    'pizza/fetchPizza',
    async (params) => {
        const {
            currentPage,
            category,
            sortType,
            search
        } = params
        const {data} = await axios.get<TPizza[]>(`https://64c0907c0d8e251fd11231b2.mockapi.io/items?&p=${currentPage}&l=4&${category}&sortBy=${sortType.sortProp}&order=desc${search}`)
        return data;
    }
)

const initialState: IPizzaSliceState = {
    items: [],
    status: EStatus.LOADING
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
                state.status = EStatus.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<TPizza[]>) => {
                state.status = EStatus.SUCCESS
                state.items = action.payload
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = EStatus.ERROR
                state.items = []
                console.log(action.error.message)
            })
    }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;