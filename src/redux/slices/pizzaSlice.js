import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const sendingAxiosPizza = createAsyncThunk('pizza/sendingAxiosPizzaStatus', async ({category, sortBy, sortOrder, pageChosen}) =>
    {
      const {data} = await axios.get(`https://63da0275b28a3148f67cfe09.mockapi.io/items?page=${pageChosen + 1}&limit=4&` + category + sortBy + sortOrder)
      return data
    }
)

const initialState = {
  items: [],
  pageIsLoading:true
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
    setPageIsLoading(state,action){
      state.isLoading=action.payload
    }

  },
  extraReducers: {
    [sendingAxiosPizza.fulfilled]:(state,action) =>{
      state.items=action.payload
      state.pageIsLoading=false
    },
  },
})

export const {setItems,setPageIsLoading} = pizzaSlice.actions
export default pizzaSlice.reducer