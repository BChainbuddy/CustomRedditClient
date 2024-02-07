import "../../styles/Post.css";
import PhotoSlide from "./PhotoSlide";

export default function Post({ item }) {
  return (
    <div className="post">
      <div className="upvote">
        <p>{item.ups}</p>
      </div>
      <div className="content">
        <p className="title">{item.title}</p>
        {item.selftext ? (
          <p
            className="text"
            style={
              item.media_metadata ? { marginBottom: 20 } : { marginBottom: 0 }
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
        <p className="author">{item.author}</p>
      </div>
    </div>
  );
}

// {item.media_metadata !== undefined ? (
//   Object.values(item.media_metadata).map((element, i) => (
//     <img
//       src={`${element.s.u.replace(/&amp;/g, "&")}`}
//       width={
//         element.s.x > element.s.y
//           ? maxSize
//           : element.s.x === element.s.y
//           ? maxSize
//           : (element.s.x / element.s.y) * maxSize
//       }
//       height={
//         element.s.y > element.s.x
//           ? maxSize
//           : element.s.x === element.s.y
//           ? maxSize
//           : (element.s.y / element.s.x) * maxSize
//       }
//       key={i}
//     ></img>
//   ))
// ) : (
//   <div></div>
// )}
