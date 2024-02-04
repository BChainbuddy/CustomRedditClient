import { useEffect } from "react";
import Category from "./Category";
import { getCategories, getPopularSubreddits } from "./SubredditsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Subreddit({ token }) {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      console.log(`This is the access token ${token}`);
      dispatch(getPopularSubreddits(token));
    }
  }, [token]);
  let item = ["Nika", "Jaka"];
  return (
    <div>
      {item.map((item, i) => (
        <Category item={item} key={i}></Category>
      ))}
    </div>
  );
}
