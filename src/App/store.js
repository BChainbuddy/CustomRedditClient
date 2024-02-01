import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../Features/Posts/PostsSlice";
import subredditReducer from "../Features/Subreddits/SubredditsSlice";

export default configureStore({
  reducer: {
    postsSlice: postsReducer,
    subredditSlice: subredditReducer,
  },
});
