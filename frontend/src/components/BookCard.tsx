import { useState } from "react";
import classes from "../styles/BookCard.module.css";
import { Link, Navigate } from "react-router-dom";
import classNames from 'classnames'
import { DEFAULT_IMAGE } from "../services/BookService";
import { Button } from "./Button";

export interface Book {
  id: number;
  title: string;
  author: string;
  genres?: string[];
  image: string
}

interface BookCardProps {
  book: Book;
  disabled?: boolean
}

interface BaseBookCardProps extends BookCardProps {
  isExtended?: boolean
}

export function AddBookNavigator() {
  return (
    <Link className={classNames(classes.bookCard, classes.link)} to='/books/new'><img alt="add book button" src="../../images/plus.svg"/></Link>
  )
}

function BookCard({isExtended = true, book, disabled = false}: BaseBookCardProps) {
  const [isClicked, setisClicked] = useState(false);

  return ((isClicked && !disabled) ? <Navigate  to={`/bookDetails/${book.id}`}/> : (
    <div className={classes.BookCard} onClick={() => setisClicked(true)}>
        <img className={classes.image} alt="Book image" src={book.image ?? DEFAULT_IMAGE}/>
        {isExtended && <p>{book.id}</p>}
        <p>{book.title}</p>
        {isExtended && (
          <>
            <p>{book.author}</p>
            <ul>
              {book.genres?.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </>
       )}
    </div>
  ))
}

export function BookCardGrid({ book, disabled = false }: BookCardProps) {
  return (
    <div className={classes.bookCard}>
      <BookCard book={book} isExtended={true} disabled={disabled} />
    </div>
  )
}

export function BookCardList({ book }: BookCardProps) {
  const [isExtended, setIsExtended] = useState(false);

  return ( (
    <div className={classes.bookCard}>
      <BookCard book={book} isExtended={isExtended} />
      <Button
        className={classes.extend}
        onClick={() => setIsExtended(!isExtended)}
      >
        <i
          className={`${classes.arrow} ${
            isExtended ? classes.up : classes.down
          }`}
        ></i>
      </Button>
    </div>
  ))
}
