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
  status:'loading'
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }

  },
  extraReducers: {
    [sendingAxiosPizza.pending]:(state) =>{
      state.items=[]
      state.status='loading'
    },
    [sendingAxiosPizza.fulfilled]:(state,action) =>{
      state.items=action.payload
      state.status='success'
    },
    [sendingAxiosPizza.rejected]:(state) =>{
      state.status='error'
      state.items=[]

    },


  },
})

export const {setItems,status} = pizzaSlice.actions
export default pizzaSlice.reducer