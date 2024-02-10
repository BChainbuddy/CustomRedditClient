import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { category } from "../Subreddits/SubredditsSlice";

// let initialState = [
//   { author: "Jaka", src: "", time: "1 day ago", likes: "14" },
//   { author: "Nika", src: "", time: "1 day ago", likes: "14" },
//   { author: "Mila Jera", src: "", time: "1 day ago", likes: "14" },
// ];

// all_awardings: [];
// allow_live_comments: false;
// approved_at_utc: null;
// approved_by: null;
// archived: false;
// author: "sheerduckinghubris";
// author_flair_background_color: null;
// author_flair_css_class: null;
// author_flair_richtext: [];
// author_flair_template_id: null;
// author_flair_text: null;
// author_flair_text_color: null;
// author_flair_type: "text";
// author_fullname: "t2_h9kj18j6z";
// author_is_blocked: false;
// author_patreon_flair: false;
// author_premium: false;
// awarders: [];
// banned_at_utc: null;
// banned_by: null;
// can_gild: false;
// can_mod_post: false;
// category: null;
// clicked: false;
// content_categories: null;
// contest_mode: false;
// created: 1707085449;
// created_utc: 1707085449;
// discussion_type: null;
// distinguished: null;
// domain: "self.AskReddit";
// downs: 0;
// edited: false;
// gilded: 0;
// gildings: {
// }
// hidden: false;
// hide_score: false;
// id: "1aj0ez0";
// is_created_from_ads_ui: false;
// is_crosspostable: true;
// is_meta: false;
// is_original_content: false;
// is_reddit_media_domain: false;
// is_robot_indexable: true;
// is_self: true;
// is_video: false;
// likes: null;
// link_flair_background_color: "";
// link_flair_css_class: null;
// link_flair_richtext: [];
// link_flair_text: null;
// link_flair_text_color: "dark";
// link_flair_type: "text";
// locked: false;
// media: null;
// media_embed: {
// }
// media_only: false;
// mod_note: null;
// mod_reason_by: null;
// mod_reason_title: null;
// mod_reports: [];
// name: "t3_1aj0ez0";
// no_follow: false;
// num_comments: 374;
// num_crossposts: 0;
// num_reports: null;
// over_18: false;
// parent_whitelist_status: "all_ads";
// permalink: "/r/AskReddit/comments/1aj0ez0/who_were_the_most_dangerous_idiots_to_ever_live/";
// pinned: false;
// pwls: 6;
// quarantine: false;
// removal_reason: null;
// removed_by: null;
// removed_by_category: null;
// report_reasons: null;
// saved: false;
// score: 524;
// secure_media: null;
// secure_media_embed: {
// }
// selftext: "";
// selftext_html: null;
// send_replies: true;
// spoiler: false;
// stickied: false;
// subreddit: "AskReddit";
// subreddit_id: "t5_2qh1i";
// subreddit_name_prefixed: "r/AskReddit";
// subreddit_subscribers: 44952392;
// subreddit_type: "public";
// suggested_sort: null;
// thumbnail: "";
// title: "who were the most dangerous idiots to ever live?";
// top_awarded_type: null;
// total_awards_received: 0;
// treatment_tags: [];
// ups: 524;
// upvote_ratio: 0.87;
// url: "https://www.reddit.com/r/AskReddit/comments/1aj0ez0/who_were_the_most_dangerous_idiots_to_ever_live/";
// user_reports: [];
// view_count: null;
// visited: false;
// whitelist_status: "all_ads";
// wls: 6;

export const getInitialState = createAsyncThunk(
  "Posts/getInitialState",
  async ({ token, category }) => {
    console.log(`This is the token in the SLICE ${token}`);
    const params = {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "User-Agent":
          "android:com.example.redditclient:v1.0.0 (by /u/bchainbuddy)",
      },
    };
    console.log(`This is the category ${category}`);
    const url = `https://oauth.reddit.com/r/${category}?limit=100`;

    const response = await fetch(url, params);
    const data = await response.json();
    console.log(data.data.children);
    let list = [];

    data.data.children.forEach((element) => {
      list.push({
        author: element.data.author,
        title: element.data.title,
        selftext: element.data.selftext,
        media_metadata: element.data.media_metadata
          ? element.data.media_metadata
          : undefined,
        preview: element.data.preview,
        ups: element.data.ups,
        id: element.data.id,
        voted: 0,
      });
    });
    console.log("Works!");
    console.log(list);
    return list;
  }
);

//    `https://oauth.reddit.com/r/Home/search?q=${e}&sort=hot&limit=100`

export const searchSubreddit = createAsyncThunk(
  "/Posts/SearchSubreddit",
  async ({ token, category, searchParams }) => {
    const params = {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "User-Agent":
          "android:com.example.redditclient:v1.0.0 (by /u/bchainbuddy)",
      },
    };
    const url = `https://oauth.reddit.com/r/${category}/search?q=${searchParams}&sort=hot&limit=100`;

    const response = await fetch(url, params);
    const data = await response.json();
    console.log(data.data.children);
    let list = [];

    data.data.children.forEach((element) => {
      list.push({
        author: element.data.author,
        title: element.data.title,
        selftext: element.data.selftext,
        media_metadata: element.data.media_metadata
          ? element.data.media_metadata
          : undefined,
        preview: element.data.preview,
        ups: element.data.ups,
        id: element.data.id,
        voted: 0,
      });
    });
    console.log("Works!");
    console.log(list);
    return list;
  }
);

export const vote = createAsyncThunk(
  "/Posts/Vote",
  async ({ token, direction, id }) => {
    const params = {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "User-Agent":
          "android:com.example.redditclient:v1.0.0 (by /u/bchainbuddy)",
      },
    };
    const url = `https://oauth.reddit.com/api/vote?dir=${direction}&id=${`t3_${id}`}`;

    const response = await fetch(url, params);
    const data = await response.json();
    console.log(data);
  }
);

const slice = createSlice({
  name: "Posts",
  initialState: {
    chosenCategory: "",
    posts: [],
    hasError: false,
    isLoading: false,
  },
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
        state.posts = action.payload;
      })
      .addCase(searchSubreddit.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(searchSubreddit.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(searchSubreddit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.posts = action.payload;
      })
  },
});

export default slice.reducer;
export const { search } = slice.actions;
export const getPosts = (state) => state.postsSlice.posts;
export const loadingPosts = (state) => state.postsSlice.isLoading;
export const errorLoading = (state) => state.postsSlice.hasError;
