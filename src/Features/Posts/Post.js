import { useState } from "react";
import "../../styles/Post.css";
import PhotoSlide from "./PhotoSlide";
import { useDispatch, useSelector } from "react-redux";
import { closeComment, fetchComments, vote } from "./PostsSlice";
import { getChosenCategory } from "../Subreddits/SubredditsSlice";
import { Comment } from "./Comments";

export default function Post({ item, token }) {
  const maxSize = 300;
  const [voted, setVoted] = useState();
  const [animateComments, setAnimateComments] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector(getChosenCategory);

  function votePost(dir) {
    if (voted === dir) {
      dispatch(vote({ token: token, direction: 0, id: item.id, post: true }));
      setVoted();
    } else {
      dispatch(vote({ token: token, direction: dir, id: item.id, post: true }));
      setVoted(dir);
    }
  }

  function toggleComments() {
    if (item.comments === "") {
      dispatch(
        fetchComments({ token: token, id: item.id, category: category })
      );
      setTimeout(() => {
        setAnimateComments(true);
      }, 1000);
    } else {
      console.log("Closing the comments!");
      dispatch(closeComment(item.id));
    }
  }

  return (
    <div className="postContainer">
      <div className="post">
        <div className="upvote">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`voteUp ${voted === 1 ? "votedUP" : ""}`}
            onClick={() => {
              votePost(1);
            }}
          >
            <path
              d="m19.707 9.293-7-7a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 5 11h3v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V11h3a1 1 0 0 0 .707-1.707zM15 9a1 1 0 0 0-1 1v10h-4V10a1 1 0 0 0-1-1H7.414L12 4.414 16.586 9z"
              style={{
                fill: voted === 1 ? "#00c04b" : "#1c1b1e",
              }}
            />
          </svg>
          <p
            className={
              voted === 1 ? "votedUP" : voted === -1 ? "votedDOWN" : ""
            }
          >
            {item.ups}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`voteDown ${voted === -1 ? "votedDOWN" : ""}`}
            onClick={() => {
              votePost(-1);
            }}
          >
            <path
              d="m19.707 9.293-7-7a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 5 11h3v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V11h3a1 1 0 0 0 .707-1.707zM15 9a1 1 0 0 0-1 1v10h-4V10a1 1 0 0 0-1-1H7.414L12 4.414 16.586 9z"
              style={{ fill: voted === -1 ? "#E3242B" : "#1c1b1e" }}
            />
          </svg>
        </div>
        <div className="content">
          <p className="title">{item.title}</p>
          {item.selftext ? (
            <p
              className="text"
              style={
                item.media_metadata || item.preview
                  ? { marginBottom: 20 }
                  : { marginBottom: 0 }
              }
            >
              {item.selftext}
            </p>
          ) : (
            <div></div>
          )}
          {item.media_metadata !== undefined ? (
            <PhotoSlide media={Object.values(item.media_metadata)}></PhotoSlide>
          ) : (
            <div></div>
          )}
          {item.preview ? (
            <img
              className="picture"
              src={item.preview.images[0].source.url.replace(/&amp;/g, "&")}
              height={
                item.preview.images[0].source.height >
                item.preview.images[0].source.width
                  ? maxSize
                  : item.preview.images[0].source.height ===
                    item.preview.images[0].source.width
                  ? maxSize
                  : (item.preview.images[0].source.height /
                      item.preview.images[0].source.width) *
                    maxSize
              }
              width={
                item.preview.images[0].source.width >
                item.preview.images[0].source.height
                  ? maxSize
                  : item.preview.images[0].source.height ===
                    item.preview.images[0].source.width
                  ? maxSize
                  : (item.preview.images[0].source.width /
                      item.preview.images[0].source.height) *
                    maxSize
              }
            ></img>
          ) : (
            <></>
          )}
          <p className="author">{item.author}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            onClick={() => {
              toggleComments();
            }}
            className="commentsIcon"
          >
            <path d="M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.9l4.451,3.763a1,1,0,0,0,1.292,0L17.1,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,16a2,2,0,0,1-2,2H17.1a2,2,0,0,0-1.291.473L12,21.69,8.193,18.473h0A2,2,0,0,0,6.9,18H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H20a2,2,0,0,1,2,2Z" />
            <path d="M7,7h5a1,1,0,0,0,0-2H7A1,1,0,0,0,7,7Z" />
            <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z" />
            <path d="M17,13H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z" />
          </svg>
        </div>
      </div>
      {item.comments !== "" ? (
        <div className="commentSection">
          {item.comments.map((comment, i) => (
            <Comment comment={comment} token={token} key={i}></Comment>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
