import { useEffect } from "react";
import Category from "./Category";
import { getCategories, getPopularSubreddits } from "./SubredditsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getInitialState } from "../Posts/PostsSlice";
import "../../styles/Subreddits.css";

export default function Subreddit({ token }) {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      console.log(`This is the access token in Subreddit ${token}`);
      dispatch(getPopularSubreddits(token));
    }
  }, [token]);

  function getPosts(category) {
    console.log(category);
    dispatch(getInitialState({ token: token, category: category }));
  }

  return (
    <div className="categories">
      {categories.length > 0 ? (
        categories.map((item, i) => (
          <Category item={item} key={i} posts={getPosts}></Category>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
