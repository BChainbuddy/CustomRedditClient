import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "Subreddit",
  initialState: initialState,
  reducers: {
    category: (state, action) => {
      //
    },
  },
});

export default slice.reducer;
export const { category } = slice.actions;
export const getCategories = (state) => state.subredditSlice;
