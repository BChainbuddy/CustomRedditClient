import Post from "./Post";
import { errorLoading, getPosts, loadingPosts } from "./PostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getInitialState } from "./PostsSlice";
import { useEffect } from "react";
import "../../styles/Posts.css";

export default function Posts({token}) {
  const posts = useSelector(getPosts);
  const isLoading = useSelector(loadingPosts);
  const hasError = useSelector(errorLoading);

  return (
    <div className="posts">
      {posts.length > 0 && isLoading === false && hasError === false ? (
        posts.map((item, i) => <Post item={item} token={token} key={i}></Post>)
      ) : isLoading === true ? (
        <p className="noPosts">Loading posts...</p>
      ) : hasError === true ? (
        <p className="noPosts">Error loading the posts</p>
      ) : (
        <></>
      )}
      {posts.length > 0 && isLoading === false && hasError === false ? (
        <a href="#" className="top">
          BACK TO TOP
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}
