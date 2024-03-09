import { FormEvent, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { bookService } from "../services/BookService";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { Spinner } from "./Loading";
import { Error } from "./Error";
import classes from '../styles/BookInput.module.css'
import { BadRequestError } from "../services/HttpService";

interface BookInputProps {
  booksAdded: number;
  setBooksAdded: (count: number) => void;
}

export function BookInput({ booksAdded, setBooksAdded }: BookInputProps) {
  const [bookId, setBookId] = useState("");
  const { loading, error, trigger } = useAsyncAction(async (bookId: number) =>{
    await bookService.addBookToRead(bookId)
    setBooksAdded(booksAdded + 1);
  }
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    trigger(Number(bookId));
    
  };

  return (
    <>
      <form className={classes.form} onSubmit={onSubmit}>
        <Input type="number" value={bookId} setValue={setBookId} placeholder="Book Number" />
        <Button type="submit" disabled={loading} variant={loading ? 'disabled' : 'primary'}>Add</Button>
        {loading && <Spinner/>}
      </form>
      {!!error && <Error errorMessage={error instanceof BadRequestError ? "Book is already added." : "Something went wrong."} />}
    </>
  );
}
