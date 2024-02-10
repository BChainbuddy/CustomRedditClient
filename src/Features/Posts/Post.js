import { useState } from "react";
import "../../styles/Post.css";
import PhotoSlide from "./PhotoSlide";
import { useDispatch } from "react-redux";
import { vote } from "./PostsSlice";

export default function Post({ item, token }) {
  const maxSize = 300;
  const [voted, setVoted] = useState();

  const dispatch = useDispatch();

  function votePost(dir) {
    if (voted === dir) {
      dispatch(vote({ token: token, direction: 0, id: item.id }));
      setVoted();
    } else {
      dispatch(vote({ token: token, direction: dir, id: item.id }));
      setVoted(dir);
    }
  }

  return (
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
          className={voted === 1 ? "votedUP" : voted === -1 ? "votedDOWN" : ""}
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
      </div>
    </div>
  );
}
