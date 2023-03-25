import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type sortValueType = {
    name: string;
    sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

interface filterSliceType {
    sortValue: sortValueType,
    searchValue: string;
    categoryValue: number;
    pageChosen: number;
}

const initialState: filterSliceType = {
    sortValue: {
        name: 'популярности(по возрастанию)',
        sortProperty: 'rating'
    },
    searchValue: '',
    categoryValue: 0,
    pageChosen: 0
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryValue(state, action: PayloadAction<number>) {
            state.categoryValue = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },

        setSortValue(state, action: PayloadAction<sortValueType>) {
            state.sortValue = action.payload
        },
        setPageChosen(state, action: PayloadAction<number>) {
            state.pageChosen = action.payload
        }
    }
})

export const filterSelector = (state: RootState) => state.filterSlice


export const {setCategoryValue, setSortValue, setPageChosen, setSearchValue} = filterSlice.actions
export default filterSlice.reducer