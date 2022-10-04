import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ListState = {
  listData: null | any;
  listLoading: boolean;
  listError: null | string;
};

export type ListPayload = {
  name: string;
};

const initialState: ListState = {
  listData: null,
  listLoading: false,
  listError: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    loadListRequest(state, action: PayloadAction<ListPayload>) {
      state.listLoading = true;
    },
    loadListSuccess(state, action) {},
    loadListFailure(state, action) {},
  },
});

const { reducer, actions } = listSlice;
export const { loadListRequest } = actions;
export default reducer;
