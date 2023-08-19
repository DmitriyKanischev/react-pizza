import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProp: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        }
    }
})

export const {setCategoryId, setSortType} = filterSlice.actions;     //actions = reducers at line 14
export default filterSlice.reducer;                     // !!! 