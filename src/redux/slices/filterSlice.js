import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
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
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setWindowSearch(state, action) {
            state.categoryId = Number(action.payload.activeCategory)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.newSort
        }
    }
})

export const {setCategoryId, setSortType, setCurrentPage, setWindowSearch} = filterSlice.actions;     //actions = reducers at line 15
export default filterSlice.reducer;                     // !!! 