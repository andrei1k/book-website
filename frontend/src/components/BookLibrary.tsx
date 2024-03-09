import classes from "../styles/BookLibrary.module.css";
import { bookService } from "../services/BookService";
import { useAsync } from "../hooks/useAsync";
import { useSearchParams } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { useDelay } from "../hooks/useDelay";
import { useState } from "react";
import { Spinner } from "./Loading";
import { BookArrayDisplay } from "./BookArrayDisplay";
import { Error } from "./Error";

export function BookLibrary() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isGrid = searchParams.get("layout") === "grid";
  const titleQuery = searchParams.get("title") ?? "";
  const [searchTitle, setSearchTitle] = useState(titleQuery);

  const { data: books, loading, error } = useAsync(() => bookService.getBooks(titleQuery), [titleQuery]);

  const changeSearchParam = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const changeSearchParamWithDelay = useDelay(changeSearchParam, 500);

  return (
    <div className={classes.content}>
      <Input
        value={searchTitle}
        setValue={(value: string) => {
          setSearchTitle(value);
          changeSearchParamWithDelay("title", value);
        }}
        placeholder="Search by title"
      />
      <Button
        variant="secondary"
        onClick={() => changeSearchParam("layout", isGrid ? "list" : "grid")}
      >
        Change layout of book library
      </Button>
      <h3 className={classes.heading}>
        Book library {`As ${isGrid ? "Grid" : "List"}`}
      </h3>
      {loading && <Spinner />}
      {books && <BookArrayDisplay books={books} isGrid={isGrid} />}
      {!!error && (
        <Error errorMessage="Something went wrong! Try again later." />
      )}
    </div>
  );
}