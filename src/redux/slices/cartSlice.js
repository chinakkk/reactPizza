import {createSlice} from "@reduxjs/toolkit";
import cartItem from "../../components/CartItem/CartItem";

const initialState = {
  cartItems: [
    {
      id: 3,
      imageUrl: 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg',
      name: 'Кисло-сладкий цыпленок',
      types: [1],
      sizes: [26, 30, 40],
      price: 275,
      category: 2,
      rating: 2,
      count:1
    },
  ],
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const findedPizza = state.cartItems.find((cartItem) => cartItem.id === action.payload.id)
      if (findedPizza) findedPizza.count += 1
      else state.cartItems.push({...action.payload, count: 1})

      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)

      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
    },
    clearCart(state) {
      state.cartItems = []

      state.totalPrice = 0
    },
    minusPizzaInCart(state, action) {
      const findedPizza = state.cartItems.find((cartItem) => cartItem.id === action.payload)
      findedPizza.count -= 1
      if (findedPizza.count === 0) state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)

      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
    },
    plusPizzaInCart(state, action) {
      const findedPizza = state.cartItems.find((cartItem) => cartItem.id === action.payload)
      findedPizza.count += 1

      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
    },


  }
})

export const {addToCart, removeFromCart, clearCart, minusPizzaInCart, plusPizzaInCart} = cartSlice.actions
export default cartSlice.reducer