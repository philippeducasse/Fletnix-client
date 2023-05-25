import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, updateUser, movies, onLoggedOut }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    console.log(user);

    let favoriteMovies = movies.filter(m => user.Favorites.includes(m.id));

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://fletnix-s949.onrender.com/users/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then(users => {
            if (users) {
                const filteredUser = users.filter(user => user.Username === username);
                fetch(`https://fletnix-s949.onrender.com/users/${filteredUser}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        alert("Failed to get username");
                    }
                });
                console.log(user, username);
            } else {
                alert('Error');
            }
        });
    };

    const updateProfile = () => {
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://fletnix-s949.onrender.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Update failed");
            }
        })
        .then((data) => {
            updateUser(data);
        });
    };

    const deleteAccount = () => {
        fetch(`https://fletnix-s949.onrender.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                onLoggedOut();
            } else {
                alert("Delete failed");
            }
        });
    };

    return (
        <>
            <div>Your Info</div>
            <div key={user.id} user={user} />
            <div>Username: {user.Username}</div>
            <div>Email: {user.Email}</div>
            <div>Birthday: {user.Birthday}</div>

            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button onClick={updateProfile} className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Button md={3} onClick={deleteAccount}>Delete Account</Button>

            <Col md={12}>
                <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
            </Col>
            {favoriteMovies.map(movie => (
                <Col className="mb-4" key={movie.id}>
                    <MovieCard movie={movie} isProfileView={true} token={token} user={user} updateUser={updateUser}/>
                </Col>
            ))}
        </>
    );
};
