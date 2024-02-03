import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { category } from "../Subreddits/SubredditsSlice";

let initialState = [
  { author: "Jaka", src: "", time: "1 day ago", likes: "14" },
  { author: "Nika", src: "", time: "1 day ago", likes: "14" },
  { author: "Mila Jera", src: "", time: "1 day ago", likes: "14" },
];

async function connection() {
  await fetch("", {
    method: "GET",
    body: {},
    headers: {},
  });
}

const getInitialState = createAsyncThunk("Posts/getInitialState", async () => {
  //GET [/r/subreddit]/search
  let request = await fetch("", {
    method: "GET",
  });
  request = request.json();
  return request;
});

const slice = createSlice({
  name: "Posts",
  initialState: { posts: initialState, hasError: false, isLoading: false },
  reducers: {
    search: (state, action) => {
      state.filter((item) => {
        item.includes(action.payload);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialState.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getInitialState.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getInitialState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

export default slice.reducer;
export const { search } = slice.actions;
export const getPosts = (state) => state.postsSlice.posts;
