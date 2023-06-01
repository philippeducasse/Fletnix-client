import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie, isProfileView, token, user, updateUser}) => {

  const getUser = () => {
    fetch(`https://fletnix-s949.onrender.com/users/${user.Username}`, {
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
    fetch(`https://fletnix-s949.onrender.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
        if (response.ok) {
          alert("Successfully removed from favorites");
          console.log(response);
          getUser(); // can usestate instead of making another API call
        } else {
          alert(" failed to add to favorites")
        }
      });
  }
  return (
    <Card className= "h-100">
      <Card.Img variant="top" src={movie.image} />
      
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Details</Button>
        </Link>
        {isProfileView ? (
          <Button onClick= {removeFavorite} width={30}>Remove from favorites</Button>
        ):
        (<>
        </>
        )}
      </Card.Body>
    </Card>
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