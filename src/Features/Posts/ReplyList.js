import { Reply } from "./Reply";
import "../../styles/Reply.css"

export function ReplyList({ item, repliedAuthor, token }) {
  return (
    <div className="replyList">
      {item.map((element) => (
        <Reply item={element} repliedAuthor={repliedAuthor} token={token}></Reply>
      ))}
    </div>
  );
}
