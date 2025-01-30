import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Body from "../components/Body";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  let usernameField = useRef();
  let passwordField = useRef();
  const [isLoading, setIsLoading] = useState(true);

  function onSubmit(ev) {
    ev.preventDefault();
    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if (!username) {
      errors.username = "Please double check your username";
    }
    if (!password) {
      errors.password = "Please double check your password";
    }

    setFormErrors(errors);
    setInterval(alert("wait"), 3000);
    if (Object.keys(errors).length > 0) {
      return;
    }

    console.log("After state");
  }

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  return (
    <Body>
      <h1>Login</h1>
      <div class="form-container">
        <Form onSubmit={onSubmit}>
          <InputField
            name="username"
            label="Username or email address"
            error={formErrors.username}
            fieldRef={usernameField}
          />
          <InputField
            name="password"
            type="password"
            label="Password"
            error={formErrors.password}
            fieldRef={passwordField}
          />
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <Button variant="primary" type="submit">
              Login
            </Button>
          )}
        </Form>
      </div>
      <p>
        Don&apos;t have an account? <Link to="/register">Register here!</Link>
      </p>
    </Body>
  );
}
