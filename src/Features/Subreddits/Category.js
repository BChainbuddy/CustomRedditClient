export default function Category({ item, posts }) {
  return (
    <div
      onClick={() => {
        posts(item);
      }}
    >
      <p>{item}</p>
    </div>
  );
}
