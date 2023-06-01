import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../movie-view/movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import Row from 'react-bootstrap/Row';// rows can be divided into twelfths
import Col from 'react-bootstrap/Col';
import { Container, Card, Button } from "react-bootstrap";


export const MovieView = ({ movies, user, token, updateUser }) => {

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const username = user.Username;
  let similarMovies = movies.filter((m) => movie.genre === m.genre && movie.id !== m.id);
  console.log(movie);

  const getUser = (username) => {
    //this logic can be replaced by using a change of state
    fetch(`https://fletnix-s949.onrender.com/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Successfully got user info");
          return response.json();
        } else {
          alert(" failed")
        }
      }).then((data) => {
        updateUser(data);
      });
  }

  const addToFavorites = () => {

    fetch(`https://fletnix-s949.onrender.com/users/${username}/movies/${movie.id}`, {
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

    // Fetch to updtae user

  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card >
            <Card.Img className="h-50" src={movie.image} />
            <Card.Title>Title: {movie.title}</Card.Title>
            <Card.Header>Director: </Card.Header>
            <Card.Text>{movie.director}</Card.Text>
            <Card.Header>Genre: </Card.Header>
            <Card.Text>{movie.genre}</Card.Text>
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
    </Container>
  );
};

