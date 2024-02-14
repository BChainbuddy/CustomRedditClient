import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Comment.css";
import { Reply } from "./Reply";
import { vote } from "./PostsSlice";

export function Comment({ comment, token }) {
  const [seeReplies, setSeeReplies] = useState(false);
  const [voted, setVoted] = useState(0);

  const dispatch = useDispatch();

  function toggleReplies() {
    if (seeReplies === false) {
      setSeeReplies(true);
    } else {
      setSeeReplies(false);
    }
  }

  function voteComment(dir) {
    console.log(comment.id);
    if (voted === dir) {
      dispatch(
        vote({ token: token, direction: 0, id: comment.id, post: false })
      );
      setVoted();
    } else {
      dispatch(
        vote({ token: token, direction: dir, id: comment.id, post: false })
      );
      setVoted(dir);
    }
  }

  return (
    <div>
      <div className="comment">
        <div className="commentUpvote">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`commentUp ${voted === 1 ? "votedUP" : ""}`}
            onClick={() => {
              voteComment(1);
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
            className={`commentUps ${
              voted === 1
                ? "commentVotedUP"
                : voted === -1
                ? "commentVotedDOWN"
                : ""
            }`}
          >
            {comment.ups}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`commentDown ${voted === -1 ? "votedDOWN" : ""}`}
            onClick={() => {
              voteComment(-1);
            }}
          >
            <path
              d="m19.707 9.293-7-7a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 5 11h3v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V11h3a1 1 0 0 0 .707-1.707zM15 9a1 1 0 0 0-1 1v10h-4V10a1 1 0 0 0-1-1H7.414L12 4.414 16.586 9z"
              style={{ fill: voted === -1 ? "#E3242B" : "#1c1b1e" }}
            />
          </svg>
        </div>
        <div className="commentContent">
          <p className="commentAuthor">{comment.author}</p>
          <p className="commentBody">{comment.body}</p>
          {comment.replies ? (
            <p className="seeReplies" onClick={() => toggleReplies()}>
              {seeReplies ? "hide replies" : "see replies"}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      {comment.replies && seeReplies ? (
        <div className="replySection">
          {comment.replies.data.children.map((item, i) => (
            <Reply
              item={item}
              repliedAuthor={comment.author}
              token={token}
            ></Reply>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
