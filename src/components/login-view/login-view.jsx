import React from "react";
import { useState } from "react";


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
  
      fetch("https://fletnix-s949.onrender.com/login", {
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

    // const data = {
    //   access: username,
    //   secret: password
    // };

    // fetch("https://openlibrary.org/account/login.json", {
    //   method: "POST",
    //   body: JSON.stringify(data)
    // }).then((response) => {
    //     if (response.ok) {
    //         onLoggedIn(username);
    //     } else {
    //         alert("Login failed!")
    //     }
    // });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="6"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </label>
      <button type="submit"> Submit </button>
    </form>
  );
};
