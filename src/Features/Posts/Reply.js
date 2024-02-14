import { ReplyList } from "./ReplyList";
import "../../styles/Reply.css";
import { useDispatch } from "react-redux";
import { vote } from "./PostsSlice";
import { useState } from "react";

export function Reply({ item, repliedAuthor, token }) {
  const [voted, setVoted] = useState(0);
  const [seeReplies, setSeeReplies] = useState(false);

  console.log(item);

  const dispatch = useDispatch();

  function toggleReplies() {
    if (seeReplies === false) {
      setSeeReplies(true);
    } else {
      setSeeReplies(false);
    }
  }

  function voteReply(dir) {
    if (voted === dir) {
      dispatch(
        vote({ token: token, direction: 0, id: item.data.id, post: false })
      );
      setVoted();
    } else {
      dispatch(
        vote({ token: token, direction: dir, id: item.data.id, post: false })
      );
      setVoted(dir);
    }
  }
  return (
    <div>
      {item.data.body ? (
        <div className="reply">
          <div className="replyUpvote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="commentUp"
              onClick={() => {
                voteReply(1);
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
              className={`replyUps ${
                voted === 1
                  ? "replyVotedUP"
                  : voted === -1
                  ? "replyVotedDOWN"
                  : ""
              }`}
            >
              {item.data.ups}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="commentDown"
              onClick={() => {
                voteReply(-1);
              }}
            >
              <path
                d="m19.707 9.293-7-7a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 5 11h3v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V11h3a1 1 0 0 0 .707-1.707zM15 9a1 1 0 0 0-1 1v10h-4V10a1 1 0 0 0-1-1H7.414L12 4.414 16.586 9z"
                style={{ fill: voted === -1 ? "#E3242B" : "#1c1b1e" }}
              />
            </svg>
          </div>
          <div className="replyContent">
            <p className="replyAuthor">
              {item.data.author ? item.data.author : "Anonymous author"}
            </p>
            <p className="replyBody">{item.data.body}</p>
            <p className="repliedTo">Replied to {repliedAuthor}</p>
            {item.data.replies && item.data.body ? (
              <p className="seeReplies" onClick={() => toggleReplies()}>
                {seeReplies ? "hide replies" : "see replies"}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {item.data.replies && seeReplies ? (
        <ReplyList
          item={item.data.replies.data.children}
          repliedAuthor={item.data.author}
          token={token}
        ></ReplyList>
      ) : (
        <></>
      )}
    </div>
  );
}
