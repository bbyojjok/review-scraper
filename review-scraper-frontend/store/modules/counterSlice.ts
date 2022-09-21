import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  value: number;
};

const initialState: StateType = { value: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    plusCounter: (state: StateType, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    minusCounter: (state: StateType, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export const { plusCounter } = counterSlice.actions;

export default counterSlice;
