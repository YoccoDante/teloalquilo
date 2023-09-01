import "./index.css"
import Comment from "../Comment"
import { CommentModel } from "../../models/comment/commentModel"

interface CommentBoxProps {
  comments:CommentModel[]
}

function Commentslist( {comments}:CommentBoxProps ) {
  return (
    <section className='CommentBox'>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment}/>
      ))}
    </section>
  )
}

export default Commentslist