import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss"
import { Link } from "react-router-dom";


export const MovieCard = ({movie, isProfileView, token, user, updateUser}) => {

  const getUser = () => {
    fetch(`https://fletnix-b399cde14eec.herokuapp.com/users/${user.Username}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          }
        })
          .then((response)=> {
              if (response.ok) {
                  return response.json();
              } else {
                  alert(" failed")
              }
          }).then((data) => {
            console.log(data);
            updateUser(data);
          });   
      }

  const removeFavorite = () => {
    fetch(`https://fletnix-b399cde14eec.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
        if (response.ok) {
          console.log(response);
          getUser(); // can usestate instead of making another API call
        } else {
          alert(" failed to remove from favorites")
        }
      });
  }
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card className="h-100 ">
        <Card.Img
          variant="top"
          src={movie.image}
          className="h-60 movie-image"
        />

        <Card.Body className="card-body">
          <Card.Title className="card-title fs-xs-8">{movie.title}</Card.Title>
          <Card.Text>{movie.author}</Card.Text>
          {isProfileView ? (
            <Button onClick={removeFavorite} className="remove-btn">
              Remove from favorites
            </Button>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired

  }).isRequired,
};