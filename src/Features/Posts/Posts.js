import Post from "./Post";
import { getPosts } from "./PostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getInitialState } from "./PostsSlice";
import { useEffect } from "react";

export default function Posts() {
  const posts = useSelector(getPosts);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((item, i) => <Post item={item} key={i}></Post>)
      ) : (
        <div></div>
      )}
    </div>
  );
}
