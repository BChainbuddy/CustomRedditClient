import { useState } from "react";
import "../../styles/PhotoSlide.css";

export default function PhotoSlide({ media }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const maxSize = 300;

  return (
    <div className="photoGallery">
      {media.length > 1 ? (
        <img
          src="arrow.png"
          onClick={() => {
            if (photoIndex === 0) {
              setPhotoIndex(media.length - 1);
            } else {
              setPhotoIndex((prev) => prev - 1);
            }
          }}
          className="backButton"
        ></img>
      ) : (
        <></>
      )}
      <img
        src={`${media[photoIndex].s.u.replace(/&amp;/g, "&")}`}
        width={
          media[photoIndex].s.x > media[photoIndex].s.y
            ? maxSize
            : media[photoIndex].s.x === media[photoIndex].s.y
            ? maxSize
            : (media[photoIndex].s.x / media[photoIndex].s.y) * maxSize
        }
        height={
          media[photoIndex].s.y > media[photoIndex].s.x
            ? maxSize
            : media[photoIndex].s.x === media[photoIndex].s.y
            ? maxSize
            : (media[photoIndex].s.y / media[photoIndex].s.x) * maxSize
        }
      ></img>
      {media.length > 1 ? (
        <img
          src="arrow.png"
          onClick={() => {
            if (photoIndex === media.length - 1) {
              setPhotoIndex(0);
            } else {
              setPhotoIndex((prev) => prev + 1);
            }
          }}
          className="nextButton"
        ></img>
      ) : (
        <></>
      )}
    </div>
  );
}

{
  /* <a target="_blank" href="https://icons8.com/icon/37319/sort-down">
Sort Down
</a>{" "}
icon by{" "}
<a target="_blank" href="https://icons8.com">
Icons8
</a> */
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
