import Post from "./Post";
import { getPosts } from "./PostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getInitialState } from "./PostsSlice";
import { useEffect } from "react";
import "../../styles/Posts.css";

export default function Posts() {
  const posts = useSelector(getPosts);

  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((item, i) => <Post item={item} key={i}></Post>)
      ) : (
        <div></div>
      )}
    </div>
  );
}
