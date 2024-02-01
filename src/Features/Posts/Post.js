export default function Post({ item }) {
  return (
    <div>
      <p>{item.likes}</p>
      <p>{item.author}</p>
      <p>{item.time}</p>
    </div>
  );
}
