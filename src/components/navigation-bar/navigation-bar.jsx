import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Form} from "react-bootstrap";
import "../navigation-bar/navigation-bar.scss"


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
              <>
                <Nav.Link className= "text-light" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="text-light" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link className="text-light" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link className="text-light" as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link className="text-light" onClick={onLoggedOut}>Logout</Nav.Link>
                </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};