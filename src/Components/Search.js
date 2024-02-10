import { useDispatch, useSelector } from "react-redux";
import "../styles/Search.css";
import { getInitialState, searchSubreddit } from "../Features/Posts/PostsSlice";
import { getChosenCategory } from "../Features/Subreddits/SubredditsSlice";

export default function Search({ token }) {
  const dispatch = useDispatch();

  const chosenCategory = useSelector(getChosenCategory);

  const searchQuery = (e) => {
    console.log(e.target.value);
    dispatch(
      searchSubreddit({
        token: token,
        category: chosenCategory,
        searchParams: e.target.value,
      })
    );
    if (!e.target.value) {
      dispatch(getInitialState({ token: token, category: chosenCategory }));
    }
  };

  return (
    <div className="searchSection">
      <label htmlFor="search" className="label">
        Search chosen Subreddit yourself:
      </label>
      <input id="search" className="search" onChange={searchQuery}></input>
    </div>
  );
}
