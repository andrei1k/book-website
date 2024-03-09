import { Comment } from "../services/CommentService";
import classes from '../styles/Comment.module.css'

interface CommentProps {
  comments: Comment[]
}

export function Comments({ comments }: CommentProps) {

  return(
    <div className={classes.comments}>
      <h3 className={classes.header}>Comment Section: </h3>
      {
        comments.map((comment, index) => <Comment key={index} comment={comment} />)
      }
    </div>
  )
}

function Comment({ comment }: {comment: Comment}){
  
  return (

    <div className={classes.comment}>
      <p>{comment.author}</p>
      <p>{comment.text}</p>
    </div>
  )
}