import Category from "./Category";
import { getCategories } from "./SubredditsSlice";
import { useSelector } from "react-redux";

export default function Subreddit() {
  const categories = useSelector(getCategories);
  let item = ["Nika"];
  return (
    <div>
      {item.map((item, i) => (
        <Category item={item} key={i}></Category>
      ))}
    </div>
  );
}
