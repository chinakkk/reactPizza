import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    // пример с данными
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия, генерируются автоматически из имен ключей редьюсеров
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default counterSlice.reducer;