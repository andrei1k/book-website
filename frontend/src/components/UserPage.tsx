import { useState } from "react";
import { Button } from "./Button";
import classes from '../styles/UserPage.module.css'
import { BookInput } from "./BookInput";
import { useAsync } from "../hooks/useAsync";
import { Book } from "./BookCard";
import { Spinner } from "./Loading";
import { BookArrayDisplay } from "./BookArrayDisplay";
import { Error } from "./Error";
import { bookService } from "../services/BookService";

export function UserPage() {

  const [addBook, setAddBook]= useState(true)
  const [showReadBooks, setshowReadBooks]= useState(true)
  const [booksAdded, setBooksAdded] = useState(0)
  const { data: books, loading, error } = useAsync(() => bookService.getReadBooks(), [booksAdded])

  return (
    <div className={classes.content}>
      <div className={classes.controlers}>
        <Button variant="secondary" onClick={() => {setshowReadBooks(!showReadBooks)}}>Show My Read Books</Button>
        <Button variant="secondary" onClick={() => {setAddBook(!addBook)}}>Add Book To Read</Button>
      </div>
      {addBook ? <BookInput booksAdded={booksAdded} setBooksAdded={setBooksAdded}/> : null}
      {showReadBooks && <UserBookLibrary books={books} loading={loading} error={error} />}
    </div>
  )
}

interface UserBookLibraryProps {
  books: Book[] | undefined,
  loading: boolean,
  error: unknown
}

export function UserBookLibrary({ books, loading, error }: UserBookLibraryProps) {

  return (
    <div className={classes.content}>
      {loading && <Spinner />}
      {books && <BookArrayDisplay books={books} isGrid={false} />}
      {!!error && (
        <Error errorMessage="Something went wrong! Try again later." />
      )}
    </div>
  );
}