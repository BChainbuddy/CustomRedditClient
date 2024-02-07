import "../../styles/Category.css";

export default function Category({ item, posts }) {
  return (
    <div
      onClick={() => {
        posts(item);
      }}
      className="category"
    >
      <p>{item}</p>
    </div>
  );
}
