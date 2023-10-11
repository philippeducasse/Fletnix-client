import { Link } from "react-router-dom";
import "../navigation-bar/navigation-bar.scss"
import { useState } from "react";
import { Navbar, Container, Nav, Form} from "react-bootstrap";


export const NavigationBar = ({ user, onLoggedOut }) => {
  
  return (
    <Navbar bg="black" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="">
          Fletnix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-light">
          <Nav className="me-auto text-light">

            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};