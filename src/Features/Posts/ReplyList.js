import { Reply } from "./Reply";
import "../../styles/Reply.css"

export function ReplyList({ item, repliedAuthor, token }) {
  return (
    <div className="replyList">
      {item.map((element, i) => (
        <Reply item={element} repliedAuthor={repliedAuthor} token={token} key={i}></Reply>
      ))}
    </div>
  );
}
