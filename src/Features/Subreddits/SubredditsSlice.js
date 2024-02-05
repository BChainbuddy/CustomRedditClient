import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPopularSubreddits = createAsyncThunk(
  "Subreddit/Popular",
  async (token) => {
    console.log(`This is the token in the SLICE ${token}`);
    const params = {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "User-Agent":
          "android:com.example.redditclient:v1.0.0 (by /u/bchainbuddy)",
      },
    };

    const url = "https://oauth.reddit.com/subreddits/popular?limit=10";

    const response = await fetch(url, params);
    const data = await response.json();
    console.log(data.data.children);
    let list = [];

    data.data.children.forEach((item) => {
      list.push(item.data.display_name);
    });

    console.log("Works!");
    console.log(list);
    return list;
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
        state.categories = action.payload;
      });
  },
});

export default slice.reducer;
export const { category } = slice.actions;
export const getCategories = (state) => state.subredditSlice.categories;
