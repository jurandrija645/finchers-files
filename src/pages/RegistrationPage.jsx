import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import { useApi} from "../contexts/ApiProvider";

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

   async function onSubmit(event){
    const errors = {};
    if(passwordField.current.value !== password2Field.current.value)
    {
        errors.password = "The password do not match!";
        setFormErrors(errors);
    }
    else{
        const response = await api.post("/users", {
            username: usernameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value,
        });
        if(!response.ok){
            setFormErrors(response.body.errors.json);
        }
        else{
            setFormErrors({});
            navigate("/login");
        }
    }
    // TODO
  };

  return (
    <Body>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username" label="Username"
          error={formErrors.username} fieldRef={usernameField} />
        <InputField
          name="email" label="Email address"
          error={formErrors.email} fieldRef={emailField} />
        <InputField
          name="password" label="Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password2" label="Password again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Body>
  );
}