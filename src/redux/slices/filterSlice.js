import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sortValue: {
    name: 'популярности(по возрастанию)',
    sortProperty: 'rating'
  },
  searchValue:'',
  categoryValue: 0,
  pageChosen:0
}

const filterSlice=createSlice({
  name:'filter',
  initialState,
  reducers:{
    setCategoryValue(state,action){
      state.categoryValue=action.payload
    },
    setSearchValue(state,action){
      state.searchValue=action.payload
    },

    setSortValue(state,action){
     state.sortValue=action.payload
    },
    setPageChosen(state,action){
      state.pageChosen=action.payload
    }
  }
})

export const filterSelector=(state) =>state.filterSlice


export const {setCategoryValue,setSortValue,setPageChosen,setSearchValue}=filterSlice.actions
export default filterSlice.reducer