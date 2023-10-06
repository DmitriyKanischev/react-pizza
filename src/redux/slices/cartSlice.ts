import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage } from "../../utils/getDataFromLocalStorage";
import { priceCalculate } from "../../utils/priceCalculate";

export type TCartItem = {
    title: string; 
    price: number;
    imageUrl: string;
    count: number;
    size: number; 
    type: string;
    id: string
}
export interface ICartSliceState {
    totalPrice: number;
    items: TCartItem[]
}

const initialState: ICartSliceState = {
    totalPrice: priceCalculate(getDataFromLocalStorage()),
    items: getDataFromLocalStorage()
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<TCartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                ...action.payload,
                count: 1})
            }
            state.totalPrice = priceCalculate(state.items)
        },
        removeItem(state, action: PayloadAction<String>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        minusItem(state, action: PayloadAction<String>){
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem) {
                findItem.count--
            } 
        },
        calculatePrice(state) {
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        clearItems(state) {
            state.items = []
        }
    }
})

export const {addItem, removeItem, minusItem, calculatePrice, clearItems} = cartSlice.actions;

export default cartSlice.reducer;