import { createSlice } from "@reduxjs/toolkit";
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
// https://www.reddit.com/api/v1/authorize?client_id=fJxQjMqatVbP8cplZ5JGMA&response_type=code&state=oK41wUFFS9In9bho&redirect_uri=http://localhost:3000&duration=permanent&scope=read
//https://www.reddit.com/api/v1/authorize?client_id=fJxQjMqatVbP8cplZ5JGMA&response_type=code&state=pkutXCAKMfFvECNU&redirect_uri=http%3A%2F%2Flocalhost%3A3000&duration=permanent&scope=identity
//https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING
// identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread


const slice = createSlice({
  name: "Posts",
  initialState: initialState,
  reducers: {
    search: (state, action) => {
      state.filter((item) => {
        item.includes(action.payload);
      });
    },
  },
  //   extraReducers: {
  //     [category]: (state, action) => {},
  //   },
});

export default slice.reducer;
export const { search } = slice.actions;
export const getPosts = (state) => state.postsSlice;
