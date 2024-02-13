export function Reply({ item }) {
  console.log(item);
  return (
    <div>
      <div>
        <p>{item.author}</p>
        <p>{item.body}</p>
        <p>{item.ups}</p>
      </div>
      {item.replies ? (
        item.data.children.map((element) => (
          <Reply item={element.replies}></Reply>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
