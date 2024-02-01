import Post from "./Post";
import { getPosts } from "./PostsSlice";
import { useSelector } from "react-redux";

export default function Posts() {
  const posts = useSelector(getPosts);
  return (
    <div>
      {posts.map((item, i) => (
        <Post item={item} key={i}></Post>
      ))}
    </div>
  );
}
