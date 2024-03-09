import { userInfoService } from "../services/userInfoService";
import classes from "../styles/BookArrayDisplay.module.css";
import { AddBookNavigator, Book, BookCardGrid, BookCardList } from "./BookCard";

interface BookArrayDisplayProps {
  books: Book[],
  isGrid?: boolean
}

export function BookArrayDisplay({ books, isGrid = false }: BookArrayDisplayProps) {
  const user = userInfoService.getSavedUserInfo();

  return (
    <div className={classes.content}>
      <div className={isGrid ? classes.bookLibraryGrid : classes.bookLibrary}>
        {isGrid
          ? books.map((book) => (
              <BookCardGrid key={book.id} book={book} />
            ))
          : books.map((book) => (
              <BookCardList key={book.id} book={book} />
            ))}
        {user && <AddBookNavigator />}
      </div>
    </div>
  );
}
