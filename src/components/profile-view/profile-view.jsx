import { useState, useEffect } from "react";
import { Form, Button, Col, Row, Card, Container, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import ModalView from "../modal-view/modal-view";
import "../profile-view/profile-view.scss"

export const ProfileView = ({ user, token, updateUser, movies, onLoggedOut }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    // modal variables
    const [type, setType] = useState(null);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    let favoriteMovies = movies.filter(m => user.Favorites.includes(m.id));

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://fletnix-b399cde14eec.herokuapp.com/users/${username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    // console.log(response.json())
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data)
                if (data) {
                    updateUser(data);
                    alert('Update successful');
                } else {
                    alert("Invalid user data received. Please fill in all fields or check your submission");
                }
            })
            .catch((error) => {
                console.error(error);
                alert('An error occurred during the update. Please check your submission');
            });
    };

    const deleteAccount = () => {
        fetch(`https://fletnix-b399cde14eec.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    onLoggedOut();
                } else {
                    alert("Delete failed");
                }
            });
    };

    const displayModal = () => {
        setType('danger');
        setMessage('Are you sure you want to delete your account?')
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false)
    }
    //CODE TO DISPLAY BIRTHDAY IN FORM --> MODIFY HOW IT IS STORED ON DB
    // useEffect(() => {
    //     const dateString = { birthday };
    //     console.log(dateString.birthday)
    //     // Create a Date object from the input date string
    //     const dateObject = new Date(dateString.birthday);
    //     console.log({ dateObject })
    //     // Get the day, month, and year components from the Date object
    //     const day = dateObject.getUTCDate();
    //     const month = dateObject.getUTCMonth() + 1; // Add 1 because months are zero-based
    //     const year = dateObject.getUTCFullYear();

    //     // Pad the day and month with leading zeros if needed (e.g., 03 instead of 3)
    //     const formattedDay = day.toString().padStart(2, '0');
    //     const formattedMonth = month.toString().padStart(2, '0');

    //     // Create the formatted date string in "dd.mm.yyyy" format
    //     const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
    //     // Output: "dd.mm.yyyy"

    //     setBirthday(formattedDate);
    // }
    // )
    return (
        <Container>

            <Row className="justify-content-md-center">

                <Col md={8}>
                    <Card className="mt-2 mb-3 text-dark">
                        <Card.Body className="bg-light text-dark">
                            <Card.Title id="form-title">Update your info</Card.Title>
                            <Form className="text-start">
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}

                                        onChange={(e) => {

                                            setUsername(e.target.value);
                                        }

                                        }
                                        required
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
                                        type="email"
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
                                <Row >
                                    <Col>
                                <Button onClick={handleSubmit}  variant="primary" type="submit">Submit</Button>
                                <Button
                                    onClick={displayModal}
                                    variant="danger">Delete Account</Button></Col></Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row>
                <Col md={12}>
                    <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
                </Col>
            </Row>

            <Row className="favorite-movies">

                {favoriteMovies.length === 0 ? (
                    <Col md={10}>
                        <p className="text-light">You have no favorite movies.</p>
                    </Col>
                ) : (
                    favoriteMovies.map(movie => (
                        <Col className="mb-4" key={movie.id} md={4} xl={3}>
                            <MovieCard  movie={movie} isProfileView={true} token={token} user={user} updateUser={updateUser} />
                        </Col>
                    )
                    ))}
            </Row>
            <ModalView showModal={showModal} hideModal={hideModal} deleteAccount={deleteAccount} message={message} type={type} />
        </Container>
    );
};
