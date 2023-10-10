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
  const [id, setId] = useState(null);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null)

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
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card >
            <Card.Img className="h-50" src={movie.image} />
            <Card.Title>Title: {movie.title}</Card.Title>
            <Card.Header> Director: </Card.Header>
            <Card.Text>
              <Button variant="link" onClick={displayDirectorModal}>{movie.director} </Button>
            </Card.Text>
            <Card.Header>Genre: </Card.Header>
            <Card.Text>
              <Button variant="link" onClick={displayGenreModal}>{movie.genre} </Button>
            </Card.Text>
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => addToFavorites()}>
              Add to Favorites</Button>


            <Link to={"/"}>
              <Button
                className="back-button justify-content-md-center"
                style={{ cursor: "pointer" }}
              >
                Back
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
      <Row>
        <h2>Similar Movies</h2>
        {
          similarMovies.map((movie) => (
            <Col className="mb-4 height-50" key={movie.id} md={4}>
              <MovieCard movie={movie} md={3} />
            </Col>
          ))}
      </Row>
      <ModalView showModal={showModal} hideModal={hideModal} title={title} message={message} id={id} type={type} />
    </Container>
  );
};

export default MovieView