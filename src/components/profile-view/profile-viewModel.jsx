import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    let favoriteMovies = movies.filter(movie => user.Favorites.includes(movie.id));

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://fletnix-s949.onrender.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "Application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("changing user data failed!");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("Successfully updated user data");
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });

        const deleteAccount = () => {
            fetch(`https://fletnix-s949.onrender.com/users/${user.username}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    if (response.ok) {
                        alert("Your account has successfully been deleted.");
                        onLoggedOut();
                    } else {
                        alert("Could not delete account");
                    }
                })
                .catch(e => {
                    alert(e);
                })
        }
        return (
            <>
                <Col md={6}>
                    <Card className="mt-2 mb-3">
                        <Card.Body>
                            <Card.Title> Your info</Card.Title>
                            <p>User: {user.Username}</p>
                            <button onClick={changeUsername}>Change Username</button>
                            <p>Email:{user.Email}</p>
                        </Card.Body>
                    </Card>
                    <Button variant="danger" onClick={() => {
                        if (confirm("Are you sure?")) {
                            deleteAccount();
                        }
                    }}>Delete account</Button>
                </Col>
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
                                <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12}>
                    <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
                </Col>
                {favoriteMovies.map(movie=> (
                    <Col className="mb-4" key={movie.id}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </>

        );
    }}