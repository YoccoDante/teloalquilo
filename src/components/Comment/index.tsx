import { CommentModel } from "../../models/comment/commentModel"
import "./index.css"
import RoundedPic from "../RoundedPic/ProfilePic"

interface CommentProps {
    comment:CommentModel
}

function Comment( {comment}:CommentProps ) {
  return (
    <div className='Comment'>
        <RoundedPic pic={comment.commenter_profile_pic}/>
        <div className="CommentBoxT">
          <section className="OwnerData">
            <p className="OwnerName">
              {comment.commenter_full_name}
            </p>
            <p className="Date">{comment.date}</p>
          </section>
          <p className="Content">{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment