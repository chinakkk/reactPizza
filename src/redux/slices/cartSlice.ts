import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type cartItemType = {
    id: string;
    imageUrl: string;
    name: string,
    type: number;
    size: number;
    price: number;
    count: number;
}

interface cartSliceType {
    cartItems: cartItemType[];
    totalPrice: number;
}

const initialState: cartSliceType = {
    cartItems: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<cartItemType>) {
            const findedPizza = state.cartItems.find((cartItem) => cartItem.id === action.payload.id)
            if (findedPizza) findedPizza.count += 1
            else state.cartItems.push(action.payload)

            state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
        },
        removeFromCart(state, action:PayloadAction<string>) {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)

            state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
        },
        clearCart(state) {
            state.cartItems = []

            state.totalPrice = 0
        },
        minusPizzaInCart(state, action:PayloadAction<string>) {
            const findedPizza = state.cartItems.find((cartItem) => cartItem.id === action.payload)
            if (findedPizza) {
                findedPizza.count -= 1
                if (findedPizza.count === 0) state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
            }

            state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
        },
        plusPizzaInCart(state, action:PayloadAction<string>) {
            const findedPizza = state.cartItems.find((cartItem) => cartItem.id === action.payload)
            if (findedPizza) findedPizza.count += 1

            state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
        },
    }
})

export const cartSelector = (state: RootState) => state.cartSlice


export const cartSelectorFindById = (id: string) => {
    return (state: RootState) => {
        return state.cartSlice.cartItems.find((cartItem) => cartItem.id === id)
    }
}


export const {addToCart, removeFromCart, clearCart, minusPizzaInCart, plusPizzaInCart} = cartSlice.actions
export default cartSlice.reducer






