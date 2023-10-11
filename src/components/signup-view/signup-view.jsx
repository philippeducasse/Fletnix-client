import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalView from "../modal-view/modal-view";


export const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    //modal variables
    const [message, setMessage] = useState('');
    const [type, setType] = useState('')
    const [showModal, setShowModal] = useState(false);

    const displaySuccessModal = () => {
        setType('success')
        setMessage('Signup Successful')
        setShowModal(true);
    }

    const displayFailModal = () => {
        setMessage('Signup failed, please try again later')
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://fletnix-b399cde14eec.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    displaySuccessModal();
                } else {
                    displayFailModal();
                }
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
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Submit</Button>
            <ModalView showModal={showModal} hideModal={hideModal} message={message} type={type}/>
        </Form>
    );
};