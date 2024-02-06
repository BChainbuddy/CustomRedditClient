export default function Post({ item }) {
  const maxSize = 500;
  return (
    <div>
      <p>{item.ups}</p>
      <p>{item.author}</p>
      <p>{item.title}</p>
      {item.selftext ? <p>{item.selftext}</p> : <div></div>}
      {item.media_metadata !== undefined ? (
        Object.values(item.media_metadata).map((element, i) => (
          <img
            src={`${element.s.u.replace(/&amp;/g, "&")}`}
            width={
              element.s.x > element.s.y
                ? maxSize
                : element.s.x === element.s.y
                ? maxSize
                : (element.s.x / element.s.y) * maxSize
            }
            height={
              element.s.y > element.s.x
                ? maxSize
                : element.s.x === element.s.y
                ? maxSize
                : (element.s.y / element.s.x) * maxSize
            }
            key={i}
          ></img>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
