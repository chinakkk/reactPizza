import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export type pizzaItemType = {
    id: string;
    imageUrl: string;
    name: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

enum StatusPizza {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface pizzaSliceType {
    items: pizzaItemType[];
    status: StatusPizza;
}

const initialState: pizzaSliceType = {
    items: [],
    status: StatusPizza.LOADING
}
export const sendingAxiosPizza = createAsyncThunk<pizzaItemType[], Record<string, string>>('pizza/sendingAxiosPizzaStatus',
    async  ({
               category,
               sortBy,
               sortOrder,
               pageChosen
           }) => {
        const {data} = await axios.get<pizzaItemType[]>(`https://63da0275b28a3148f67cfe09.mockapi.io/items?page=${Number(pageChosen) + 1}&limit=4&` + category + sortBy + sortOrder)
        return data
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},


    extraReducers: (builder) => {

        builder.addCase(sendingAxiosPizza.pending, (state,) => {
            state.items = []
            state.status = StatusPizza.LOADING
        });
        builder.addCase(sendingAxiosPizza.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = StatusPizza.SUCCESS
        });
        builder.addCase(sendingAxiosPizza.rejected, (state) => {
            state.status = StatusPizza.ERROR
            state.items = []
        });

    }
})

export const {} = pizzaSlice.actions
export default pizzaSlice.reducer