import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //prevents defualt behaviour of form submission
    //which would reload entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://fletnix-b399cde14eec.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token)
          onLoggedIn(data.user, data.token);
        } else {
          alert("User not found")
        }
      })
      .catch((e) => {
        alert("Something went wrong")
      });
  };

  return (
    <div className="vh-100">
    <h3 className="welcome text-light text-center"> Welcome to Fletnix! Please login to begin browsing our movie collection.</h3>
    <p className="text-light my-5">You can use the username "testuser" and the password "password" to login without creating an account.</p>
      <Form className="text-light mb-5  d-flex flex-column justify-content-center align-items-center my-auto" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 d-flex m-auto">
          Login
        </Button>
      </Form>
    </div>
  );
};
