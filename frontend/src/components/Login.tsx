import { FormEvent, useState } from "react";
import { AuthorizationError, authService } from "../services/authService";
import { useLocation, useNavigate } from "react-router";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { Spinner } from "./Loading";
import { Error } from "./Error";
import { BadRequestError } from "../services/HttpService";
import { Form } from "./Form";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loading,
    error,
    trigger: onSubmit,
  } = useAsyncAction(async (event: FormEvent) => {
    event.preventDefault();

    await authService.login({ email, password });
    navigate(location.state?.locationFrom || "/library");
  });

  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={email}
        setValue={setEmail}
        placeholder="Email"
        type="email"
      />
      <Input
        value={password}
        setValue={SetPassword}
        placeholder="Password"
        type="password"
      />
      <Button
        type="submit"
        disabled={loading}
        variant={loading ? "disabled" : "primary"}
      >
        Login
      </Button>
      {loading && <Spinner />}

      {error ? (
        error instanceof BadRequestError ? (
          <Error errorMessage="Invalid input" />
        ) : (
          <Error errorMessage="Sorry! Something went wrong." />
        )
      ) : null}
    </Form>
  );
}
