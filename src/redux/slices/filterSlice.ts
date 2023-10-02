import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSort = {
    name: string;
    sortProp: 'rating' | 'price' | 'title';
}

interface IFilterSliceState {
    categoryId: number;
    currentPage: number;
    searchInput: string;
    sort: TSort
}

const initialState: IFilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    searchInput: '',
    sort: {
        name: 'популярности',
        sortProp: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSortType(state, action: PayloadAction<TSort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setSearchInput(state, action: PayloadAction<string>) {
            state.searchInput = action.payload
        },
        setWindowSearch(state, action: PayloadAction<IFilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        }
    }
})

export const {
    setCategoryId, 
    setSortType, 
    setCurrentPage, 
    setSearchInput, 
    setWindowSearch
    } = filterSlice.actions;     //actions = reducers at line 15
export default filterSlice.reducer;                     // !!! 