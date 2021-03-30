import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Swal from "@sweetalert/with-react";

import * as userService from "../../services/userService";
import auth from "../../services/authService";

import "./Register.css";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && fullname.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await userService.register({
        email: email,
        password: password,
        fullname: fullname,
      });
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/Instagram Profiles";
    } catch (error) {
      if (error.response && error.response.status === 409) {
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
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="fullname" bsSize="large">
          <FormLabel>Full Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
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
          Register
        </Button>
      </form>
    </div>
  );
}
