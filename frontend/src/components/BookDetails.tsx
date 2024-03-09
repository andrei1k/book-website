import { Navigate, useLocation, useParams } from "react-router";
import { BookCardGrid } from "./BookCard";
import { bookService } from "../services/BookService";
import { Spinner } from "./Loading";
import { Error } from "./Error";
import { userInfoService } from "../services/userInfoService";
import { useAsync } from "../hooks/useAsync";
import classes from '../styles/BookDetails.module.css'
import { Button } from "./Button";
import { useState } from "react";
import { commentsService } from "../services/CommentService";
import { Comments } from "./Comment";
import { useAsyncAction } from "../hooks/useAsyncAction";

export function BookDetails() {
  const {id} = useParams();
  const location = useLocation();

  const bookId = id ?? -1;

  const { data: book, loading, error} = useAsync(() => bookService.getBookByID(bookId), [])

  const user = userInfoService.getSavedUserInfo()

  const [isClicked, setIsClicked] = useState(false)

  const { trigger, loading: loadAddingBook, error: errorAddingBook} = useAsyncAction(() => bookService.addBookToRead(Number(bookId)))

  const { data: comments, loading: commentsLoading, error: commentsError} = useAsync(() => commentsService.getComments(bookId), [])

  const loaded = !loading && !error

  return (
    <div className={classes.details}>
      {book && (user ? <BookCardGrid book={book} disabled={true} /> 
                     : <Navigate to='/login' state={{ locationFrom: location.pathname }} />)}
      {
        loaded && 
        <>
          <Button onClick={() => {trigger(), setIsClicked(true)}} disabled={isClicked}>Add to my List</Button>
          {loadAddingBook && <Spinner />}
          {!!errorAddingBook && <Error errorMessage='Could not add the book!'/>}
        </>
      }
      {comments && <Comments  comments={comments}/>}
      {(loading || commentsLoading) && <Spinner/>}
      {(!!error || !!commentsError) && <Error errorMessage="Something went wrong"/>}
    </div>
  )
}