export default function Post({ item }) {
  return (
    <div>
      <p>{item.ups}</p>
      <p>{item.author}</p>
      <p>{item.title}</p>
      {item.selftext ? <p>{item.selftext}</p> : <div></div>}
      {item.media_metadata ? (
        item.media_metadata.map((element) => {
          <img
            src={element.s.u}
            width={element.s.x}
            height={element.s.y}
          ></img>;
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
