import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPopularSubreddits = createAsyncThunk(
  "Subreddit/Popular",
  async (token) => {
    console.log(`This is the token in the SLICE ${token}`);
    const params = {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "User-Agent": "RedditClientv1.0",
      },
    };

    const url = "https://oauth.reddit.com/subreddits/popular?limit=100";

    const response = await fetch(url, params);
    console.log(response);
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error:", error));
    // console.log("It has happened!");
  }
);

const slice = createSlice({
  name: "Subreddit",
  initialState: {
    isLoading: false,
    hasError: false,
    categories: [],
  },
  reducers: {
    category: (state, action) => {
      //
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularSubreddits.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getPopularSubreddits.pending, (state) => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(getPopularSubreddits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.categories.push(action);
      });
  },
});

export default slice.reducer;
export const { category } = slice.actions;
export const getCategories = (state) => state.subredditSlice.categories;
