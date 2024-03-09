import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { Form } from "./Form";
import { Input } from "./Input";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { bookService } from "../services/BookService";
import { useNavigate } from "react-router";
import { Spinner } from "./Loading";
import { ValidationError } from "../services/HttpService";
import { Error } from "./Error";

export function AddBooKForm() {
  const navigate = useNavigate();

  const [bookInput, setBookInput] = useState({
    title: "",
    author: "",
    genres: "",
    image: "",
  });

  const {
    trigger: onSubmit,
    loading,
    error,
  } = useAsyncAction(async (event: FormEvent) => {
    event.preventDefault();

    const book = await bookService.createBook(bookInput);

    navigate(`/bookDetails/${book.id}`);
  });

  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={bookInput.title}
        setValue={(value) => setBookInput({ ...bookInput, title: value })}
        placeholder="Title"
        errors={getErrorForField(error, 'title')}
      />

      <Input
        value={bookInput.author}
        setValue={(value) => setBookInput({ ...bookInput, author: value })}
        placeholder="Author"
        errors={getErrorForField(error, 'author')}
      />

      <Input
        value={bookInput.genres}
        setValue={(value) => setBookInput({ ...bookInput, genres: value })}
        placeholder="Genres"
        errors={getErrorForField(error, 'genres')}
      />

      <Input
        value={bookInput.image}
        setValue={(value) => setBookInput({ ...bookInput, image: value })}
        placeholder="Image url"
        errors={getErrorForField(error, 'image')}
      />

      <Button
        type="submit"
        disabled={loading}
        variant={loading ? "disabled" : "primary"}
      >
        Add
      </Button>
      {loading && <Spinner />}
      {!!error && <Error errorMessage={getFormError(error)}/>}
    </Form>
  );
}

function getErrorForField(error: unknown, field: string) {
  if (!(error instanceof ValidationError)) {
    return undefined;
  }

  return error.fieldErrors[field];
}

function getFormError(error: unknown) {
  if (!(error instanceof ValidationError)) {
    return "Ooops something went wrong!";
  }

  return error.formErrors.join(", ");
}
