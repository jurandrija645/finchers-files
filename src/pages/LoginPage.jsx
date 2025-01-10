import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import InputField from "../components/InputField";

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});

  function onSubmit(ev) {
    ev.preventDefault();
    console.log("Komitanje forme");
  }
  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username"
          label="Username or email address"
          error={formErrors.username}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          error={formErrors.password}
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Body>
  );
}
