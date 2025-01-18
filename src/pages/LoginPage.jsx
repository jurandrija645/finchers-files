import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import InputField from "../components/InputField";


export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  let usernameField = useRef();
  let passwordField = useRef();

  function onSubmit(ev) {
    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const errors = {}
    if(!username){
      errors.username = "You must enter your username!";
    }
    if(!password)
    {
      errors.password = "You must enter your password!";
    }
    console.log("Before state");
    setFormErrors(errors);
    setInterval(alert("wait"), 3000);
    if(Object.keys(errors).length > 0){
      return;
    }

    ev.preventDefault();
    
    console.log("After state");
  }

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  return (
    <Body>
      <h1>Login</h1>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Body>
  );
}
