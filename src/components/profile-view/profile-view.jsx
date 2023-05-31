import React from "react";
import { useState } from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, updateUser, movies, onLoggedOut }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    console.log(user);
    let favoriteMovies = movies.filter(m => user.Favorites.includes(m.id));

    const updateProfile = () => {
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://fletnix-s949.onrender.com/users/${username}`, {
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
        <Container className="align-items-center">
            <Row>

                <Col md={6}>
                    <Card className="mt-2 mb-3">
                        <Card.Body>
                            <Card.Title>Update your info</Card.Title>
                            <Form >
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
                                        type="password"
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
                <Row>
                <Col md={2}>
                <Button onClick={deleteAccount} variant="danger">Delete Account</Button>
                </Col>
                </Row>

                <Col md={12}>
                    <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
                </Col>
                </Row>
                <Row>
                {favoriteMovies.map(movie => (
                    <Col className="mb-4" key={movie.id} md={3} xs={12} >
                        <MovieCard movie={movie} isProfileView={true} token={token} user={user} updateUser={updateUser} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
