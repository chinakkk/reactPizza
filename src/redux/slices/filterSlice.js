import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sortValue: {
    name: 'популярности(по возрастанию)',
    sortProperty: 'rating'
  },
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
    setSortValue(state,action){
     state.sortValue=action.payload
    },
    setPageChosen(state,action){
      state.pageChosen=action.payload
    }
  }
})

export const {setCategoryValue,setSortValue,setPageChosen}=filterSlice.actions
export default filterSlice.reducer