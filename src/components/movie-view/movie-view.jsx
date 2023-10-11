import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../movie-view/movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import Row from 'react-bootstrap/Row';// rows can be divided into twelfths
import Col from 'react-bootstrap/Col';
import { Container, Card, Button } from "react-bootstrap";
import ModalView from "../modal-view/modal-view";

const MovieView = ({ movies, user, token, updateUser }) => {

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const username = user.Username;
  let similarMovies = movies.filter((m) => movie.genre === m.genre && movie.id !== m.id);

  // modal variables
  const [type, setType] = useState(null);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('')
  const [showModal, setShowModal] = useState(false);

  const getUser = (username) => {
    //this logic can be replaced by using a change of state
    fetch(`https://fletnix-b399cde14eec.herokuapp.com/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(" failed")
        }
      }).then((data) => {
        updateUser(data);
      });
  }

  const addToFavorites = () => {

    fetch(`https://fletnix-b399cde14eec.herokuapp.com/users/${username}/movies/${movie.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Successfully added to favorites");
        getUser(username);
      } else {
        alert(" failed to add to favorites")
      }
    });
  }

  const displayDirectorModal = () => {
    fetch(`https://fletnix-b399cde14eec.herokuapp.com/movies/director/${movie.director}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((director) => {
            console.log(director)
            let message = <>{director.About}<p><br /> Birth year: {director.BirthYear}</p>{director.DeathYear && <p>Death year: {director.DeathYear}</p>}</>

            setMessage(message)
            setTitle(director.Name);
            // setMessage(message);
          });
      } else {
        alert("Failed to get director info");
      }
    });
    setShowModal(true);
  }

  const displayGenreModal = () => {
    fetch(`https://fletnix-b399cde14eec.herokuapp.com/movies/genre/${movie.genre}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((movies) => {
            console.log(movies)
            setTitle(movies[0].Genre.Name);
            setMessage(movies[0].Genre.Description);
          });
      } else {
        alert("Failed to get director info");
      }
    });
    setShowModal(true);
  }
  const hideModal = () => {
    setShowModal(false)
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card >
            <Card.Body className="d-flex flex-column justify-content-between">
              <Row>
                <Card.Img className="h-100" src={movie.image} />
              </Row>
              <Row>

                <Card.Title className="mt-4">{movie.title}</Card.Title>
              </Row>
              <Row>
                <Col>
                  <Card.Header className="bg-black text-light"> Director: </Card.Header>
                  <Card.Text>
                    <Button className="fs-6" variant="link" onClick={displayDirectorModal}>{movie.director}</Button>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Header className="bg-black text-light">Genre: </Card.Header>
                  <Card.Text>
                    <Button className="fs-6" variant="link" onClick={displayGenreModal}>{movie.genre}</Button>
                  </Card.Text>
                </Col>
              </Row>
              <Row className="d-flex align-items-center mt=2">
                <Col >
                  <Button
                    style={{ cursor: "pointer" }}
                    onClick={() => addToFavorites()}
                    className="fs-6"
                  >
                    Add to Favorites
                  </Button>
                  </Col>
                  <Col>
                  <Link to={"/"}>
                    <Button
                      className="back-button justify-content-md-center m-3"
                      style={{ cursor: "pointer" }}
                    >
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} >
          <h2 className="similar-movies__title">Similar Movies</h2>
          <Row className="justify-content-right">
            {similarMovies.map((movie) => (
              <Col md={4} className="mb-4 height-100" key={movie.id}>
                <MovieCard movie={movie} md={3} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ModalView showModal={showModal} hideModal={hideModal} title={title} message={message} type={type} />
    </Container >
  );
};

export default MovieView