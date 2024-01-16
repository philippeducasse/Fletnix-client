import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import "./navigation-bar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPerson, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const NavigationBar = ({ user, onLoggedOut }) => {

  return (
    <Navbar bg="black" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-custom text-light">
          Fletnix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-light">
          <Nav className="me-auto text-light text-align-right justify-content-around w-100">

            {!user && (
              <div className="nav-items">
                <div className="nav-welcome">

                  <Nav.Link className="text-light" as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="text-light" as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </div>
              </div>
            )}
            {user && (
              <div className="nav-items">
                <div className="nav-group">
                  <FontAwesomeIcon icon={faHome} />
                  <Nav.Link className="text-light" as={Link} to="/">
                    Home
                  </Nav.Link>
                </div>
                <div className="nav-group">
                  <FontAwesomeIcon icon={faPerson} />
                  <Nav.Link className="text-light" as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                </div>
                <div className="nav-group">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <Nav.Link className="text-light" onClick={onLoggedOut}>Logout</Nav.Link>
                </div>
              </div>

            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};