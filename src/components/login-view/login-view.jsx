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
  
      fetch("https://fletnix-b399cde14eec.herokuapp.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((response) => response.json ())
        .then((data)=> {
            console.log("Login response: " + data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token)
            onLoggedIn(data.user, data.token);
          } else {
              alert("User not found")
          }
      })
        .catch((e)=> {
            alert("Something went wrong")
        });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        <Form.Group controlId= "formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            ></Form.Control>
            </Form.Group>
        <Button variant= "primary" type="submit" className="mt-3">
            Submit 
        </Button>
    </Form>
  );
};
