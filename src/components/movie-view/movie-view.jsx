
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import Row from 'react-bootstrap/Row';// rows can be divided into twelfths
import Col from 'react-bootstrap/Col';
import { Container, Card, Button } from "react-bootstrap";
import ModalView from "../modal-view/modal-view";

const MovieView = ({ movies, user, token, updateUser }) => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component is mounted
  }, []);

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
        displayFavoritesModal();
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
        alert("Failed to get genre info");
      }
    });
    setShowModal(true);
  }
  const displaySynopsisModal = (description) => {
    setTitle('Synopsis')
    setMessage(description)
    setShowModal(true);
  }

  const displayFavoritesModal = () => {
    setTitle('')
    setMessage('Successfully added movie to favorites')
    setShowModal(true);
  }
  const hideModal = () => {
    setShowModal(false)
  }

  return (
    <Container>
      <Row className="mb-5 d-flex justify-content-center">
        <Col md={10} lg={4} xl={4} className=" m-xs-5">
          <Card className="mt-5">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Row>
                <Card.Img className="h-100" src={movie.image} />
              </Row>
              <Row>
                <Card.Title className="mt-4"><h3>{movie.title}</h3></Card.Title>
              </Row>
              <Row>
                <Col>
                  <Card.Header className="bg-black text-light"> <h4>Director: </h4></Card.Header>
                  <Card.Text>
                    <Button className="fs-6" variant="link" onClick={displayDirectorModal}> <h5>{movie.director}</h5></Button>
                  </Card.Text>
                </Col>
                <Col >
                  <Card.Header className="bg-black text-light"><h4>Genre: </h4></Card.Header>
                  <Card.Text>
                    <Button className="fs-6" variant="link" onClick={displayGenreModal}><h5>{movie.genre}</h5></Button>
                  </Card.Text>
                </Col>
                <Col >
                  <Card.Text>
                    <Button className="fs-6" variant="link" onClick={() => displaySynopsisModal(movie.description)}><h5>Synopsis</h5></Button>
                  </Card.Text>
                </Col>
              </Row>
              <Row className="d-flex align-items-center mt=2">
                <Col className="movie-view__button-container">
                  <Button
                    style={{ cursor: "pointer" }}
                    onClick={() => addToFavorites()}
                    className=" movie-view__button fs-6"
                  >
                    Add to Favorites
                  </Button>
                </Col>
                <Col className="movie-view__button-container">
                  <Link to={"/"}>
                    <Button
                      className=" movie-view__button back-button justify-content-md-center "
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
        <Col md={10} lg={7} xl={6}>
          <h2 className="similar-movies__title">Similar Movies</h2>
          {similarMovies.length === 0 ? (

            <p className="d-flex text-align-center no-similar text-light ">No other movies of {movie.genre} genre in the archive!</p>
          ) : (
            <Row className="justify-content-center min-vh-60" >
              {similarMovies.map((movie) => (
                <Col md={6} lg={4} xl={4} className="mb-4 h-100 similar-movies profile-movie" key={movie.id}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )
          }
        </Col>
      </Row>
      <ModalView showModal={showModal} hideModal={hideModal} title={title} message={message} type={type} />
    </Container >
  );
};

export default MovieView