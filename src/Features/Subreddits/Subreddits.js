import { useEffect } from "react";
import Category from "./Category";
import {
  getCategories,
  getPopularSubreddits,
  category,
  categoriesState,
} from "./SubredditsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getInitialState } from "../Posts/PostsSlice";
import "../../styles/Subreddits.css";

export default function Subreddit({ token }) {
  const categories = useSelector(getCategories);
  const state = useSelector(categoriesState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      // console.log(`This is the access token in Subreddit ${token}`);
      dispatch(getPopularSubreddits(token));
    }
  }, [token]);

  function getPosts(subreddit) {
    // console.log(subreddit);
    dispatch(getInitialState({ token: token, category: subreddit }));
    dispatch(category(subreddit));
  }

  return (
    <div className="categories">
      {categories.length > 0 ? (
        categories.map((item, i) => (
          <Category item={item} key={i} posts={getPosts}></Category>
        ))
      ) : state.isLoading ? (
        <p className="noCategories">Loading categories...</p>
      ) : state.hasError ? (
        <p className="noCategories">Reload the web page...</p>
      ) : (
        <></>
      )}
    </div>
  );
}
