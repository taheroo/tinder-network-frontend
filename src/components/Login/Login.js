import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Swal from "@sweetalert/with-react";

import auth from "../../services/authService";

import "./Login.css";

export default function Login() {
  // React Reducer Tip
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await auth.login({ email: email, password: password });
      window.location = "/Home";
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404)
      ) {
        //console.log("error.response", error.response.data);
        Swal({
          icon: "error",
          title: "Oops...",
          content: <div>{error.response.data.error}</div>,
        });
      }
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
